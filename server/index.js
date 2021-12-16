const EC = require('elliptic').ec;
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const ec = new EC('secp256k1')

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const key1 = ec.genKeyPair();

const key2 = ec.genKeyPair();

const key3 = ec.genKeyPair();

const keys = [key1, key2, key3];

const pub_keys = [];
const pri_keys = []

for (let i = 0; i < keys.length; i++){
  pub_keys[i] = keys[i].getPublic().encode('hex');
  pri_keys[i] = keys[i].getPrivate();
}

const a = pub_keys[0];
const b = pub_keys[1];
const c = pub_keys[2];

const balances = {
  [a]: 100,
  [b]: 50,
  [c]: 75,
}

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const arr = address.split(",");
  const sender = arr[0];
  const balance = balances[sender] || 0;
  const test = arr[1];
  if (test === ""+pri_keys[pub_keys.indexOf(sender).toString()]){
    res.send({ balance });
  }
  else{
    res.send(0)
  }

});

app.post('/send', (req, res) => {
  console.log("Hello");
  const {sender, privatekey, recipient, amount} = req.body;
  console.log(req.body);
  console.log(sender);
  console.log(privatekey);
  if(privatekey === ""+pri_keys[pub_keys.indexOf(sender)] && pub_keys.indexOf(recipient) > -1){
    balances[sender] -= amount;
    balances[recipient] = (balances[recipient] || 0) + +amount;
  }
  res.send({ balance: balances[sender] || 0 } );
});

// app.post('/send', (req, res) => {
//   console.log("Hello");
//   const {sender, recipient, amount} = req.body;
//   balances[sender] -= amount;
//   balances[recipient] = (balances[recipient] || 0) + +amount;
//   res.send({ balance: balances[sender] });
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
  //console.log(keys);
  //console.log(public_key1);
  for (let i = 0; i < keys.length; i++){
    console.log(pub_keys[i]+"\n private: "+ pri_keys[i]);
  }
});

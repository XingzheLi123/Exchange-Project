import "./index.scss";

const server = "http://localhost:3042";

document.getElementById("private-key").addEventListener('input', ({ target: {value} }) => {

  const sender = document.getElementById("exchange-address").value;

  console.log(value);

  const pair = [sender, value];

  console.log(pair)

  fetch(`${server}/balance/${pair}`).then((response) => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });

});

document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const privatekey = document.getElementById("private-key").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;

  const body = JSON.stringify({
    sender, privatekey, amount, recipient
  });

  const request = new Request(`${server}/send`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});

// document.getElementById("transfer-amount").addEventListener('click', () => {
//   const sender = document.getElementById("exchange-address").value;
//   const amount = document.getElementById("send-amount").value;
//   const recipient = document.getElementById("recipient").value;
//   const privatekey = document.getElementById("private-key").value;

//   const body = JSON.stringify({
//     sender, amount, recipient,
//   });

//   const request = new Request(`${server}/send`, { method: 'POST', body });

//   fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
//     return response.json();
//   }).then(({ balance }) => {
//     document.getElementById("balance").innerHTML = balance;
//   });
// });

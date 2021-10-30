//affichage du numero de commande et du prix dans la page de confirmation
let orderId = localStorage.getItem("orderId");
orderId = JSON.parse(orderId);

const idOnPage = document.getElementById("orderIdOnPage");
idOnPage.innerText = orderId;

let price = localStorage.getItem("totalPrice");
price = JSON.parse(price);

const priceDisplay = document.getElementById("totalOrder");
priceDisplay.innerText = price;

localStorage.clear();

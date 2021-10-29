import { getCameras } from "./api.js";
//Recuperation des donnes du local storage et stockage dans des variables
let cameraLocalStorage = JSON.parse(localStorage.getItem("productInCart"));
let productQuantity = JSON.parse(localStorage.getItem("productQuantity"));
let cameraId = []; //on fait un tableau d'id pour envoyer au backend dans la requete POST

if (cameraLocalStorage) {
  //on itere sur toutes les cameras pour faire un nouveau tableau d id
  for (let i = 0; i < cameraLocalStorage.length; i++) {
    cameraId.push(cameraLocalStorage[i].id);
  }
}

//FONCTION qui fait apparaitre les cameras dans le panier si le local storage n est pas vide
function displayProduct() {
  if (cameraLocalStorage == null) {
    document.querySelector(".products").innerHTML =
      "<h3 class='mt5 p-5'>Votre panier est vide pour le moment</h3>";
  } else {
    cameraLocalStorage.forEach((camera) => {
      //on recupere les cameras et on boucles pour afficher les elements du ls

      document.querySelector(".products").innerHTML += `
        <div class="row mt-4 oneArticle">
        <img class="w-25 col" src="${camera.img}">
        <p class="col pt-5 camera-name">${camera.name} </p>
        <p class="col pt-5 camera-lens">${camera.lens}</p>
        <p class="col pt-5"><i class="far fa-arrow-alt-circle-left arrow-left"></i>
        x<span class="camera-quantity">${camera.quantity}</span> 
        <i class="far fa-arrow-alt-circle-right arrow-right"></i>
        </p>
        <p class="col pt-5"><span class="price">${
          camera.price * camera.quantity
        }</span>€ </p>
        <i class="fas fa-trash-alt delete col pt-5"></i>
        </div>
       `;
    });
  }
}
displayProduct();

function displayCartNumbers() {
  //fonction qui affiche le nombre de produit dans le panier
  let inLocalStorage = localStorage.getItem("productQuantity");

  if (inLocalStorage) {
    document.querySelector(".in-cart").textContent = inLocalStorage;
  }
}
displayCartNumbers();

///////////////FONCTION qui calcule le total du prix des articles dans le panier
let total = 0;
let individualPrice = document.querySelectorAll(".price");

function calculateTotal() {
  let price = []; //tableau vide ou on va pusher les prix
  total = 0;

  for (let i = 0; i < individualPrice.length; i++) {
    //on push les prix dans le tableau
    price.push(individualPrice[i].innerText);
  }
  for (let i = 0; i < price.length; i++) {
    //on itere sur le tableau prix et on additione les valeurs
    total += Number(price[i]);
  }
  document.querySelector(
    "#total"
  ).innerHTML = `Total: ${total},00 <span class="euro">€</span>`;
}
calculateTotal();
// on affiche la valeur du total dans le total du html
cameraLocalStorage;

function deleteProduct(
  onPageDeleteName,
  onPageDeleteQuantity,
  onPageDeleteLens
) {
  for (let j = 0; j < cameraLocalStorage.length; j++) {
    if (
      onPageDeleteName == cameraLocalStorage[j].name &&
      onPageDeleteQuantity == cameraLocalStorage[j].quantity &&
      onPageDeleteLens == cameraLocalStorage[j].lens
    ) {
      productQuantity -= cameraLocalStorage[j].quantity;
      total -= cameraLocalStorage[j].price * cameraLocalStorage[j].quantity;
      cameraLocalStorage.splice(j, 1); //on supprime le produit du local storage avec son index
    }
  }
}

let deleteBtn = document.querySelectorAll(".delete");
let cameraQuantity = document.querySelectorAll(".camera-quantity");
let cameraName = document.querySelectorAll(".camera-name");
let cameraLense = document.querySelectorAll(".camera-lens");
//////////////FONCTION qui supprime l element et update le local storage au click sur la poubelle
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].onclick = function (e) {
    deleteProduct(
      cameraName[i].innerText,
      cameraQuantity[i].innerText,
      cameraLense[i].innerText
    );
    e.target.parentNode.remove();
    recalculateTotal();

    if (productQuantity == 0) {
      //si il n'y a plus rien dans le local storage on supprime tout pour mettre a jour le message
      localStorage.clear();
      location.reload();
    }
  };
}
///////////////////////GERER LA QUANTITE DEPUIS LE PANIER/////////////////////////
let oneLinePrice = 0;
let oneLineQuantity = 0;
let leftArrow = document.querySelectorAll(".arrow-left");
let rightArrow = document.querySelectorAll(".arrow-right");

function decrementProduct(
  onPagedecrementName,
  onPageDecrementQuantity,
  onPageDecrementLens
) {
  for (let j = 0; j < cameraLocalStorage.length; j++) {
    if (
      onPagedecrementName == cameraLocalStorage[j].name &&
      onPageDecrementQuantity == cameraLocalStorage[j].quantity &&
      onPageDecrementLens == cameraLocalStorage[j].lens
    ) {
      cameraLocalStorage[j].quantity -= 1;
      cameraQuantity[j].innerText = cameraLocalStorage[j].quantity;
      let productPrice =
      cameraLocalStorage[j].quantity * cameraLocalStorage[j].price;
      individualPrice[j].innerText = productPrice;
      oneLinePrice = individualPrice[j].innerText;
      oneLineQuantity = cameraLocalStorage[j].quantity;
      total -= cameraLocalStorage[j].price;
      break
    }
  }
}

function incrementProduct(
  onPageIncrementName,
  onPageIncrementQuantity,
  onPageIncrementLens
) {
  for (let j = 0; j < cameraLocalStorage.length; j++) {
    if (
      onPageIncrementName == cameraLocalStorage[j].name &&
      onPageIncrementQuantity == cameraLocalStorage[j].quantity &&
      onPageIncrementLens == cameraLocalStorage[j].lens
    ) {
      cameraLocalStorage[j].quantity += 1;
      cameraQuantity[j].innerText = cameraLocalStorage[j].quantity;
      let productPrice =
        cameraLocalStorage[j].quantity * cameraLocalStorage[j].price;
      individualPrice[j].innerText = productPrice;
      oneLinePrice = individualPrice[j].innerText;
      oneLineQuantity = cameraLocalStorage[j].quantity;
      total += cameraLocalStorage[j].price;
      break
    }
  }
}

function recalculateTotal() {
  document.querySelector(
    "#total"
  ).innerHTML = `Total: ${total},00 <span class="euro">€</span>`;
  document.querySelector(".in-cart").textContent = productQuantity;
  localStorage.setItem("productInCart", JSON.stringify(cameraLocalStorage));
  localStorage.setItem("productQuantity", JSON.stringify(productQuantity));
}

//FONCTION qui reduit la quantite d un produit au click sur la fleche de gauche
for (let i = 0; i < leftArrow.length; i++) {
  leftArrow[i].addEventListener("click", (event) => {
    oneLineQuantity = 0;
    decrementProduct(
      cameraName[i].innerText,
      cameraQuantity[i].innerText,
      cameraLense[i].innerText
    );
    productQuantity -= 1;
    individualPrice[i].innerText = oneLinePrice;
    cameraQuantity[i].innerText = oneLineQuantity;
    recalculateTotal();
   
    if (oneLinePrice == 0) {
      deleteProduct(
        cameraName[i].innerText,
        cameraQuantity[i].innerText,
        cameraLense[i].innerText
      );
      event.target.parentNode.parentNode.remove();
      recalculateTotal();
      if (total == 0) {
        //si il n'y a plus rien dans le local storage on supprime tout pour mettre a jour le message
        localStorage.clear();
        location.reload();
      }
    }
  });
}

//FONCTION qui ajoute la quantite d un produit au click sur la fleche de droite
for (let i = 0; i < rightArrow.length; i++) {
  rightArrow[i].addEventListener("click", (event) => {
    oneLineQuantity = 0;
    incrementProduct(
      cameraName[i].innerText,
      cameraQuantity[i].innerText,
      cameraLense[i].innerText
    );
    productQuantity += 1;
    individualPrice[i].innerText = oneLinePrice;
    cameraQuantity[i].innerText = oneLineQuantity;
    recalculateTotal();
  });
}
/////////////////////////////////FORMULAIRE///////////////////////////////////

//On stocke les champs du formulaire dans des variables
let lastName = document.querySelector("#last-name");
let firstName = document.querySelector("#first-name");
let emailAddress = document.querySelector("#email");
let streetAddress = document.querySelector("#address");
let postCode = document.querySelector("#postcode");
let cityName = document.querySelector("#city");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector("#my-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (total == 0) {
    alert(
      "Votre panier est vide, veuillez selectioner un ou plusieur article avant de procceder au payment"
    );
  } else if (
    lastName.value == " " ||
    firstName.value == " " ||
    streetAddress.value == " " ||
    cityName.value == " "
  ) {
    alert(
      "Veuillez finir de remplir le formulaire avant de procceder au payment"
    );
  } else if (form.reportValidity()) {
    // on stock les valeur du formulaire dans un objet comme dans controller camera.js
    let order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: streetAddress.value,
        city: cityName.value,
        email: emailAddress.value,
      },
      products: cameraId,
    };
    // FONCTION method post pour envoyer les infos au back end
    getCameras("order", "POST", order)
      .then((responseJ) => {
        return responseJ.json();
      })
      .then((result) => {
        localStorage.setItem("orderId", JSON.stringify(result.orderId));
        localStorage.setItem("totalPrice", JSON.stringify(total));
        document.location.href = "./order.html";
        return result;
      })
      .catch((err) => {
        alert(
          "Il semble qu'il y ai une erreur avec le serveur, veuillez réessayer ulterieurment"
        );
      });
  }
});

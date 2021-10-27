//variable pour reccuperer le container ou on montre les produits
import { getCameras } from "./api.js";
const cameraContainer = document.getElementById("productsDisplay");
const loader = document.querySelector(".loader"); //loader de la page d'acceuil

//fonction principal qui reccupere les articles et les montres sur la page
callApi();
async function callApi() {
  const cameras = await getCameras(" ", "GET")
    .then((responsehttp) => {
      return responsehttp.json(); //reccuperation des donnes au format json
    })
    .then((response) => {
      return response; //retour de la reponse du fetch pour la fonction principale
    })
    .catch((err) => {
      //err et message sur la page si le serveur ne fonctionne pas ou renvoie une erreur
      cameraContainer.innerHTML =
        "<p class='text-center mt-5 pt-5 pb-5 mb-5'><strong>Il semble que le serveur ne soit pas actif, veuillez réessayez dans 1 minute <br/>Nous sommes désolé pour la gêne occasionnée...</strong></p>";
    }); //stockage de l'objet contenant les cameras reccupere par le fetch
  loader.style.display = "none";
  cameras.forEach((camera) => {
    displayCameras(camera);
  });
}

function displayCameras(camera) {
  //fonction pour faire apparaitre les cameras sur la page
  //html dans le container de la page principale
  cameraContainer.innerHTML += `     
    <article class="card col-12 col-md-4 m-5 mt-4 p-0 pb-2 shadow">
      <img src="${camera.imageUrl}" alt="" class="card-img-top w-100">
      <div class="card-body">
        <h3 class="card-title text-center">${camera.name}</h3>
        <div class="details">
        <p class="card-text">A partir de <strong>${
          camera.price / 100
        }€</strong></p>
        <a class="btn btn-primary cameraLink stretched-link" href="/frontend/pages/article.html?id=${
          camera._id
        }">Details du produit</a>
      </div>
      </div>
    </article>
    `;
}

function displayCartNumbers() {
  //fonction qui affiche le nombre de produit dans le panier
  let inLocalStorage = localStorage.getItem("productQuantity");

  if (inLocalStorage) {
    document.querySelector(".in-cart").textContent = inLocalStorage;
  }
}
displayCartNumbers();

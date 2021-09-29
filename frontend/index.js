//variable pour reccuperer le container ou on montre les produits
const cameraContainer = document.getElementById('productsDisplay'); 

//fonction principal qui reccupere les articles et les montres sur la page
main() 
 async function main(){
    const cameras = await getCameras(); //stockage de l'objet contenant les cameras reccupere par le fetch 
    for(camera of cameras)   //boucle qui itere sur tout les elements du tableau d objet cameras
        displayCameras()  
    }


async function getCameras(){
    return fetch('http://localhost:3000/api/cameras') //appel a l api pour recupperer les donnes
    .then((responsehttp) =>{
        return responsehttp.json() //reccuperation des donnes au format json
    }).then(response =>{
        return response  //retour de la reponse du fetch pour la fonction principale
    }).catch(err =>{ //err et message sur la page si le serveur ne fonctionne pas ou renvoie une erreur
        cameraContainer.innerHTML = "<h3 class='text-center mt-5'>Il semble que le serveur ne soit pas actif, veuillez reessayez dans 1 minute <br/>Nous sommes désolé pour la gêne occasionnée...</h3>"
    })
};

function displayCameras() { //fonction pour faire apparaitre les cameras sur la page
    //html dans le container de la page principale
    cameraContainer.innerHTML += `
     
    <article class="card col-12 col-md-4 m-3 mt-4 p-0 pb-2 shadow">
      <img src="${camera.imageUrl}" alt="" class="card-img-top w-100">
      <div class="card-body">
        <h3 class="card-title text-center">${camera.name}</h3>
        <p class="card-text">A partir de <strong>${camera.price/100}€</strong></p>
        <a class="btn btn-primary cameraLink" href="./article.html?id=${camera._id}">Details du produit</a>
      </div>
    </article>
    `;
  
}

function displayCartNumbers(){  //fonction qui affiche le nombre de produit dans le panier
    let inLocalStorage = localStorage.getItem("productQuantity");

    if(inLocalStorage) {
        document.querySelector('.in-cart').textContent = inLocalStorage;
    }
}
displayCartNumbers()
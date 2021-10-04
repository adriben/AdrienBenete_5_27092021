displayCamera() //fonction principale de la page article


async function displayCamera(){ //affichage de la camera selectionner dans la page precedente
    const cameraID = getCameraID(); //fonction qui reccupere l id unique
    const camera = await getCamera(cameraID);
    
    document.getElementById('cameraImage').setAttribute('src', `${camera.imageUrl}`);
    document.getElementById('camera-description').innerText = camera.description;
    document.getElementById('camera-title').innerText = camera.name;
    document.getElementById('camera-price').innerText = camera.price /100;

    let selection = document.querySelector("#lens-select")
    let lenses = camera.lenses;
    console.log(lenses);
    for(lens of lenses){
        let option = document.createElement('option');
        option.innerText = lens;
        selection.appendChild(option)
       
        
    }
    
    console.log(camera.lenses[0])
}


function getCameraID(){ //on recupere l id de la camera que l on a passer dans le lien de la page
    return new URL (location.href).searchParams.get('id'); 
}


async function getCamera(cameraID){ //on recupere l'objet unique grace a la fonction preccedente et l id de la camera
    return fetch(`http://localhost:3000/api/cameras/${cameraID}`)
    .then((responsehttp) =>{
        return responsehttp.json()
    }).then(response =>{
        return response
    }).catch(err =>{
        return document.querySelector('.productsDisplay').innerHTML = "<h3 class='text-center mt-5'>Il semble que le serveur ne soit pas actif, veuillez reessayez dans 1 minute <br/>Nous sommes désolé pour la gêne occasionnée...</h3>"
    })
};
const addToCartButton = document.querySelector('#add-to-cart'); //bouton ajouter au panier

addToCartButton.addEventListener('click',  event =>{ //au click on ajoute l article au panier et on remercie le client
    event.preventDefault();
    
    
    document.querySelector('.alert').innerText = "Vous avez bien ajoute cette camera a votre panier"
    document.querySelector('.alert').className += " alert-success";
    
    addToCart()
    
})

//fonction qui affiche le nombre de produits dans le panier au chargement de la page
function displayCartNumbers(){ 
    let inLocalStorage = localStorage.getItem("productQuantity");

    if(inLocalStorage) {
        document.querySelector('.in-cart').textContent = inLocalStorage;
    }
}



//fonction qui ajoute le produit au local storage
function addToCart(){   
 
    let inLocalStorage = localStorage.getItem("productQuantity");
    inLocalStorage = parseInt(inLocalStorage);//on converti le string du json du localstorage en number

   if(inLocalStorage){
    localStorage.setItem("productQuantity", inLocalStorage + 1) //on ajoute le produit au produit existant si il y a deja un produit
    document.querySelector('.in-cart').textContent = inLocalStorage +1; 
   }else{
    localStorage.setItem("productQuantity", 1) //si le localstorage est vide, on ajoute le produit
    document.querySelector('.in-cart').textContent = 1;
   }
   let cameraAdded = {//on creer un objet avec des valeurs 
    name: document.getElementById('camera-title').innerText,
    price: document.getElementById('camera-price').innerText,
    img: document.getElementById('cameraImage').getAttribute('src'),
    lens: document.getElementById('lens-select').value,
    quantity: document.getElementById('quantity-select').value
    
    }

    // console.log(cameraAdded.name);

    let cameraLocalStorage= JSON.parse(localStorage.getItem("productInCart"));
    if(cameraLocalStorage){ 
        console.log(cameraAdded);
        console.log(cameraLocalStorage);
        
    
        cameraLocalStorage.push(cameraAdded);
        localStorage.setItem("productInCart", JSON.stringify(cameraLocalStorage))
            
        
        
        
         //si il y a deja quelque chose dans le local storage
     

       
       //On ajoute l element au tableau cameraLocalStorage
            
       
    

    }else{ //si il n y a rien dans le localstorgae on creer un tableau vide et on ajoute l objet
        cameraLocalStorage =[];
        cameraLocalStorage.push(cameraAdded);
        
        localStorage.setItem("productInCart", JSON.stringify(cameraLocalStorage))
    }

    }
 





displayCartNumbers()

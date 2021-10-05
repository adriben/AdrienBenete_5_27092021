//Recuperation des donnes du local storage et stockage dans des variables

let cameraLocalStorage= JSON.parse(localStorage.getItem("productInCart"));
let productQuantity = JSON.parse(localStorage.getItem("productQuantity"));



//Fonction qui fait apparaitre les cameras dans le panier si le local storage n est pas vide
if(cameraLocalStorage == null){
    document.querySelector('.products').innerHTML = "<h3 class='mt5 p-5'>Votre panier est vide pour le moment</h3>"
}else{
   

   
    cameraLocalStorage.forEach(camera => { //on recupere les cameras et on boucles pour afficher les elements du ls
        
        document.querySelector('.products').innerHTML += `
        <div class="row mt-4 oneArticle">
        
        <img class="w-25 col" src="${camera.img}">
        
        <p class="col pt-5">${camera.name} </p>
        <p class="col pt-5">${camera.lens}</p>
        <p class="col pt-5">x<span class="camera-quantity">${camera.quantity}<span></p>
        <p class="col pt-5"><span class="price">${camera.price * camera.quantity}</span>€ </p>
        <i class="fas fa-trash-alt delete col pt-5"></i>
        </div>

        
        
        `
        
        
    });
}

function displayCartNumbers(){  //fonction qui affiche le nombre de produit dans le panier
    let inLocalStorage = localStorage.getItem("productQuantity");

    if(inLocalStorage) {
        document.querySelector('.in-cart').textContent = inLocalStorage;
    }
    // else{
    //     document.querySelector('.in-cart').textContent = 0;
    // }
}
displayCartNumbers()

let total = 0; //Fonction qui calcule le total du prix des articles dans le panier
function calculateTotal(){
    let individualPrice = document.querySelectorAll(".price");
    let price= []; //tableau vide ou on va pusher les prix
    
    for (let i= 0; i<individualPrice.length; i++){ //on push les prix dans le tableau
        
        price.push(individualPrice[i].innerText)

    }
    for (let i=0; i < price.length;i++) {//on itere sur le tableau prix et on additione les valeurs
        total += Number(price[i])
        
       }
    
      
}
calculateTotal()
 

 // on affiche la valeur du total dans le total du html

 document.querySelector('#total').innerHTML = `Total: ${total},00 <span class="euro">€</span>`







let oneArticle = document.querySelectorAll(".oneArticle") //on stoke un article et les boutons poubelles dans des variables
let deleteBtn = document.querySelectorAll('.delete');
// console.log(deleteBtn);
let cameraQuantity = document.querySelectorAll(".camera-quantity")


for(let i=0; i< deleteBtn.length; i++){   //fonction qui supprime l element et update le local storage au click sur la poubelle
   deleteBtn[i].onclick = function (e){
    
      console.log(productQuantity);
      
      e.target.parentNode.parentNode.remove()  //on supprime l'element dans le html
      cameraLocalStorage.splice(i, 1)   //on supprime le produit du local storage avec son index
      console.log(cameraQuantity[i]);
      productQuantity -= cameraQuantity[i].innerText  //on retire les elements du panier
      console.log(cameraLocalStorage);
      localStorage.setItem("productInCart", JSON.stringify(cameraLocalStorage)); 
      localStorage.setItem("productQuantity", JSON.stringify(productQuantity))//on retransforme les valeurs en JSOn
      location.reload() //on rafraichi la page pour mettre a jour 
      calculateTotal() //on recalcule le total 
      console.log(productQuantity);
      displayCartNumbers()
      if(productQuantity == 0){  //si il n'y a plus rien dans le local storage on supprime tout pour mettre a jour le message 
        localStorage.clear();
        location.reload()
      }
      
   }
    // console.log(cameraLocalStorage)
}

///////////////Formulaire/////

//On stocke les champs du formulaire des variables

let lastName = document.querySelector("#last-name");
let firstName = document.querySelector('#first-name');
let emailAddress = document.querySelector('#email');
let streetAddress = document.querySelector('#address');
let postCode = document.querySelector('#postcode');
let cityName = document.querySelector('#city')
// console.log(cityName);
const submitBtn = document.querySelector('#submit');
const form = document.querySelector('#my-form')


form.addEventListener('submit', event =>{
    event.preventDefault();

if(total == 0){
    
    alert("Votre panier est vide, veuillez selectioner un ou plusieur article avant de procceder au payment")
}else if(!lastName.value || !firstName.value || !emailAddress.value || !streetAddress.value
    || !postCode.value || !cityName.value){
        alert("Veuillez finir de remplir le formulaire avant de procceder au payment")
    
}else{
    // on stock les valeur du formulaire dans un tableau 
    let userInfo = [];
    
    document.location.href="order.html"
}


})





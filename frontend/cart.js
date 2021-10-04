let cameraLocalStorage= JSON.parse(localStorage.getItem("productInCart"));
let productQuantity = JSON.parse(localStorage.getItem("productQuantity"))

if(cameraLocalStorage == null){
    document.querySelector('.products').innerHTML = "<h3 class='mt5 p-5'>Votre panier est vide pour le moment</h3>"
}else{
   

   
    cameraLocalStorage.forEach(camera => {
        
        document.querySelector('.products').innerHTML += `
        <div class="row mt-4 oneArticle">
        
        <img class="w-25 col" src="${camera.img}">
        
        <p class="col pt-5">${camera.name} </p>
        <p class="col pt-5">${camera.lens}</p>
        <p class="col pt-5">x${camera.quantity}</p>
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
    //     displayItems()
    // }
}
displayCartNumbers()

let total = 0;
function calculateTotal(){
    let individualPrice = document.querySelectorAll(".price");
    let price= [];
    
    for (let i= 0; i<individualPrice.length; i++){
        
        price.push(individualPrice[i].innerText)

    }
    for (let i=0; i < price.length;i++) {
        total += Number(price[i])
        
       }
    
      
}
calculateTotal()
 

 // on affiche la valeur du total dans le total du html

 document.querySelector('#total').innerHTML = `Total: ${total},00 <span class="euro">€</span>`







let oneArticle = document.querySelectorAll(".oneArticle")
let deleteBtn = document.querySelectorAll('.delete');
// console.log(deleteBtn);

for(let i=0; i< deleteBtn.length; i++){   //fonction qui supprime l element et update le local storage
   deleteBtn[i].onclick = function (e){
      
      
      e.target.parentNode.parentNode.remove()
      cameraLocalStorage.splice(i, 1)
      console.log(i);
      productQuantity -= 1
      console.log(cameraLocalStorage);
      localStorage.setItem("productInCart", JSON.stringify(cameraLocalStorage));
      localStorage.setItem("productQuantity", JSON.stringify(productQuantity))
      location.reload()
      calculateTotal()
      
      displayCartNumbers()
      if(productQuantity == 0){
        localStorage.clear();
        location.reload()
      }
      
   }
    // console.log(cameraLocalStorage)
}

///////////////Formulaire/////


const submitBtn = document.querySelector('#submit');
submitBtn.addEventListener('click', event =>{
    event.preventDefault();

if(total == 0){
    
    alert("Votre panier est vide, veuillez selectioner un ou plusieur article avant de procceder au payment")
}else{
    document.location.href="order.html"
}


})





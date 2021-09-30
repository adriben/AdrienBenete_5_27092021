let cameraLocalStorage= JSON.parse(localStorage.getItem("productInCart"));
let productQuantity = JSON.parse(localStorage.getItem("productQuantity"))

if(cameraLocalStorage == null){
    document.querySelector('.products').innerHTML = "<h3>Il n'y a rien dans votre panier</h3>"
}else{

   
    cameraLocalStorage.forEach(camera => {
        document.querySelector('.products').innerHTML += `
        <div class="row mt-4 oneArticle">
        
        <img class="w-25 col-3" src="${camera.img}">
        
        <p class="col-3 pt-5">${camera.name} </p>
        <p class="col-3 pt-5">${camera.lens}</p>
        <p class="col-3 pt-5">${camera.price}$
        <i class="fas fa-trash-alt delete col-3 pt-2"></i>
        </div>
        
        `
        
    });
}

function displayCartNumbers(){  //fonction qui affiche le nombre de produit dans le panier
    let inLocalStorage = localStorage.getItem("productQuantity");

    if(inLocalStorage) {
        document.querySelector('.in-cart').textContent = inLocalStorage;
    }else{
        displayItems()
    }
}
displayCartNumbers()








let oneArticle = document.querySelectorAll(".oneArticle")
let deleteBtn = document.querySelectorAll('.delete');
// console.log(deleteBtn);

for(i=0; i<deleteBtn.length; i++){
   deleteBtn[i].onclick = function (e){
       
      e.target.parentNode.parentNode.remove()
      cameraLocalStorage.splice(i -1)
      productQuantity -= 1
      console.log(cameraLocalStorage);
      localStorage.setItem("productInCart", JSON.stringify(cameraLocalStorage));
      localStorage.setItem("productQuantity", JSON.stringify(productQuantity))
      location.reload()
      displayCartNumbers()
      if(productQuantity == 0){
        localStorage.clear();
      }
      
   }
    // console.log(cameraLocalStorage)
}






let cameraLocalStorage= JSON.parse(localStorage.getItem("productInCart"));

if(cameraLocalStorage == null){
    document.querySelector('.products').innerHTML = "<h3>Il n'y a rien dans votre panier</h3>"
}else{
    cameraLocalStorage.forEach(camera => {
        document.querySelector('.products').innerHTML += `
        <div class="row mt-4">
        <i class="fas fa-trash-alt delete"></i>
        <img class="w-25 col-6" src="${camera.img}">
        
        <p class="col-6">
        ce sont les produit ${camera.name} pour ${camera.price}$</p>
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

let deleteBtn = document.querySelectorAll('.delete');
console.log(deleteBtn);

for(btn of deleteBtn){
    btn.addEventListener('click', event =>{
    console.log('ok');
    this.parentNode.remove()
})}






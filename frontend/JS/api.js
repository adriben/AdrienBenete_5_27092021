const cameraContainer = document.getElementById('productsDisplay'); 

export const  getCameras = async () =>{
    return fetch('http://localhost:3000/api/cameras'); //appel a l api pour recupperer les donnes
    
};


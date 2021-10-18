export const  getCameras = async (param, method, data) =>{
     
    return fetch(`http://localhost:3000/api/cameras/${param}`,  {
    method: method,
    headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
}); //appel a l api pour recupperer les donnes
    
};


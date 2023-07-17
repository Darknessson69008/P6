function connect(event){
    event.preventDefault(); 
    const logInput = {
        email : document.querySelector('#email').value,
        password : document.querySelector('#pass').value
    };
    console.log(logInput);
    const storeId = JSON.stringify(logInput);
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: storeId
    })
    .then (resp => resp.json())
    .then ((response) => {
        if (!response.token) { 
            alert("Identifiant ou mot de passe incorrect"); 
            return;
        }
            
        const token = JSON.stringify(response.token);
        window.localStorage.setItem("token", token);
        window.location = "./index.html"; 
    })
}; 


const form = document.querySelector(".logForm")
form.addEventListener("submit",(event)=> connect(event))

// item dans script.js pour verif SI token
// 
// interet de mettre modifier partout? - celui de projets ok, autre sans effets
// 
// pas de message de confirmation pour la suppression
// 
// login => logout avec delete item
// 
// 


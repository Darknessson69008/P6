// mode edition

function showEdit(action){
    const edits = document.querySelectorAll(".edit");
    if (action === "hide"){
        edits.forEach( edit => edit.style.display = "none");
    }else if (action === "show"){
        edits.forEach( edit => edit.style.display = ""); //ne rien faire
    }
}

function logInorOut() {
    const tokenValue = window.localStorage.getItem('token');
    const loginout = document.querySelector("#loginout");
    console.log(loginout)
    if (tokenValue != null){
        showEdit('show');
        loginout.innerText = "logout";
    }else{
        showEdit('hide');
        loginout.innerText = "login";
    };
}

logInorOut();

loginout.addEventListener("click", function(event){
    event.preventDefault();
    if (loginout.innerText === "logout"){
        window.localStorage.removeItem("token");
        window.location = "./index.html";
    }else{
        window.location = "./login.html";
    };
});


const modalGallery = document.querySelector('#small_gallery')
let categoryID = 0;
modalGallery.addEventListener("gallery",(categoryId) => showImages(categoryId))



// dans modal, bouton ajout et suppression
// alerte pour confirmer "confirm()"
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
        loginout.innerText = "logout"; // logout display block & login none
    }else{
        showEdit('hide');
        loginout.innerText = "login"; //
    };
}

logInorOut();

//gestion affichage images et filtres
function showImage (url, title) { //affiche une image
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = url;
    img.alt = title;
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}

function getImages() { //recupère les images
    return fetch("http://localhost:5678/api/works")
    .then((works) => works.json())
    .then((work) => { return work; });
}

function clearImages(){
    const gallery = document.querySelector("#gallery");
    gallery.innerHTML= ''; // favoriser simple quote plutot que double en js
}

function showImages (categoryId) { // affiche les images une par une
    clearImages();
    getImages().then((images) => {
        images.forEach(image => {
            if (categoryId === image.categoryId || categoryId == 0) {
                showImage(image.imageUrl, image.title);
            }
        });
    })
}

function buildFilters() {
    const filters = document.querySelector("#filters");
    return fetch("http://localhost:5678/api/categories")
    .then((categories) => categories.json())
    .then((category) => { return category; })
    .then((cats) => {
        cats.forEach(filter => {
            const button = document.createElement("button");
            button.innerText = filter.name;
            button.className = 'filter';
            button.onclick = function () {
                showImages(filter.id);
            };
            filters.appendChild(button);
        })
    })
}


const modalGallery = document.querySelector('#small_gallery')
let categoryID = 0;
modalGallery.addEventListener("gallery",(categoryId) => showImages(categoryId))

// dans modal, bouton ajout et suppression
// alerte pour confirmer "confirm()"
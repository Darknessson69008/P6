//gestion affichage images et filtres

function showGallImage (url, title) { //affiche une image
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

function clearGallImages(){
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML= ''; // favoriser simple quote plutot que double en js
}

function getGallImages() { //recupère les images
    return fetch("http://localhost:5678/api/works")
    .then((works) => works.json())
    .then((work) => { return work; });
}

function showGalleryImages (categoryId = 0) { // affiche les images une par une
    console.log("executing showGalleryImages")
    clearGallImages();
    getGallImages().then((images) => {
        images.forEach(image => {
            if (categoryId === image.categoryId || categoryId == 0) {
                showGallImage(image.imageUrl, image.title);
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
                showGalleryImages(filter.id);
            };
            filters.appendChild(button);
        })
    })
}

const tous = document.querySelector("#Tous")
tous.addEventListener("click", (event) => {showGalleryImages(0)})

function main(){
    buildFilters();
    showGalleryImages(0);
}

main();
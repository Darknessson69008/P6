/// fonction suppression de type :

function deleteImage(id, token){
  const url = `http://localhost:5678/api/works/${id}`;
  const request = {
      method: "DELETE",
      headers: {
          "Authorization": `Bearer ${token}`
          }
      };
  const response = fetch( url, request);
}
///////Gallery Modal

function showImage (url, title) { //affiche une image
  console.log('executin showImage')
  const smallgallery = document.querySelector("#small_gallery");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = url;
  img.alt = title;
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = "Edition";
  const deleteButton = document.createElement('deletePhoto');
  deleteButton.classList.add("deletePhoto");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  figure.appendChild(deleteButton);
  figure.appendChild(img);
  figure.appendChild(figcaption);
  smallgallery.appendChild(figure);  
  ///ajouter icone + suppression
}

function getImages() { //recupère les images
  return fetch("http://localhost:5678/api/works")
  .then((works) => works.json())
  .then((work) => { return work; });
}

function clearImages(){
  const smallgallery = document.querySelector("#small_gallery");
  smallgallery.innerHTML= ''; // favoriser simple quote plutot que double en js
}

function showImages (categoryId = 0) { // affiche les images une par une
  console.log("executing showImages")
  clearImages();
  getImages().then((images) => {
      images.forEach(image => {
          if (categoryId === image.categoryId || categoryId == 0) {
              showImage(image.imageUrl, image.title);
          }
      });
  })
}

const openModalGallery = document.querySelector('.js_modal')
openModalGallery.addEventListener('click', showImages(0))



///affichage réciproque des modales

function swipeModal() {
  const mod1 = document.querySelector('.modal_main')
  const mod2 = document.querySelector('.modal_add')
  if(mod1.style.display !== "none") {
    mod1.style.display = "none"
    mod2.style.display = "flex"
    ///add closemodal sur X
    ///add et fonction ajout
    }
    else {
      mod1.style.display = "flex"
      mod2.style.display = "none"
    }
}

const addbutton = document.querySelector('.addButton')
addbutton.addEventListener('click', swipeModal)

const ret = document.querySelector('.return')
ret.addEventListener('click', swipeModal)


/// pour resultat sur affichage modal, rappeler l'api de get

/// fonction ajout de type :

function addImage(bodyData, token) {
  const url = "http://localhost:5678/api/works";      
  const request = {
      method: "POST",
      headers: {
       Authorization: `Bearer ${token}`
      },
      body: bodyData
  };
  const response = fetch( url, request);
}


//une modal 1 none 1 block au click
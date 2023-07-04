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

/// fonction ajout de type :

function addImage(bodyData, token) {
  console.log('executin addImage')
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
  const deleteButton = document.createElement('deleteButton');
  deleteButton.classList.add("deleteButton");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  figure.appendChild(img);
  figure.appendChild(deleteButton);
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

////////// vérification validité fichiers

const maxSize = 4000000;

function validFileType(files) {  
  const fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]
  let valid = true;
  for (let i = 0; i < files.length; i++) {
    if(!fileTypes.includes(files[i].type)){
      valid = false;
    }
  }
  return valid;
}
function validFileSize(files) {  
  let valid = true;
  for (let i = 0; i < files.length; i++) {
    if(files[i].size > maxSize) {
      valid = false;
    }
  }
  return valid;
}

////fonction ajout

function addPhoto(e) {
  e.preventDefault();
  console.log('executing addPhoto')
  const token = JSON.parse(localStorage.getItem("token"));  
  const files = add-photo-input.files; 
  const file = files[0];
  const addPhotoLabel = document.querySelector(".add-photo-label");
  const photoForm = document.getElementById("modalform-add");
  const addPhotoInput = document.getElementById("add-photo-input");
  const titleInput = document.getElementById("img-title");
  const categoryInput = document.getElementById("img-category");
  validFileSize(files);
  validFileType(files);
  if(photoForm.validFileType(files) && validFileSize(files)){      
      console.log("fichier ok")
     }else{
      if(files.length === 0){
        Alert("Erreur de fichier!");        
      }else if(!validFileType(files)){
        Alert("Erreur: format de l'image non valide.");        
      }else 
      if(!validFileSize(files)){
        Alert("Erreur: la taille de l'image est trop grande.");        
      }else 
      if(!titleInput.validity.valid){
        Alert("Erreur: Le titre doit être renseigné.");
      }else 
      if(!categoryInput.validity.valid){
        Alert("Erreur: La catégorie doit être renseignée.");        
      return;
     }
    const formDataAdd = new FormData();
      formDataAdd.append("image", file);
      formDataAdd.append("title", titleInput.value);
      formDataAdd.append("category", categoryInput.value);
    const response = addImage(formDataAdd, token);
    if(response.ok)
      return;
    swipeModal();
  }
}

///affichage réciproque des modales

function swipeModal() {
  const mod1 = document.querySelector('.modal_main')
  const mod2 = document.querySelector('.modal_add')
  if(mod1.style.display !== "none") {
    mod1.style.display = "none"
    mod2.style.display = "flex"
    ///attention X ne ferme plus ///add et fonction ajout
    const addButton = document.querySelector('.addPhotoButton')
    addbutton.addEventListener('click', (e) => addPhoto(e))
    }
    else {
      mod1.style.display = "flex"
      mod2.style.display = "none"
      const addButton = document.querySelector('.addPhotoButton')
      addButton.removeEventListener('click', (e) => addPhoto(e))
    }
}

const addbutton = document.querySelector('.addButton')
addbutton.addEventListener('click', swipeModal)

const ret = document.querySelector('.return')
ret.addEventListener('click', swipeModal)


/// pour resultat sur affichage modal, rappeler l'api de get



//une modal 1 none 1 block au click


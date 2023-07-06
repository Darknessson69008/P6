/// fonction suppression de type :

function getToken() {
  return JSON.parse(localStorage.getItem("token"));
}

function deleteImage(id, token) {
  const url = `http://localhost:5678/api/works/${id}`;
  const request = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, request);
}

/// fonction ajout de type :

function addImage(bodyData, token) {
  console.log("executin addImage");
  const url = "http://localhost:5678/api/works";
  const request = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: bodyData,
  };
  return fetch(url, request);
}

///////Gallery Modal

function showImage(url, title, id) {
  //affiche une image
  console.log("executin showImage");
  const smallgallery = document.querySelector("#small_gallery");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = url;
  img.alt = title;
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = "Edition";
  const deleteButton = document.createElement("div");
  deleteButton.classList.add("deleteButton");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteImage(id, getToken()).then(() => {
      showImages();
      showGalleryImages();
    });
  });
  // console.log("delete") => voir si il s'affiche
  // console.log()
  figure.appendChild(img);
  figure.appendChild(deleteButton);
  figure.appendChild(figcaption);
  smallgallery.appendChild(figure);
}

function getImages() {
  //recupère les images
  return fetch("http://localhost:5678/api/works")
    .then((works) => works.json())
    .then((work) => {
      return work;
    });
}

function clearImages() {
  const smallgallery = document.querySelector("#small_gallery");
  smallgallery.innerHTML = ""; // favoriser simple quote plutot que double en js
}

function showImages(categoryId = 0) {
  // affiche les images une par une
  console.log("executing showImages");
  clearImages();
  getImages().then((images) => {
    images.forEach((image) => {
      if (categoryId === image.categoryId || categoryId == 0) {
        showImage(image.imageUrl, image.title, image.id);
      }
    });
  });
}

const openModalGallery = document.querySelector(".js_modal");
openModalGallery.addEventListener("click", showImages(0));

////////// vérification validité fichiers

const maxSize = 4000000;

function validFileType(files) {
  const fileTypes = ["image/jpeg", "image/pjpeg", "image/png"];
  let valid = true;
  for (let i = 0; i < files.length; i++) {
    if (!fileTypes.includes(files[i].type)) {
      valid = false;
    }
  }
  return valid;
}
function validFileSize(files) {
  let valid = true;
  for (let i = 0; i < files.length; i++) {
    if (files[i].size > maxSize) {
      valid = false;
    }
  }
  return valid;
}

////fonction ajout

async function addPhoto(e) {
  e.preventDefault();
  console.log("executing addPhoto");
  const token = getToken();
  const addPhotoInput = document.getElementById("add-photo-input");
  const titleInput = document.getElementById("img-title");
  const categoryInput = document.getElementById("img-category");

  const files = addPhotoInput.files;
  console.log(files);
  const file = files[0];
  /* validFileSize(files);
  validFileType(files);
  if (photoForm.validFileType(files) && validFileSize(files)) {
    console.log("fichier ok");
  } else {
    if (files.length === 0) {
      Alert("Erreur de fichier!");
    } else if (!validFileType(files)) {
      Alert("Erreur: format de l'image non valide.");
    } else if (!validFileSize(files)) {
      Alert("Erreur: la taille de l'image est trop grande.");
    } else if (!titleInput.validity.valid) {
      Alert("Erreur: Le titre doit être renseigné.");
    } else if (!categoryInput.validity.valid) {
      Alert("Erreur: La catégorie doit être renseignée.");
      return;
    } */
  const formDataAdd = new FormData();
  formDataAdd.append("image", file);
  formDataAdd.append("title", titleInput.value);
  formDataAdd.append("category", categoryInput.value);
  await addImage(formDataAdd, token);
  swipeModal();
  showImages();
}

///affichage réciproque des modales

function swipeModal() {
  const mod1 = document.querySelector(".modal_main");
  const mod2 = document.querySelector(".modal_add");
  if (mod1.style.display !== "none") {
    mod1.style.display = "none";
    mod2.style.display = "flex";
    ///attention X ne ferme plus ///add et fonction ajout
    const addButton = document.querySelector(".addPhotoButton");
    addButton.addEventListener("click", (e) => addPhoto(e));
  } else {
    mod1.style.display = "flex";
    mod2.style.display = "none";
    const addButton = document.querySelector(".addPhotoButton");
    addButton.removeEventListener("click", (e) => addPhoto(e));
  }
}

const addbutton = document.querySelector(".addButton");
addbutton.addEventListener("click", swipeModal);

const ret = document.querySelector(".return");
ret.addEventListener("click", swipeModal);

/// pour resultat sur affichage modal, rappeler l'api de get


/// affichage miniature image

function imageHandler(e2) 
{ 
  var store = document.getElementById('imgstore');
  store.innerHTML='<img src="' + e2.target.result +'">';
}

function loadimage(e1)
{
  var filename = e1.target.files[0]; 
  var fr = new FileReader();
  fr.onload = imageHandler;  
  fr.readAsDataURL(filename);
  document.querySelectorAll('.loadimage').forEach((a) => {
    a.style.display='none';
  });
}

window.onload=function()
{
  var y = document.getElementById("add-photo-input");
  y.addEventListener('change', loadimage);
}

//une modal 1 none 1 block au click
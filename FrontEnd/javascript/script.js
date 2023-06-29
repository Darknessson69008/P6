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


// dans modal, 1 bouton ajout et suppression
// alerte pour confirmer "confirm()"

//ouverture et fermeture modal

let modal = null

const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.modal_close').addEventListener('click', closeModal)
    modal.querySelector('.modal_content').addEventListener('click', stopPropagation)
    modal.querySelector('.modal_add').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal_close').removeEventListener('click', closeModal)
    modal.querySelector('.modal_content').removeEventListener('click', stopPropagation)
    modal.querySelector('.modal_add').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js_modal').forEach(a => {
    a.addEventListener('click', openModal)    
})



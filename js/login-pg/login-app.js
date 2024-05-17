import { hideLoader, showLoader } from "../funcs/handlers/loadin-handler.js";
import { register, login } from "../funcs/auth.js";
// import { setPanelLink, getFromLocal, setIntoLocal, showSwal } from "../funcs/utils.js";



const $ = selector => document.querySelector(selector)

const $A = selector => document.querySelectorAll(selector)

//==============================       Variables       ============================\\
//====  Elements  ====\\
let forwardBtns = $A('.form__nav__link')
let forms = $A('.form')
let registerBtn = $('#register-btn')
let loginBtn = $('#login-btn')


//==============================       Functions       ============================\\
function hideForms(){
    forms.forEach(form => form.style.display = 'none')
}

function showForm(formName){
    let form = $(`.${formName}`)
    form.style.display = 'flex'
}

//==============================       Code       ============================\\

forwardBtns.forEach(forwardBtn => {
    forwardBtn.addEventListener('click', e => {
        e.preventDefault();

        let targetForm = forwardBtn.dataset.form
        
        hideForms();
        showForm(targetForm)
    })
});

registerBtn.addEventListener('click', event => {
    event.preventDefault();
    register();
})

loginBtn.addEventListener('click', event => {
    event.preventDefault();
    login()
})

window.addEventListener('load', async () => {
    hideLoader();
})


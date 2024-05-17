import { hideLoader } from "../funcs/handlers/loadin-handler.js";
import { logout } from "../funcs/utils.js";
import { renderAdminInfo } from "./funcs/shared.js";

let logoutBtn = document.querySelector('#logout-btn')

logoutBtn.addEventListener('click', e => {
    e.preventDefault(); 

    logout('../../index.html')
})

window.addEventListener('load', async () => {
    let access = await renderAdminInfo();
    access == 'dont-access' || hideLoader();
})
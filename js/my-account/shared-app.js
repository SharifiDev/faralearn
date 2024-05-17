import { getMe } from "../funcs/auth.js";
import { getFromLocal, logout } from "../funcs/utils.js";
import { renderUserInfo } from "./funcs/shared.js";


renderUserInfo()
document.body.style.overflowY = 'auto'
//Logout Handling
let logoutBtn = document.querySelector('#logout-btn')
logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    logout('../../')
})

// Priveting Route
await getMe()
let userInfo = getFromLocal('userInfo')
if (userInfo.status == false) {
    location.href = '../../login.html'
}

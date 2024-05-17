import { navbarHandler } from "./funcs/handlers/navbar-handler.js";
import { 
    renderTopbarItems,
    checkLogin,
    renderMenuItems,
    renderNavSearchBtnLagic,
    renderMobileSearchBtnLagic  
} from "./funcs/shared.js";

window.addEventListener('load', async () => {
    checkLogin();
    renderTopbarItems();
    renderNavSearchBtnLagic();
    renderMobileSearchBtnLagic();
    await renderMenuItems();
    navbarHandler();
    location.pathname !='/index.html' ? document.body.style.overflowY = 'auto' : ''

})
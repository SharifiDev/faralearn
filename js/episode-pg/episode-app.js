import { hideLoader, showLoader } from "../funcs/handlers/loadin-handler.js";
import { renderBreadcrumbItems, renderPartInfos } from "../funcs/shared.js";

scrollTo(0, 0);
//==============================       Variables       ============================\\
//==============================       Functions       ============================\\
//==============================       Codes       ============================\\
renderBreadcrumbItems();
window.addEventListener('load', async  () => {
    await renderPartInfos()
    hideLoader();
})
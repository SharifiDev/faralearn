import { hideLoader } from "../funcs/handlers/loadin-handler.js";
import { renderGlobalSearch } from "../funcs/shared.js";
window.addEventListener('load', async () => {
    await renderGlobalSearch();
    hideLoader();
})
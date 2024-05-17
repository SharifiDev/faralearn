import { hideLoader, showLoader } from "../funcs/handlers/loadin-handler.js";

import {renderBreadcrumbItems, renderArticleInfos} from "../funcs/shared.js";
// import { checkLogin } from "../funcs/utils.js";
scrollTo(0, 0)
const $ = selector => {
    return document.querySelector(selector)
}
const $A = selector => {
    return document.querySelectorAll(selector)
}
//==============================       Variables       ============================\\
//===   Elements ====\\

const readBtns = $A('.artilce__read-link')





//==============================       Functions       ============================\\









//==============================       Events / Codes       ============================\\

renderBreadcrumbItems("article")
renderArticleInfos()


readBtns.forEach(readBtn => {
    readBtn.addEventListener('click', e => {
        e.preventDefault();

        
        let targetId = readBtn.dataset.target;
        let target = $(`#${targetId}`);

        let targetScrollLong = target.offsetTop;

        scrollTo(0, targetScrollLong)
    })
})

window.addEventListener('load',async () => {
    hideLoader();
})
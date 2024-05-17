import { renderBuyedCourses } from "../../../js/my-account/funcs/shared.js";
import { getBuyedCourses } from "../../../js/my-account/funcs/utils.js";

let filterLinks = document.querySelectorAll(".filter-link");

let courses = await getBuyedCourses()

console.log(courses);
renderBuyedCourses(courses)

filterLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        filterLinks.forEach(link => link.classList.remove('courses-header__link-active'))

        e.target.classList.add('courses-header__link-active')
        renderBuyedCourses(courses, e.target.dataset.method)
    })
})
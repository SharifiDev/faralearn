import { hideLoader, showLoader } from "../funcs/handlers/loadin-handler.js";
import { renderBreadcrumbItems, renderCourseInfos, renderRelatedCoursesAndShortLink, renderCommentSubmit } from "../funcs/shared.js";
// breadCrumb Root Items TEmplate Generator Function 
//==============================       Variables       ============================\\
const courseDetailsIntroduction = document.querySelector('.course-details__introduction')
const firstItem = document.querySelector('#introduction__first-item')
const courseScoreInput = document.querySelector('#course-score-input')

const overly = document.querySelector('.course-details__introduction-overly')
const overlyBtn = document.querySelector('.course-detilas__introduction-btn')




//==============================       Functions      ============================\\

// Overly Handling Codes
let isOpen_introduction = true;
function overlyHandler(){
    if (isOpen_introduction) {
        // When we want close the overly
        let firstItemStyles = getComputedStyle(firstItem)
        let introuductionStyles = getComputedStyle(courseDetailsIntroduction)
        let overlyStyles = getComputedStyle(overly)
        
        courseDetailsIntroduction.style.height = `
             ${parseFloat(firstItemStyles.height) +
             parseFloat(firstItemStyles.marginTop) +
             parseFloat(introuductionStyles.paddingTop) + 
             (parseFloat(overlyStyles.height) / 3)
            }px`;
        

        overly.classList.remove('open')
        isOpen_introduction = false
        overlyBtn.innerHTML = `مطالعه بیشتر
        <i class="fas fa-angle-down course-detilas__introduction-icon"></i>
        `;
        
        event && scrollTo(0, courseDetailsIntroduction.offsetTop - 100)
        event || scrollTo(0, 0)
    }else{
        // When we want open the overly
        
        courseDetailsIntroduction.style.height = 'max-content';
        overly.classList.add('open')
        isOpen_introduction = true
        overlyBtn.innerHTML = `مطالعه کمتر
        <i class="fas fa-angle-up course-detilas__introduction-icon"></i>
        `
    }
    

}
//==============================       Events / Code       ============================\\
courseScoreInput.addEventListener('input', e => {
    if (+ e.target.value > 5) e.target.value = '5'
    if (+ e.target.value < 0) e.target.value = '0'
})

overlyHandler();
overlyBtn.addEventListener('click', overlyHandler);

renderRelatedCoursesAndShortLink();
renderCommentSubmit();
window.addEventListener('load',async () => {
    renderBreadcrumbItems('course');
    await renderCourseInfos();
    hideLoader();
})




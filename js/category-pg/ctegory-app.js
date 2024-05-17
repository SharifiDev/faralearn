import { hideLoader, showLoader } from "../funcs/handlers/loadin-handler.js";
import {  getUrlParam, generateCourses, courseSorting, searchInArray, setDefaultSelection, paginateItems } from "../funcs/utils.js";
import {
  getCoursesByCategory,
} from "../funcs/shared.js";

//==============================       Variables       ============================\\
let categorCoursesWrapper = document.querySelector("#categor-courses-wrapper");
let showTypeBtn = document.querySelectorAll(".courses__topbar__btns");
let userSelectionItems = document.querySelectorAll('.courses__topbar__selection-item');
let userSelectionTitle = document.querySelector('.courses__topbar__selection-title');
let coursesSearchInput = document.querySelector('.courses__topbar__search-input');
let paginationElem = document.querySelector('.pagination-list')
let coursesByCategory = null;
let inUsingCourses = null
let gSortedCourses = null
//==============================       Functions       ============================\\
let coursesType = getUrlParam('showType') || 'col';
let currentPage = getUrlParam('currentPage') || 1;
function showCourses(type) {

  console.log(inUsingCourses, paginateItems(inUsingCourses, 3, 1));
  if (inUsingCourses.length) {
    generateCourses(type, categorCoursesWrapper, paginateItems(inUsingCourses, 3, currentPage), true, null)
  } else {
    categorCoursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
        <div class="alert alert-danger">برای دسته بندی <span class="underline">${getUrlParam(
          "cat"
        )}</span> دوره ای یافت نشد. </div>
    `
    );
  }
}
//==============================       Events / Codes       ============================\\

window.addEventListener("load", async () => {
  coursesByCategory = await getCoursesByCategory();
  inUsingCourses = [...coursesByCategory]

  await showCourses(coursesType);
  hideLoader();
});

userSelectionItems.forEach(userSelectionItem => {
  userSelectionItem.addEventListener('click', e => {
    paginationElem.innerHTML = ''
    categorCoursesWrapper.innerHTML = ''
    userSelectionItems.forEach(item => item.classList.remove('courses__topbar__selection-item--active'));

    userSelectionItem.classList.add('courses__topbar__selection-item--active');

    userSelectionTitle.innerHTML = `
      ${userSelectionItem.innerText}
      <i class="fas fa-angle-down courses__topbar__selection-icon"></i>`;

    let selectionSortingMethod = userSelectionItem.dataset.key;
    let sortedCourses =  courseSorting([...inUsingCourses], selectionSortingMethod);
    generateCourses(coursesType, categorCoursesWrapper, sortedCourses, true, null)
  })
})

showTypeBtn.forEach(button => {
  // console.log(button.dataset.type == );
  button.classList.remove("courses__topbar__btn--active")
  if (button.dataset.type == getUrlParam('showType')) {
    button.classList.add("courses__topbar__btn--active");
  }else if(!getUrlParam('showType')){
    showTypeBtn[0].classList.add('courses__topbar__btn--active')
  }
  button.addEventListener("click", (event) => {
    setDefaultSelection(userSelectionItems, userSelectionTitle)
    userSelectionItems[0].classList.add('courses__topbar__selection-item--active')
    categorCoursesWrapper.innerHTML = ''


    
    
    let targetType = button.dataset.type
    coursesType = targetType
    location.href = `category.html?showType=${targetType}${getUrlParam('cat') ? `&cat=${getUrlParam('cat')}` : ''}${getUrlParam('currentPage') ? `&currentPage=${getUrlParam('currentPage')}` : ''}`
    showCourses(targetType)
  });
});

coursesSearchInput.addEventListener('input', e => {
  paginationElem.innerHTML = ''
  setDefaultSelection(userSelectionItems, userSelectionTitle)
  categorCoursesWrapper.innerHTML = ''
  let value = event.target.value.trim();
  
  let searchedCourses = [...searchInArray(coursesByCategory, 'name', value), ...searchInArray(coursesByCategory, 'description', value)]
  let removedRepeatedCourses = [];
  searchedCourses.forEach((course) => removedRepeatedCourses.includes(course) || removedRepeatedCourses.push(course));
  //After Deleting Repeat Courses
  searchedCourses = removedRepeatedCourses;
  
  inUsingCourses = searchedCourses

  if (!value) {
    showCourses(coursesType)
    return false
  }
  
  if (searchedCourses.length) {
    generateCourses(coursesType, categorCoursesWrapper, searchedCourses, true, null)
  }else{
    categorCoursesWrapper.insertAdjacentHTML('beforeend', `
    <div class="alert alert-danger">هیچ دوره ای برای جستجوی <span class="underline">${value}</span> نداشتیم</div>
    `)
  }
  
})



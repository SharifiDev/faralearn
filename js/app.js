//==============================       Variables       ============================\\

// import {setPanelLink , setIntoLocal, showSwal} from"./funcs/utils.js";
import { hideLoader } from "./funcs/handlers/loadin-handler.js";
import { typewriterHandler } from "./funcs/handlers/typeWriter-handler.js";

import {
  renderLatesCourses,
  renderLatesArticles,
  renderPopularCourses,
  renderPresellCourses,
  renderLandingSearchBtnLagic,

} from "./funcs/shared.js";
import { getLandingInfos, showToastSwal } from "./funcs/utils.js";


// let aboutUsInfo = [
//     {title : 'دوره های اختصاصی', subtitle: 'با پشتیبانی و کیفیت بالا ارائه میده !', icon : 'far fa-copyright'},
//     {title : 'اجازه تدریس', subtitle: 'به هر مدرسی رو نمیده. چون کیفیت براش مهمه !', icon : 'fas fa-leaf'},
//     {title : 'دوره پولی و رایگان', subtitle: 'براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده', icon : 'fas fa-gem'},
//     {title : 'اهمیت به کاربر', subtitle: 'اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست', icon : 'fas fa-crown'},
// ]

//==============================       Functions       =================\\
const landingCountHandler = async () => {

  //==============================       Variables       ============================\\
  const usersCountElem = document.querySelector("#users-count");
  const coursesCountElem = document.querySelector("#courses-count");
  const coursesMinutesElem = document.querySelector("#courses-minutes");
  let landingInfos = await getLandingInfos();
  console.log("Landing Infos => ", landingInfos)
  let siteUsersCount = 10_44;
  let siteCoursesCount = 34;
  let siteCoursesMinutes = 31_32;
  // let {usersCount : siteUsersCount, coursesCount : siteCoursesCount, totalTime :  siteCoursesMinutes} = landingInfos
  //==============================       Functions       ============================\\

  /**
   * @param {Number} min
   * @param {Number} max
   * @param {Element} el
   * @param {Number} sec
   */

  function landingCountsRender(max, el, sec, minZ) {
    el.innerHTML = Math.ceil(max * minZ);
    
    let counterInterval = +el.innerText >= max || setInterval(() => {
      if (+el.innerText >= max - 1) {
        clearInterval(counterInterval);
      }
      el.innerText = +el.innerText + 1;
    }, sec);
  }
  landingCountsRender(siteUsersCount, usersCountElem, 50, 0);
  landingCountsRender(siteCoursesCount, coursesCountElem, 100, 0);
  landingCountsRender(siteCoursesMinutes, coursesMinutesElem, 0.5, 0);
  //==============================       Events / Code       ============================\\
  
};

const sliderHandler = () => {
  let slider = new Swiper('.swiper', {
      loop : true,
      slidesPerView : 'auto',
      centeredSlides : true,
      spaceBetween : 25,
      autoplay: {
          delay: 900,
      },
      navigation : {
          prevEl : '.swiper-button-prev',
          nextEl : '.swiper-button-next'
      },
      // pagination : {
      //     el : '.swiper-pagination',
      //     dynamicBullets : true,
      //     clickable : true
      // }
  })
}

function removeSliderBugs() {
  let sec = 200
  let removeSwiperBogs = setInterval(() => {

    document.querySelectorAll(".course-box").forEach((box) => {
      box.classList.contains("cart-odd") ||
        box.classList.contains("cart-even") ||
        box.remove();
    });

    document
      .querySelectorAll(".course-box__teacher-stars")
      .forEach((starsBox) => {
        let i = 0;

        for (let star of starsBox.children) {
          i++;
          i <= 5 || star.remove();
        }
      });
    
    sec = 1000
  }, sec);

  setTimeout(() => {
    console.log("interval cleared");
    clearInterval(removeSwiperBogs);
  }, 2000);
}

Swal.fire({
  title : 'منتظر بمانید...',
  text : 'ممکن است کمی طول بکشد',
  icon : 'info',
  toast: true,
  position: "top-end",
  timer: 8000,
  timerProgressBar: true,
  showConfirmButton: false,
  backdrop: true,

  didOpen: function (toast) {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

//==============================       Events / Code       ============================\\
removeSliderBugs();
renderLatesCourses();

renderLatesArticles();
renderLandingSearchBtnLagic();
window.addEventListener("load", async () => {
  typewriterHandler();
  await renderPopularCourses();
  sliderHandler();
  await hideLoader({hasSwal : true})
  document.body.style.overflowY = 'auto'
  landingCountHandler();
  // sliderHandler();
});

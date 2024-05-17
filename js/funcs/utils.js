import { getMe } from "./auth.js";
const coversMainUrl = "https://sabzlearn2.liara.run";
const mainUrl = 'https://sabzlearn2.liara.run/v1'

const showSwal = (title, text, icon, callback, btnText) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: btnText || "باشه",
    showCloseButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      callback(result);
    }else{
      throw result
    }
    
  }).catch(err => {
    callback(err)
  });
};
const showToastSwal = (title, text, icon) => {
  Swal.fire({
    title,
    text,
    icon,
    toast: true,
    position: "top-start",
    timer: 4000,
    timerProgressBar: true,
    showConfirmButton: false,
    backdrop: true,

    didOpen: function (toast) {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

const showInputSwal = (title, placeHolder, btnText, callback) => {
  Swal.fire({
    title,
    input : 'text',
    confirmButtonText : btnText,
    inputPlaceholder: placeHolder,
    showCloseButton : true,
  }).then(res => {
    callback(res)
  })
}

const setCopyWhenClick = async (el) => {
  await navigator.clipboard.writeText(el.innerHTML)
}

const setPanelLink = (el, status) => {
  function sugMessage() {
    event.preventDefault();
    showToastSwal('', '', '')
    showSwal("ابتدا باید وارد شوید", null, "warning", (result) => {
      if (result.isConfirmed) {
        location.href = "login.html";
      }
    });
  }

  if (status) {
    if (location.href.includes('my-account')) {
      el.parentElement.href = "./";
    }else{
      el.parentElement.href = "my-account/Account";
    }
  }
  if (!status) el.parentElement.onclick = sugMessage;
};

const hideElement = (el) => {
  el.style.opacity = "0";
  setTimeout(() => {
    el.style.display = 'none'
  }, 400);
}

const showElement = (el, display = 'block') => {
  el.style.display = display;
  el.style.opacity = '1'
}


const setIntoLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getFromLocal = (key) => JSON.parse(localStorage.getItem(key));

const setShortLink = (el) => el.innerHTML = location.href;

const getToken = () => {
  let userInfoStr = JSON.parse(localStorage.getItem("user"));
  return userInfoStr?.accessToken;
};

const logout = (href = 'index.html') => {
  localStorage.removeItem('user')
  location.href = href
}

const getUrlParam = (key) => {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

const generateCourseTemplate = (
  type = "col",
  courseOrder,
  aos,
  course,
  customClass = ""
) => {
  if (type == "col") {
    return `
      <course-box class="${customClass}"
          imgSrc="${coversMainUrl}/courses/covers/${course.cover}"
          title="${course.name}"
          teacherName="${course.creator || 'نامعلوم'}"
          studentsCount="${course.registers || 0}"
          price="${course.price}"
          href="course.html?name=${course.href || course.shortName}&cat=${getUrlParam('cat')}"
          starsNum="${course.courseAverageScore || 0}"
          order="${courseOrder ? "odd" : "even"}"
          data-aos="${aos}"
          discount=${course?.discount}
      ></course-box>
    `;
  } else {
    return `
    <course-row-box class="${customClass}"
        imgSrc="${coversMainUrl}/courses/covers/${course.cover}"
        order="${courseOrder ? "odd" : "even"}"
        title="${course.name}"
        teacherName="${course.creator || 'نامعلوم'} "
        starsNum="${course.courseAverageScore || 0}"
        description="${course.description}"
        href="course.html?name=${course.href || course.shortName}&cat=${getUrlParam('cat')}"
        studentsNum="${course.registers|| 0} "
        price="${course.price ? course.price.toLocaleString() : "رایگان"}"
        data-aos="${aos}"
    ></course-row-box>
    `;
  }
};

const generateArticleTemplate = (aos, article) => {
  console.log(aos);
  return `
    <article-box
        imgSrc="${coversMainUrl}/courses/covers/${article.cover}"
        title="${article.title}"
        subTitle="${article.description}"
        aos="${aos}"
        href="article.html?name=${article.shortName}"
    ></article-box>
  `;
};

// Generator Mobile Menu Items Template
const generateMobileMenuItemTemplate = (menuItem) => {
  return `
  ${
    menuItem.length
      ? `
      <li class="mobile-nav__item">
          <p class="mobile-nav__link">${menuItem.title}</p>
          <i class="fas fa-angle-down"></i>
          <ul class="mobile-nav__dropdown-menu">
              ${menuItem.submenus
                .map(
                  (submenu) => `
                  <li class="nav-mobile__dropdown-item">
                      <a href="course.html?name=${submenu.href}" class="mobile-nav__dropdown-link">${submenu.title}</a>
                  </li>
                `
                )
                .join(" ")}
          </ul>
      </li>
      `
      : `
        <li class="mobile-nav__item">
          <a href=category.html?cat=${menuItem.href} class="mobile-nav__link">${menuItem.title}</a>
        </li>
      `
  }
  `;
};

const generateNavMenuItemTemplate = (menuItem) => {
  return `
  <li class="navbar__item">
  <a href=category.html?cat=${menuItem.href} class="navbar__link">${
    menuItem.title
  }</a> 
      
  `;
};

const generateTopbarItemTemplate = (topbarItem) => {
  return `
  <li class="top-bar__item">
      <a href="course.html?name=${topbarItem.href}" class="top-bar__link" data-text="${topbarItem.title}">${topbarItem.title}</a>
  </li>
  `;
};

const courseSorting = (courseArr, sortMethod) => {
  let sortedCourseArr = [];

  switch (sortMethod) {
    case "free":
      sortedCourseArr = courseArr.filter((course) => course.price == 0);
      break;

    case "money":
      sortedCourseArr = courseArr.filter((course) => course.price != 0);
      break;

    case "score":
      sortedCourseArr= [...courseArr]
       .sort((a, b) => 0.5 - Math.random())
       .sort((a, b) => b.courseAverageScore - a.courseAverageScore);
      break;

    case "last":
       sortedCourseArr = courseArr;
      break;

    case "first":
      sortedCourseArr = [...courseArr].reverse();
      break;

    default:
      sortedCourseArr = courseArr;
      break;
  }

  return sortedCourseArr;
};

const searchInArray = (array, searchedProperty, searchedValue) => {
  let outputArr = array.filter((item) =>
    item[searchedProperty].toLowerCase().includes(searchedValue.toLowerCase())
  );
  return outputArr;
};

const setDefaultSelection = (allSelections, selectionTitle) => {
  selectionTitle.innerHTML = `
    تمامی دوره ها
    <i class="fas fa-angle-down courses__topbar__selection-icon"></i>
  `;

  allSelections.forEach((item) =>
    item.classList.remove("courses__topbar__selection-item--active")
  );
};

const generateCourses = (type, wrapper, courses, aos = null, customClass) => {
  courses = [...courses]
  let courseOrder = 0;
  let aosList = ["fade-up-left", "fade-up", "fade-up", "fade-up-right"];
  let aosIndex = 0;
  let courseTemplate = null;

  courses.forEach((course) => {
    courseTemplate = !!aos != false
     ? generateCourseTemplate(type, courseOrder, aosList[aosIndex], course, customClass) 
     : generateCourseTemplate(type, courseOrder, null, course, customClass);

    wrapper.insertAdjacentHTML("beforeend", courseTemplate);
    aosIndex = aosIndex < aosList.length - 1 ? aosIndex + 1 : 0;
    courseOrder = !courseOrder;
  });
};

const generateArticles = (wrapper, articles, aos = null) => {
  let aosList = ["fade-up-left", "fade-up", "fade-up", "fade-up-right"];
  let aosIndex = 0;
  let articleTemplate = null;

  [...articles].splice(-4).forEach((article) => {
    articleTemplate = !!aos ?  generateArticleTemplate(aosList[aosIndex], article) : generateArticleTemplate('', article)
    wrapper.insertAdjacentHTML("beforeend", articleTemplate);

    aosIndex = aosIndex < aosList.length - 1 ? aosIndex + 1 : 0;
  });
};


const getCourseInfos = async () => {
  
  let courseShortName = getUrlParam('name');

  let getCourseInfoReq = await fetch(`${mainUrl}/courses/${courseShortName}`,{
      method: 'GET',
      headers : {
          Authorization : `Bearer ${getToken()}`
      }
  });

  let courseInfo = await getCourseInfoReq.json();

  return courseInfo
}

const getMenuItems = async () => {
  // let getMenuItemsReq = await fetch(`${mainUrl}/menus`);
  // let menuItems = await getMenuItemsReq.json();
  let menuItems =[
    {
      "_id": {
        "$oid": "634599e2d4a59348b0c6e2b0"
      },
      "title": "پایتون",
      "href": "python",
      "createdAt": {
        "$date": "2022-10-11T16:29:22.692Z"
      },
      "updatedAt": {
        "$date": "2022-10-11T16:29:22.692Z"
      },
      "__v": 0
    }
  ]
  return menuItems
}

const getPartInfos = async () => {
  let courseShortName = getUrlParam('name');
  let courseId = getUrlParam('id');
  let token = getToken();
  
  let getPartInfosReq = await fetch(`${mainUrl}/courses/${courseShortName}/${courseId}`,{
    method : 'GET',
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
  let partInfos = getPartInfosReq.json();

  return partInfos
}

const generateBreadcrumbItemTemplate = item => `
<li class="breadcrumb__item">
    <a href="${item[1]}" class="breadcrumb__link">
        <i class="fas fa-angle-left breadcrumb__list-icon"></i>
        ${item[0]}
    </a>
</li>
`

const calculateCourseTime = seassons => {
  if (!seassons.length) {
    return '00:00'
  }

  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  seassons.forEach(seasson => {
    seasson.forEach(part => {
      minutes += + part.time.slice(0, 2);
      seconds += +part.time.slice(-2)
    })
  });

  minutes += (seconds / 60);
  hours += (minutes / 60);
  minutes = (minutes % 60);
  
  hours = Math.floor(hours).toString().padStart(2, '0');
  minutes = Math.ceil(minutes).toString().padStart(2, '0');

  let courseTime = `${hours}:${minutes}`;
  return courseTime
}

const calculateCourseParts = seassons => {
  let courseParts = 0;
  seassons.forEach(seasson => {
    seasson.forEach(part => {
      courseParts += 1
    })
  })

  return courseParts
}

const generateCommentTemplate = (comment, userRole) => {
 return `
 <div class="comments__comment">
      <div class="comments__comment-right">
          <img src="${
                      comment.creator?.profile ? 
                      `${coversMainUrl}/courses/covers${comment.creator?.profile}` 
                      :'./images/teachers/none.jfif'
                    }"
            class="comments__comment-img">

          <span class="comments__comment-role" data-role="${comment.creator?.role}">(
            ${
              comment.creator?.role == 'USER' ?
              'دانشجو' :
              'مدرس'
            }
           )</span>
      </div>
    
      <div class="comments__comment-left">
          <div class="comments__comment__header">
              <div class="comments__add-comment__header-right">
                  <span class="comments__comment__name">${comment.creator?.name}</span>
                  <span class="comments__comment__date">${comment.createdAt.slice(0, 10).replaceAll('-', '/')}</span>
              </div>

              ${userRole == 'ADMIN' ? `
                <div class="comments__comment__answer-btn" data-id="${comment?._id}" data-name="${comment.creator.name}">
                  <i class="fas fa-reply"></i>
                </div>
              ` : ''}
          </div>
    
          <p class="comments__comment__description">
              ${comment.body}
          </p>
    
          ${
            comment.answerContent ?
            `
            <div class="comments__comment__subcomment comments__comment">
              <div class="comments__comment-right">
                  <img src="${
                        comment.answerContent.creator.profile ? 
                        `${coversMainUrl}/courses/covers${comment.answerContent.creator.profile}`
                        :'./images/teachers/none.jfif'
                      }"
                    class="comments__comment-img">
                  <span class="comments__comment-role" data-role="${comment.answerContent.creator.role}">(
                    ${
                      comment.answerContent.creator.role == 'USER' ?
                      'دانشجو' :
                      'مدرس'
                    }
                  )</span>
              </div>
            
              <div class="comments__comment-left">
                  <div class="comments__comment__header">
                      <span class="comments__comment__name">${comment.answerContent.creator.name}</span>
                      <span class="comments__comment__date">${comment.answerContent.createdAt.slice(0, 10).replaceAll('-', '/')}</span>
                  </div>
            
                  <p class="comments__comment__description">
                      ${comment.answerContent.body}
                  </p>
              </div>
            </div>
            ` : ''
          }
      </div>
  </div>
 `
}

const generateCoursePartTemplate = (index, title, href, time, isFree = false, isRegister = false) =>{
  return `
  <div class="course-details__seasson__part">
    <div class="course-details__seasson__part-right">
        <span class="course-details__seasson__part-count">${isNaN(+index) ? index : + index + 1}</span>
        <i class="course-details__seasson__part-icon fab fa-youtube"></i>
        ${
          (isRegister || isFree) 
          ? 
          `<a href="episode.html?name=${getUrlParam('name')}&id=${href}&partCount=${+index + 1}"
          class="course-details__seasson__part-title">${title}</a>`
          :
          `<span class="course-details__seasson__part-title">${title}</span>`
        }
        
    </div>    
  
    <div class="course-details__seasson__part-left">
        <span class="course-details__seasson__part-minutes">${time}</span>
        <i class="fas ${isFree ? 'fa-play-circle' : isRegister ? 'fa-lock-open' : 'fa-lock'}  course-details__seasson__part-icon"></i>
    </div>
  </div>
  `
}

const generateCourseSessionTemplate = (session, isRegister, index) => {
  if (session == 'none') {
    return`
    <div class="accordion-item course-details__seasson">
      <h2 class="accordion-header course-details__seasson__header">
        <button class="accordion-button course-details__seasson__header-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
          جلسات
          <i class="fas fa-angle-down course-details__header-icon"></i>
        </button>
      </h2>


      <div id="collapse${index}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
        <div class="accordion-body course-details__seasson__body">
            ${
              generateCoursePartTemplate('--', 'هنوز ویدئویی برای این دوره وجود ندارد', null, '00:00', false, false)
            }
        </div>
      </div>
    </div>
    `
  }

  return`
  <div class="accordion-item course-details__seasson">
      <h2 class="accordion-header course-details__seasson__header">
        <button class="accordion-button course-details__seasson__header-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
          ${session.title}
          <i class="fas fa-angle-down course-details__header-icon"></i>
        </button>
      </h2>
  
  
      <div id="collapse${index}" class="accordion-collapse collapse ${(index == 0) && 'show' }" data-bs-parent="#accordionExample">
        <div class="accordion-body course-details__seasson__body">
            ${
              
              session.parts.map((part, index) =>{
                return generateCoursePartTemplate(index, part.title, part._id, part.time, part.free, isRegister)
              })
            }               
        </div>
      </div>
  </div>
  `
}

const generateAsideItemTemplate = item => {
  return `
    <li class="aside-products__item">
      <a href="course.html?name=${item.shortName}" class="aside-products__link">
          <img src="${coversMainUrl}/courses/covers/${item.cover}" alt="nodeJS" class="aside-products__link-img">
          <span class="aside-products__link-title">${item.name}</span>
      </a>
    </li>
  `
}

const getCourseBreadcrumbList = async () => {
  let courseInfos = await getCourseInfos();
  let breadcrumbList = [
    [courseInfos?.categoryID?.title, `category.html?cat=${courseInfos?.categoryID?.name}`],
    [courseInfos?.name, `course.html?name=${courseInfos?.shortName}`]];

  return breadcrumbList
}

const getPartBreadcrumbList = async () => {
  let courseInfos = await getCourseInfos();
  let categoryItem = [courseInfos.categoryID.title, `category.html?cat=${courseInfos.categoryID.name}`];
  let courseItem = [courseInfos.name, `course.html?name=${getUrlParam('name')}`]
    return [
      categoryItem,
      courseItem,
    ]
    
}



const getNewsLetterMembers = async () => {
  let getMemberReq = await fetch(`${mainUrl}/newsletters`);
  let members = await getMemberReq.json();
  return members
}


const getSearchedData = async () => {
  let getDataReq = await fetch(`${mainUrl}/search/${getUrlParam('value')}`);
  let getDataRes = getDataReq.json();

  return getDataRes
}

const submitComment = async (commentValue, score) => {
  // let courses = await fetch(`${mainUrl}/courses`)
  // courses = await courses.json();
  // console.log(courses);
  if (!commentValue.trim()){
    showToastSwal('باید متنی وارد کنید.', '', 'warning');
    return false
  }

  let commentData = {
    body : commentValue.trim(),
    courseShortName : getUrlParam('name'),
    score : score
  }

  let sendComment = await fetch(`${mainUrl}/comments`, {
    method : 'POST',
    headers : {
      'Authorization' : `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(commentData)
  })


  let sendCommentRes = await sendComment.json();

  return sendComment.ok ? sendComment :  sendCommentRes?.message[0]?.message || sendCommentRes?.message
}

const answerComment = async (answerBody, id) => {

  let answerData = {
    body : answerBody,
  }

  let answerReq = await fetch(`${mainUrl}/comments/answer/${id}`, {
    method : 'POST',
    headers : {
      Authorization : `Bearer ${getToken()}`,
      "Content-Type" : 'application/json'
    },
    body : JSON.stringify(answerData)
  });

  let answerRes = await answerReq.json();

  return answerReq.ok ? answerReq : answerRes?.message[0]?.message || answerRes.message
}

const paginateItems = (array, itemsPerPage, curentPage) => {
  array = [...array]
  let paginationItemsWrapper = document.querySelector('.pagination-list')
  paginationItemsWrapper.innerHTML = ''

  let startIndex = curentPage * itemsPerPage - itemsPerPage;
  
  let itemsInPage = [...array].splice(startIndex, itemsPerPage)
  let pagesCount = Math.ceil(array.length / itemsPerPage);
  
  for (let i = 1; i <= pagesCount; i++){
    paginationItemsWrapper.insertAdjacentHTML('beforeend', `
      <li class="pagination-item">
            <a href="${location.pathname}?currentPage=${i}${getUrlParam('cat') ? `&cat=${getUrlParam('cat')}` : ''}${getUrlParam('showType') ? `&showType=${getUrlParam('showType')}` : ''}" class="pagination-link ${i == curentPage && 'pagination-link--active'}">
                ${i}
            </a>
      </li>
    `)
  }

  return itemsInPage;
}


const registrationReq = async (id, price) => {
  let registerReq = await fetch(`${mainUrl}/courses/${id}/register`, {
    method : 'POST',
    headers : {
      Authorization : `Bearer ${getToken()}`,
      "Content-Type" : "application/json"
    },
     body : JSON.stringify({price})
  });
  let registerRes = await registerReq.json();

  return registerReq.ok ? registerReq : registerRes?.message[0]?.message || registerReq?.message 
  
}

const registerToCourse = async (courseID, price) => {
  let registerReq = await registrationReq(courseID, price)

  if (registerReq.ok) {
    showSwal('موفق', 'ثبت نام دردوره با موفقیت انجام شد', 'success', (result) => {
      if (result.isConfirmed) {
        location.reload()
      }
    })
  }else{
    showToastSwal('ناموفق', sendReq, 'error')
  }
}

const getLandingInfos = async () => {
  let getReq = await fetch(`${mainUrl}/infos/index`)
  let getRes = await getReq.json()
  return getRes
}

const getArticle = async () => {
  let getReq = await fetch(`${mainUrl}/articles/${getUrlParam('name')}`)
  let getRes = await getReq.json()
  return getRes
}

const getArticleBreadcrumbList = async () => {
  let articleInfos = await getArticle();
  let breadcrumbList = [
    [articleInfos?.categoryID?.title, `category.html?cat=${articleInfos?.categoryID?.name}`],
    [articleInfos?.title, `article.html?name=${articleInfos?.shortName}`]];

  return breadcrumbList
}


export {
  showSwal,
  showToastSwal,
  showInputSwal,
  getNewsLetterMembers,
  setIntoLocal,
  setShortLink,
  hideElement,
  showElement,
  setCopyWhenClick,
  getFromLocal,
  getToken,
  logout,
  setPanelLink,
  getUrlParam,
  getPartInfos,
  generateCourseTemplate,
  generateArticleTemplate,
  generateMobileMenuItemTemplate,
  generateNavMenuItemTemplate,
  generateTopbarItemTemplate,
  courseSorting,
  searchInArray,
  setDefaultSelection,
  generateCourses,
  generateArticles,
  getCourseInfos,
  generateBreadcrumbItemTemplate,
  calculateCourseTime,
  calculateCourseParts,
  generateCommentTemplate,
  generateCourseSessionTemplate,
  generateAsideItemTemplate,
  getCourseBreadcrumbList,
  getPartBreadcrumbList,
  getSearchedData,
  submitComment,
  answerComment,
  paginateItems,
  getMenuItems,
  registerToCourse,
  getLandingInfos,
  getArticle,
  getArticleBreadcrumbList
};

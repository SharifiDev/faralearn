// each file to use this function , most link the below function from utils.js
// setPanelLink, getFromLocal, setIntoLocal, showSwal
import { getMe, register } from "./auth.js";
import { setPanelLink,
     getFromLocal,
     getCourseBreadcrumbList,
     getPartBreadcrumbList,
     getPartInfos,
     setIntoLocal,
     setShortLink,
     hideElement,
     showElement,
     setCopyWhenClick,
     showSwal,
     showToastSwal,
     showInputSwal,
     getUrlParam,
     generateTopbarItemTemplate,
     getToken,
     generateMobileMenuItemTemplate,
     generateNavMenuItemTemplate,
     getCourseInfos,
     generateCourses,
     generateArticles,
     generateBreadcrumbItemTemplate,
     calculateCourseTime,
     calculateCourseParts,
     generateCommentTemplate,
     generateCourseSessionTemplate,
     generateAsideItemTemplate,
     getNewsLetterMembers,
     getSearchedData,
     submitComment,
     answerComment,
     paginateItems,
     getMenuItems,
     registerToCourse,
     getArticle,
     getArticleBreadcrumbList
} from "./utils.js";



const mainUrl = 'https://sabzlearn2.liara.run/v1';
const coversMainUrl = "https://sabzlearn2.liara.run";




const checkLogin = () => {
    
    const navbarProfile = document.querySelector('.navbar__prifile-text')

    function whenLogin(loginInfo){
      // setIntoLocal('userInfo', loginInfo)
      setPanelLink(navbarProfile, true);
      navbarProfile.innerText = `${loginInfo.userInfo.name}`;
      
    }
    function whenNotLogin(){
      navbarProfile.innerText = `حساب کاربری`
        setPanelLink(navbarProfile, false)
    }
    
    async function isLogin (){
      let isLoginInfo = await getMe();
      console.log(isLoginInfo);
      if (isLoginInfo?.status) {
        whenLogin(isLoginInfo);
      }else{
        whenNotLogin();
      }
    }
  
    isLogin();
}

const renderBreadcrumbItems = async (page) => {
    let breadcrumbContainer = document.querySelector('.breadcrumb__list');
    let breadcrumbList = page == 'course' ? await getCourseBreadcrumbList() : page =="article" ? await getArticleBreadcrumbList() :  await getPartBreadcrumbList();
    
    breadcrumbList.forEach(breadcrumbItem => {

        let template = generateBreadcrumbItemTemplate(breadcrumbItem)
        breadcrumbContainer.insertAdjacentHTML('beforeend', template)
    })
    
}

const renderTopbarItems = async ()  => {
    let topbar = document.querySelector('.top-bar__menu');
    let getTopbarItemsReq = await fetch(`${mainUrl}/menus/topbar`);
    let topbarItems = await getTopbarItemsReq.json();
    let shuffledArray = [...topbarItems].sort((a, b) => 0.5 - Math.random()).slice(-4);

    shuffledArray.splice(0, 6)
     .forEach(topbarItem => {
        topbar.insertAdjacentHTML('beforeend',  generateTopbarItemTemplate(topbarItem))
     })
    
}

//Mobile And Navbar Items Of Menu Handler
const renderMenuItems = async () => {
    let navbarMenu = document.querySelector('#navbar-menu');
    let mobileMenu = document.querySelector('#mobile-menu');
    
    let menuItems = await getMenuItems()
    getMenuItems().then(res =>console.log(res))
    menuItems.forEach(menuItem => {
        navbarMenu.insertAdjacentHTML('beforeend', generateNavMenuItemTemplate(menuItem))
        mobileMenu.insertAdjacentHTML('beforeend', generateMobileMenuItemTemplate(menuItem))
    })

}


const renderLatesCourses = async ()  => {
    let latesCoursesWrapper = document.querySelector('#lates-courses-wrapper')
    let getCoursesReq = await fetch(`${mainUrl}/courses`)
    let courses = await getCoursesReq.json();
    console.log(courses);
    let randomCourses =  [...courses].slice(0, 4).sort((a, b) => 0.5 - Math.random());
    generateCourses("col",latesCoursesWrapper, randomCourses, true)
}

const renderLatesArticles = async () => {
    let latesArticlesWrapper = document.querySelector('#lates-articles-wrapper')
    let getArticlesReq = await fetch(`${mainUrl}/articles`)
    let articles = await getArticlesReq.json();
    console.log(articles);
    let randomArticles = [...articles].slice(0, 5).sort((a, b) => 0.5 - Math.random())
    generateArticles(latesArticlesWrapper, randomArticles, true)
}



const getCoursesByCategory = async () => {
    let categoryName = getUrlParam('cat');
    
    let getCoursesByCategoryReq = categoryName ? await fetch(`${mainUrl}/courses/category/${categoryName}`) : await fetch(`${mainUrl}/courses`)
    let coursesByCategory = await getCoursesByCategoryReq.json();

    console.log(coursesByCategory);
    return coursesByCategory
}
 
const renderPopularCourses = async () => {
    let popularCoursesWrapper = document.querySelector('#popular-courses-wrapper');
    let getPopularCoursesReq = await fetch(`${mainUrl}/courses/popular`);
    let popularCourses = await getPopularCoursesReq.json();
    let randomCourses = [...popularCourses].sort((a, b) => 0.5 - Math.random())
    generateCourses("col",popularCoursesWrapper, randomCourses, null, 'swiper-slide')
}

const renderPresellCourses = async () => {
    let presellCouresWrapper = document.querySelector('#presell-courses-wrapper');
    let getPresellCoursesReq = await fetch(`${mainUrl}/courses/presell`);
    let presellCourses = await getPresellCoursesReq.json();
    let randomCourses = [...presellCourses].sort((a, b) => 0.5 - Math.random())
    generateCourses("col",presellCouresWrapper, randomCourses, null, 'swiper-slide')
}


const renderCourseComments = (wrapper, comments, userRole) =>{
    if (comments.length) {
        comments.forEach(comment => wrapper.insertAdjacentHTML('beforeend', generateCommentTemplate(comment, userRole)))
        return true
    }
    
    wrapper.insertAdjacentHTML('beforeend', `
    <div class="alert alert-danger" style="margin-top : 3rem;">
    هنوز نظری برای این دوره ثبت نشده
    <br>
    اولین نفر شما باشید.
    </div>
    `)
}

const renderCommentSubmit = () => {
    let addCommentWrapper = document.querySelector('#add-parent')
    let submitBtn = document.querySelector('.send-btn')
    let scoreInput = document.querySelector('#course-score-input');
    let commentInput = document.querySelector('#comment-input');

    submitBtn.addEventListener('click',async e => {
        e.preventDefault();
        
        let isSended = submitBtn.dataset.id == 'new' ? await submitComment(commentInput.value, scoreInput.value) : await answerComment(commentInput.value, submitBtn.dataset.id)
        console.log(isSended);
        if (isSended.ok) {
            if (isSended.url.includes('answer')) {
                window.location.reload();
            }else{
                showToastSwal('موفق', 'کامنت شما با موفقیت ثبت شد. \nپس از تایید مدیر نشان داده خواهد شد', 'success');
                commentInput.value = '';
                hideElement(addCommentWrapper)
            }
        }else{
            showToastSwal('ناموفق', isSended, 'error')
        }
        
    })

}

const renderCourseInfos = async () => {
    let mainContainer = document.querySelector('#main-container')
    let courseInfos = await getCourseInfos();
    let userInfo = await getMe();
    userInfo = userInfo.userInfo
    console.log(courseInfos);
    if(!courseInfos.name){
        mainContainer.innerHTML = `
        <div class="alert alert-danger">${courseInfos.message[0].message}:)
        <h1>لطفا از طریق لینک های معتبر دوره وارد صفحه شوید</h1>
        </div>
        `;
        return false
    }

///////////////   Variables    /////////////
    let courseCategoryLink = document.querySelector('#course-category-link');
    let courseNameElem = document.querySelector('#course-name');
    let courseDesElem = document.querySelector('#course-description');
    let courseIntroductionVideElem = document.querySelector('#course-introduction-video');
    let userStatusBtn = document.querySelector('#user-status-btn');
    let courseStatusElem = document.querySelector('#course-status');
    let courseLastupdateElem = document.querySelector('#course-lastupdate');
    let courseSupportElem = document.querySelector('#course-support');
    let courseTimeElem = document.querySelector('#course-time');
    let courseStudentsElems = document.querySelectorAll('.course-students');
    let courseSessionsElem = document.querySelector('.course-sessions');
    let courseTeacherImgElems = document.querySelectorAll('.teacher-img');
    let courseTeacherNameElems = document.querySelectorAll('.teacher-name');
    let commentsWrapper = document.querySelector('#comments-wrapper');
    let userNameElem = document.querySelector('.comments__add-comment__header-name');
    let userImgElem = document.querySelector('.comments__add-comment__header-img');
    let addCommentElem = document.querySelector('.comments__add-comment');
    let createCommentBtn = document.querySelector('.comments__create-btn');
    let commentInput = document.querySelector('.comments__add-comment__input');
    let cancelBtn = document.querySelector('.cancle-btn');
    let sendBtn = document.querySelector('.send-btn')
    let commentContactElem = document.querySelector('.comments__add-comment__header-subtitle');
    let courseScoreInputWrapper = document.querySelector('#course-score-wrapper');
    let courseScoreInput = document.querySelector('#course-score-input');
///////////////   Codes    /////////////
    document.title = courseInfos?.name;

   courseCategoryLink.innerHTML = courseInfos?.categoryID.title;
   courseCategoryLink.href = `category.html?cat=${courseInfos?.categoryID.name}`;

   courseNameElem.innerHTML = courseInfos?.name;
   courseDesElem.innerHTML = courseInfos?.description;

   courseIntroductionVideElem.poster = `${coversMainUrl}/courses/covers/${courseInfos.cover}`
    
   userStatusBtn.dataset.status = courseInfos?.isUserRegisteredToThisCourse || false;
   if (courseInfos?.isUserRegisteredToThisCourse) {
    userStatusBtn.innerHTML = 'دانشجوی این دوره هستید'
   }else{
    userStatusBtn.innerHTML = 'ثبت نام در دوره';
    userStatusBtn.addEventListener('click', async () => {
      let courseEndPrice = (courseInfos.price - courseInfos.price * courseInfos?.discount / 100)
       if (courseInfos.price > 0 || courseEndPrice > 0){
            let userWalletValue  = + getFromLocal('userWallet');
            if(courseInfos.discount){
                if (userWalletValue - courseEndPrice < 0) {
                    showToastSwal('موجودی نا کافی', 'کیف پول خود را شارژ نمایید', 'error')
                }else{
                    registerToCourse(courseInfos._id, courseEndPrice)
                    localStorage.userWallet = userWalletValue - courseEndPrice
                    showSwal('ثبت نام با موفقیت انجام شد', 'به دیدن ویدئو های دوره میپردازید ؟', 'question', (res) => {
                        if (res.isConfirmed) {
                            location.reload()
                        }
                    })
                }
            }else{
                showSwal('کد تخفیف دارید؟', '', 'question', async (result) => {
                    if (result.isConfirmed) {
                        showInputSwal('کد تخفیف را وارد نمایید', 'کد تخفیف...', 'اعمال کد', async (result) => {
                            if (result.value) {
                                let codeValidation = await fetch(`${mainUrl}/offs/${result.value}`,{
                                    method: 'POST',
                                    headers : {
                                        Authorization : `Bearer ${getToken()}`,
                                        "Content-Type": "application/json"
                                    },
                                    body : JSON.stringify({course : courseInfos._id})
                                })
    
                                let codeValidationRes = await codeValidation.json();
    
                                if (codeValidation.ok) {
                                    let endPrice = (courseInfos.price - (courseInfos.price * codeValidationRes.percent / 100));
    
                                    if (userWalletValue - endPrice < 0) {
                                        showToastSwal('ناموفق', 'موجودی شما کافی نیست', 'error')
                                    }else{
                                        localStorage.userWallet = userWalletValue - endPrice;
                                        registerToCourse(courseInfos._id, endPrice)
                                    }
                                }else{
                                    showToastSwal('ناموفق', 'کد نامعتبر است', 'error')
                                }
                            }
                        })
    
    
    
                    }else{
                        
                        if((userWalletValue - courseInfos.price) < 0){
                            showToastSwal('ناموفق', 'موجودی شما کافی نیست', 'error')
                        }else{
                            localStorage.userWallet = userWalletValue - courseInfos.price
                            registerToCourse(courseInfos._id, courseInfos.price)
                        }
                    }
                })
            }
            
        }else{
            console.log('0');
            registerToCourse(courseInfos._id, courseInfos.price)
        }
    }) 
   }

   courseStatusElem.innerHTML = courseInfos?.isComplete ? 'به اتمام رسیده' : 'درحال برگذاری'

   courseLastupdateElem.innerHTML = courseInfos?.updatedAt.slice(0, 10).replaceAll('-', '/')

   courseSupportElem.innerHTML = courseInfos?.support;

   
   courseTimeElem.innerHTML = calculateCourseTime([courseInfos?.sessions]);

   courseTeacherImgElems.forEach(el => el.src = `${coversMainUrl}/courses/covers/${courseInfos.creator?.profile}`)
   courseTeacherNameElems.forEach(el => el.innerHTML = courseInfos?.creator?.name)
   
   courseStudentsElems.forEach(elem => elem.innerHTML = courseInfos.courseStudentsCount);

   if (courseInfos.sessions.length) {
    courseInfos.sessions.forEach((session, index) => {
        courseSessionsElem.insertAdjacentHTML('beforeend', generateCourseSessionTemplate(
         {title : session.title, parts : [session]},
         courseInfos?.isUserRegisteredToThisCourse,
         index,
        ))
    })
   }else{
    courseSessionsElem.insertAdjacentHTML('beforeend', generateCourseSessionTemplate(
        'none',
        null,
        null
    ))
   }

   userNameElem.innerHTML = userInfo?.name || 'کاربر';
   userImgElem.src = !!userInfo?.profile != false ? `${coversMainUrl}/courses/covers${getFromLocal('userInfo')?.userInfo?.profile}` : './images/teachers/none.jfif';


   
   hideElement(addCommentElem)
   
   createCommentBtn.addEventListener('click', () => {
       if (courseInfos.isUserRegisteredToThisCourse) courseScoreInputWrapper.style.visibility = 'visible';
       showElement(addCommentElem);
       commentContactElem.innerHTML = 'ثبت نظر جدید'
       sendBtn.dataset.id = 'new'
       commentInput.focus();
    })
    
    cancelBtn.addEventListener('click', () => {
        hideElement(addCommentElem);
        commentInput.value = '';
    })

    renderCourseComments(commentsWrapper, courseInfos?.comments, userInfo?.role);
    
    let replayBtns = document.querySelectorAll('.comments__comment__answer-btn')
    replayBtns.forEach((btn) => {
        btn.addEventListener('click', e => {
            courseScoreInputWrapper.style.visibility = 'hidden'
            commentContactElem.innerHTML = `در جواب به ${btn.dataset.name}...`
            showElement(addCommentElem);
            sendBtn.dataset.id = btn.dataset.id
            scrollTo(0, addCommentElem.offsetTop - 200)
        })
    })
    

}


const renderPartInfos = async () =>{
    let partInfos = await getPartInfos();
    let courseInfos = await getCourseInfos();
    console.log('partInfos : ', partInfos);
    console.log('courseInfos : ', courseInfos);
    
    let isUserRegistered = courseInfos.isUserRegisteredToThisCourse;
    
    if (partInfos.message ) {
        document.querySelector('#main-container').innerHTML = `
        <div class="alert alert-danger"> برای مشاهده جلسات ابتدا  باید وارد حسابی شوید.</div>
        `
        return false
    }else if(!(isUserRegistered || partInfos.session.free)){
        document.querySelector('#main-container').innerHTML = `
        <div class="alert alert-danger"> برای مشاهده این جلسه  در دوره ثبت نام کنید.</div>
        `

        return false
    } 
    //=======    Variables   =======\\
    let courseNameElem = document.querySelector('.part-info__course-name');
    let partVideoElem = document.querySelector('.part-info__video');
    let partTitleElem = document.querySelector('.part-inof__details__part-name');
    let partCountElem = document.querySelector('.part-info__details__part-count');
    let courseStatusElems = document.querySelectorAll('.part__course-status');
    let courseTimeElems = document.querySelectorAll('.part__course-time');
    let coursePartsElems = document.querySelectorAll('.part__course-parts');
    let courseTeacherImgElems = document.querySelectorAll('.teacher-img');
    let courseTeacherNameElems = document.querySelectorAll('.teacher-name');
    let courseSessionsElems = document.querySelectorAll('.course-sessions');
    let userNameElem = document.querySelector('#user-name');
    let userImgElem = document.querySelector('#user-img');
    let userInfo = getFromLocal('userInfo')?.userInfo;


    //=======    Codes   =======\\
    document.title = partInfos.session.title
    courseNameElem.innerHTML = courseInfos.name

    partVideoElem.src = `${coversMainUrl}/courses/covers/${partInfos.session.video}`;
    partVideoElem.poster = `${coversMainUrl}/courses/covers/${courseInfos.cover}`
    partTitleElem.innerHTML = partInfos.session.title;
    partCountElem.innerHTML = getUrlParam('partCount');
    courseStatusElems.forEach(el => el.innerHTML = courseInfos.isComplete ? 'به اتمام رسیده' : 'درحال برگذاری');
    courseTimeElems.forEach(el => el.innerHTML = calculateCourseTime([partInfos.sessions]));
    coursePartsElems.forEach(el => el.innerHTML = calculateCourseParts([partInfos.sessions]));

    courseTeacherImgElems.forEach(el => el.src = `${coversMainUrl}/courses/covers/${courseInfos.creator.profile}`)
    courseTeacherNameElems.forEach(el => el.innerHTML = courseInfos.creator.name);

    courseSessionsElems.forEach(el => {
        partInfos.sessions.forEach((session, index) => {
            el.insertAdjacentHTML('beforeend', generateCourseSessionTemplate(
                {title : session.title, parts : [session]},
                isUserRegistered,
                index
               ))
        })
    })


    userNameElem.innerHTML = userInfo.name;
    userImgElem.src = userInfo.profile ?  `${coversMainUrl}/courses/covers/${userInfo?.profile}` : `./images/teachers/none.jfif`
    

}

const renderRelatedCoursesAndShortLink = async () => {
    let relatedCoursesWrapper = document.querySelector('.aside-products__list');
    let shortLinkElem = document.querySelector('.course-details__short-link__url-text')

    //=== rendering reatedCourses ====\\
    let courseName = getUrlParam('name');
    let getRelatedCoursesReq = await fetch(`${mainUrl}/courses/related/${courseName}`);
    let relatedCourses = await getRelatedCoursesReq.json();
    
    relatedCourses.forEach(course => {
        relatedCoursesWrapper.insertAdjacentHTML('beforeend', generateAsideItemTemplate(course))
    })

    //rendering short Link;
    setShortLink(shortLinkElem)

    //set copy rule when click
    shortLinkElem.addEventListener('click', async  (e) => {
        await setCopyWhenClick(e.target)
    })

}

const renderNewContactUsMsg = async () => {
    let inputs = document.querySelectorAll('.msg-input')
    let nameInputElem = document.querySelector('#name');
    let emailInputElem = document.querySelector('#email');
    let phoneInputElem = document.querySelector('#phone');
    let bodyInputElem = document.querySelector('#body');

    let newMsgInfos = {
        name : nameInputElem.value.trim(),
        email : emailInputElem.value.trim(),
        phone : phoneInputElem.value.trim(),
        body : bodyInputElem.value.trim(),        
    }

    let sendMsgReq = await fetch(`${mainUrl}/contact`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(newMsgInfos)
    })

    let sendMsgRes = await sendMsgReq.json();
    
    if (sendMsgReq.ok == true) {
        showToastSwal('نظر شما با موفقیت ثبت گردید', 'به زودی جواب شما به ایمیل یا تلفنتان پیامک خواهد شد', 'success')
        inputs.forEach(input => input.value = '')
    }

    showToastSwal('خطا', sendMsgRes.message[0].message, 'warning');
}


const joinInNewsLetter = async (e) =>{
    e.preventDefault();
    let members = await getNewsLetterMembers();
    
    let joinerEmailInput = document.querySelector('.footer__add-news-letter__input');
    let isInMembers = members.length && members?.find(member => member.email == joinerEmailInput.value.trim())
    if (isInMembers) {
        showToastSwal('شما قبلا عضو شده اید', 'نیازی به عضویت مجدد نیست', 'warning')

        return false
    }


    let joinerInfo = {
        email : joinerEmailInput.value.trim()
    }

    let joinReq = await fetch(`${mainUrl}/newsletters`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(joinerInfo)
    })
    let joinRes = await joinReq.json();
    
    if (joinReq.ok) {
        showToastSwal('عضویت شما با موفقیت انجام شد', 'خبر رویداد ها و تخفیف های  آسان کد به ایمیل شما ارسال خواهد شد.', 'success');
        joinerEmailInput.value = ''
        return true
    }

    showToastSwal('مشکلی در عضویت پیشآمده.', joinRes.message[0].message, 'error')
}

const renderLandingSearchBtnLagic = () => {
    let landingSearchBtn = document.querySelector('#landing-search-btn');
    let landingSearchInput = document.querySelector('#landing-search-input');

    landingSearchBtn.addEventListener('click', e =>{
        e.preventDefault();
        if (landingSearchInput.value.trim() == '')  return false

        location.href = `search.html?value=${landingSearchInput.value.trim()}`
    })

    landingSearchInput.addEventListener('keypress', e => {
        if (e.keyCode == '13') location.href = `search.html?value=${landingSearchInput.value.trim()}`
    })
}

const renderNavSearchBtnLagic = () => {
    let searchBtn = document.querySelector('#navbar-search-btn');

    searchBtn.addEventListener('click', e => {
        e.preventDefault();

        showInputSwal('عبارت مورد نظر را وارد کنید', 'جستجو کنید...', 'جستجو',
        (res) => {
            if (!res.isConfirmed || res.value.trim() == '') return false;

            location.href = `search.html?value=${res.value.trim()}`
        } 
        )
    })
}

const renderMobileSearchBtnLagic = () => {
    let mobileSearchBtn = document.querySelector('#mobile-search-btn');
    let mobileSearchInput = document.querySelector('#mobile-search-input');

    mobileSearchBtn.addEventListener('click', e => {
        e.preventDefault();
        if (mobileSearchInput.value.trim() == '') return false;

        location.href = `search.html?value=${mobileSearchInput.value.trim()}`
    })

    mobileSearchInput.addEventListener('keypress', e => {
        if (e.keyCode == '13') location.href = `search.html?value=${mobileSearchInput.value.trim()}`
    })
}

const renderGlobalSearch = async () => {
    let coursesWrapper = document.querySelector('#courses-wrapper');
    let articlesWrapper = document.querySelector('#articles-wrapper');
    let searchedData = await getSearchedData();

    generateCourses('col', coursesWrapper, searchedData.allResultCourses, true, null);
    generateArticles(articlesWrapper, searchedData.allResultArticles, true);

    if (!searchedData.allResultCourses.length) coursesWrapper.insertAdjacentHTML('beforeend', `
        <div class="alert alert-danger">هیچ دوره ای برای جستجوی عبارت <span class="underline">${getUrlParam('value')}</span> یافت نشد</div>
    `)

    if (!searchedData.allResultArticles.length) articlesWrapper.insertAdjacentHTML('beforeend', `
        <div class="alert alert-danger">هیچ مقاله ای برای جستجوی عبارت <span class="underline">${getUrlParam('value')}</span> یافت نشد</div>
    `)
}


const renderArticleInfos = async () => {
    let article = await getArticle();
    console.log(article);
    //=== Variabels ====\\
    let articleTitle = document.querySelector('.article__title')
    let articleCategoryEl = document.querySelector('#article-category')
    let artilceWriterEl = document.querySelector('#article-writer')
    let articleDate = document.querySelector('#article-date')
    let articleCoverEl = document.querySelector('.artilce__banner')
    let articleParaghraphEl = document.querySelector('.article__paraghraph')

    //=== Codes ====\\
    articleTitle.innerHTML = article.title

    articleCategoryEl.innerHTML = article.categoryID.title
    articleCategoryEl.href = `category.html?cat=${article.categoryID.name}`

    artilceWriterEl.innerHTML = article.creator.name
    articleDate.innerHTML = article.createdAt.slice(0, 10).replaceAll('-', '/')
    articleCoverEl.src = `${coversMainUrl}/courses/covers/${article.cover}`

    articleParaghraphEl.innerHTML = article.body
}

export
{
    checkLogin,
    renderBreadcrumbItems,
    renderTopbarItems,
    renderLatesCourses,
    renderLatesArticles,
    renderMenuItems,
    renderPopularCourses,
    renderPresellCourses,
    getCoursesByCategory,
    renderCourseInfos,
    renderRelatedCoursesAndShortLink,
    renderPartInfos,
    renderNewContactUsMsg,
    joinInNewsLetter,
    renderLandingSearchBtnLagic,
    renderNavSearchBtnLagic,
    renderMobileSearchBtnLagic,
    renderGlobalSearch,
    renderCommentSubmit,
    renderArticleInfos,
}

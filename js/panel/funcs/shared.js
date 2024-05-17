const coversMainUrl = "https://asancode-backend.liara.run";
const mainUrl = "https://asancode-backend.liara.run/v1";
import { showLoader, hideLoader } from "../../funcs/handlers/loadin-handler.js";

import { getFromLocal, showToastSwal, showSwal, getMenuItems } from "../../funcs/utils.js";
import { getMe } from "../../funcs/auth.js";

import {
  renderNotificationsWhatching,
  generateNotifications,
  getCourses,
  generateCourseTdTemplate,
  editCourse,
  deleteCourse,
  getCategories,
  readyCourseCategory,
  createCourseData,
  sendCourseData,
  getAllMenuItems,
  generatePanelMenuItemTemplate,
  createNewMenuItemData,
  sendNewMenuItemData,
  removeMenuItem,
  getAllUsers,
  generatePanelUserTemplate,
  removeUser,
  editeUserRole,
  banUser,
  createUserData,
  sendUserData,
  generatePanelCategoryTemplate,
  removeCategory,
  createNewCategoryData,
  sendNewCategoryData,
  showModal,
  hideModal,
  editeCategory,
  getContacts,
  generateContactTdTemplate,
  showMsgBody,
  answerContact,
  removeContact,
  getSessions,
  generateSessionsTdTemplate,
  removeSession,
  createSessionData,
  sendSessionData,
  getArticles,
  generateArticleTdTemplate,
  removeArticle,
  getComments,
  generateCommentTdTemplate,
  showComment,
  answerComment,
  acceptComment,
  rejectcComment,
  removeComment,  
  getDiscountCodes,
  generateDiscountCodeTdTemplate,
  removeDiscountCode,
  createDiscountCodeData,
  sendDiscountCodeDataReq,
  sendSetCampaignReq,
  getPanelInfo,
  generateLatesUserTdTemplate,
  createAdminInfo,
  sendAdminInfo,
  getAllTickets,
  generatePanelTicketTdTemplate,
  showTicket,
  answerTicket
} from "./utils.js";

const renderAdminInfo = async () => {
  await getMe();
  let adminInfo = getFromLocal("userInfo")?.userInfo;
  console.log('Admin Info : ', adminInfo);

  //-----////// Variables \\\\\
  let adminNameElem = document.querySelector("#admin-name");
  let adminImg = document.querySelector("#admin-img");
  let notificationListElem = document.querySelector("#notification-modal-list");

  //-----////// Codes \\\\\
  if (!(adminInfo?.role == "ADMIN")) {
    location.replace("../../login.html");
    return "dont-access";
  }

  adminNameElem.innerHTML = adminInfo.name;

  adminImg.src = `${coversMainUrl}/courses/covers${adminInfo?.profile}`;

  generateNotifications(adminInfo.notifications, notificationListElem);
  renderNotificationsWhatching();
};

const renderCoursesInPanel = async () => {
  let coursesWrapper = document.querySelector("#courses-wrapper");
  coursesWrapper.innerHTML = '';
  let courses = await getCourses();
  console.log(courses);

  courses.forEach((course, index) => {
    coursesWrapper.insertAdjacentHTML(
      "beforeend",
      generateCourseTdTemplate(index, course)
    );
  });

  window.editCourse = editCourse;
  window.deleteCourse = deleteCourse;
  // window.showSwal = showSwal
  // window.showToastSwal = showToastSwal
};

const loadCategories = async () => {
  let categoryListElem = document.querySelector(".category-list");
  let categorys = await getCategories();

  categorys.forEach((category) => {
    categoryListElem.insertAdjacentHTML(
      "beforeend",
      `
            <option class="category-item" value="${category._id}">
                ${category.title}
            </option>
        `
    );
  });
};

const uploadCourse = async (event) => {
    event.preventDefault();
    let courseData = createCourseData();
    
    let sendReq = await sendCourseData(courseData);
    if (sendReq.ok) {
        showToastSwal('دوره با موفقیت ساخته شد', 'از این پس در کل وبسایت این دوره در دسترس است \n با آرزوی موفقیت در اجرای دوره', 'success');
        renderCoursesInPanel();
    }else{
      let res = await sendReq.json()
      console.log(res);
    }
}



const renderMenuItemsInPanel = async () => {
  let menuItemsWrapper = document.querySelector('#menu-items-wrapper');
  menuItemsWrapper.innerHTML = ''
  let allMenuItems = await getAllMenuItems();
  
  allMenuItems.forEach((menuItem, index) => {
    menuItemsWrapper.insertAdjacentHTML('beforeend', generatePanelMenuItemTemplate(menuItem, index))
  })

  window.removeMenuItem = removeMenuItem
}

const loadMenuParentItems = async () => {
  let menuParentItemsWrapper = document.querySelector('#menu-parents-item-wrapper');
  menuParentItemsWrapper.innerHTML = '';
  menuParentItemsWrapper.insertAdjacentHTML('beforeend', `
  <option value='-1'> دسته بندی مورد نظر  را انتخاب کنید</option>
  `)
  let menuParentItems = await getMenuItems();

  menuParentItems.forEach((parentItem => {
    menuParentItemsWrapper.insertAdjacentHTML('beforeend', `
      <option value='${parentItem._id}'>
        ${parentItem.title}
      </option>
    `)
  }))
}

const uploadNewMenuItem = async () => {
  event.preventDefault();
  let itemData = createNewMenuItemData();
  let sendReq = await sendNewMenuItemData(itemData);
  
  if (sendReq.ok) {
    renderMenuItemsInPanel()
    loadMenuParentItems();
    showToastSwal('آیتم مورد نظر به منو اضافه شده', 'از این پس این آیتم در سراسر منوهای سایت در دسترس است', 'success')
  }
}


const renderUsers = async () => {
  let users = await getAllUsers ();
  let usersWrapper  = document.querySelector('#users-wrapper');
  usersWrapper.innerHTML = '';
  console.log(users);
  users.forEach((user, index) => {
    usersWrapper.insertAdjacentHTML('beforeend', generatePanelUserTemplate(user, index))
  })
  window.removeUser= removeUser
  window.banUser = banUser
  window.editeUserRole = editeUserRole
}

const renderUserRegistration = async () => {
  let registerBtn = document.querySelector('#user-register-btn');

  registerBtn.addEventListener('click', async () => {
    let userData =  createUserData();

    let sendDataReq = await sendUserData(userData)
    let sendRes = await sendDataReq.json()

    if (sendDataReq.ok) {
      showToastSwal('موفق', 'ثبت کاربر با موفقیت انجام شد', 'success')
      renderUsers()
    }else{
      showToastSwal('مشکلی پیش آمده', sendRes?.message[0]?.message || sendRes.message, 'error')
    }
  })

  
}



const renderCategories = async () => {
  let categoriesWrapper = document.querySelector('#categories-wrapper');
  categoriesWrapper.innerHTML = ''
  let categories = await getCategories();

  console.log(categories);
  categories.forEach((category, index) => {
    categoriesWrapper.insertAdjacentHTML('beforeend', generatePanelCategoryTemplate(category, index))
  });

  window.removeCategory = removeCategory
  window.showModal = showModal
  window.hideModal = hideModal
  window.editeCategory = editeCategory
}

const uploadNewCategory = async () => {
  let newCategoryData = createNewCategoryData()
  
  let sendReq = await sendNewCategoryData(newCategoryData);
  if (sendReq.ok) {
    showToastSwal('موفق', 'دسته بندی جدید با موفقیت افزوده شد', 'success')
    renderCategories()
  }
}



const renderContacts = async () => {
  let contactsWrapper = document.querySelector('#contacts-wrapper')
  contactsWrapper.innerHTML = ''
  let contacts = await getContacts()
  console.log(contacts);
  
  contacts.forEach((contact, index) => {
    contactsWrapper.insertAdjacentHTML('beforeend', generateContactTdTemplate(contact, index))
  })
  window.showMsgBody = showMsgBody
  window.answerContact = answerContact
  window.removeContact = removeContact  
}


const renderSessions = async () => {
  let sessionsWrapper = document.querySelector('#sessions-wrapper');
  sessionsWrapper.innerHTML = ''
  let sessions = await getSessions();
  console.log('sessions :',sessions);

  sessions.forEach((session, index) => {
    sessionsWrapper.insertAdjacentHTML('beforeend', generateSessionsTdTemplate(session, index))
  })

  window.removeSession = removeSession
}

const loadCourses = async () => {
  let sessionCoursesWrapper = document.querySelector('#courses-list');
  sessionCoursesWrapper.innerHTML = ''
  sessionCoursesWrapper.insertAdjacentHTML('beforeend', `
    <option value="-1">
      لطفا دوره مورد نظر را انتخاب کنید
    </option>
  `)
  let courses = await getCourses();

  courses.forEach(course => {
    sessionCoursesWrapper.insertAdjacentHTML('beforeend', `
      <option value="${course._id}">${course.name} </option>
    `)
  })
  
  console.log('Courses :',courses);
}

const uploadSession = async () => {
  let sessionCourseID = document.querySelector('#courses-list').dataset.id;
  let sessionData = createSessionData();
  
  let sendReq = await  sendSessionData(sessionData, sessionCourseID);

  if (sendReq.ok) {
    showToastSwal('موفق', 'جلسه مورد نظر برای دوره با موفقیت افزوده شد', 'success')
    renderSessions();
  }else{
    localStorage.setItem('sendSissionMsg', JSON.stringify(sendReq))
    showToastSwal('ناموفق', sendReq?.message[0]?.message || sendReq?.message, 'error')
  }
}




const renderArticles = async () => {
  let articlesWrapper = document.querySelector('#articles-wrapper');
  articlesWrapper.innerHTML = ''
  let articles = await getArticles();
  console.log('Articles :', articles);

  articles.forEach((article, index) => {
    articlesWrapper.insertAdjacentHTML('beforeend', generateArticleTdTemplate(article, index))
  })

  window.removeArticle = removeArticle
}


const renderComments = async () => {
  let commentsWrapper = document.querySelector('#comments-wrapper')
  commentsWrapper.innerHTML = ''
  let comments = await getComments()
  console.log('Comments :', comments);

  comments.forEach((comment, index) => {
    commentsWrapper.insertAdjacentHTML('beforeend', generateCommentTdTemplate(comment, index))
  })

  window.showComment = showComment
  window.answerComment = answerComment
  window.acceptComment = acceptComment
  window.rejectcComment = rejectcComment
  window.removeComment = removeComment  
  console.log(window.removeComment);
}


const renderDiscountCodes = async () => {
  let discountCodesWrapper =  document.querySelector('#discountCodes-wrapper');
  discountCodesWrapper.innerHTML = ''
  let discountCodes = await getDiscountCodes();
  console.log('Discount Codes :',discountCodes);

  discountCodes.forEach((code, index) => {
    discountCodesWrapper.insertAdjacentHTML('beforeend', generateDiscountCodeTdTemplate(code, index))
  })

  window.removeDiscountCode = removeDiscountCode
}

const registerDiscountCode = async () => {
  let discountCodeData = createDiscountCodeData()
  let sendReq = await sendDiscountCodeDataReq(discountCodeData)

  if(sendReq.ok){
    showToastSwal('موفق', 'کد تخفیف با موفقیت ساخته شد', 'success')
    renderDiscountCodes()
  }else{
    showToastSwal('ناموفق', sendReq, 'error')
  }


}


const setCampaign = async () => {
  let campaignPercentInput = document.querySelector('#campaign-percent-input')
  let campaignData = {
    discount : campaignPercentInput.value.trim()
  }
  let setCampaignReq = await sendSetCampaignReq(campaignData)

  if (setCampaignReq.ok) {
    showToastSwal('موفق', 'کمپین با موفقیت برگذار شد', 'success')
  }else{
    showToastSwal('ناموفق', 'در برگداری کمپین مشکلی بهه وجود آمده است', 'error')
  }
}

const renderLatesUsers = async () => {
  let latesUsersWrapper = document.querySelector('#lates-users-wrapper')
  latesUsersWrapper.innerHTML = ''
  let panelInfo = await getPanelInfo();
  let lastUsers =  panelInfo.lastUsers
  console.log('panelInfo :', panelInfo);
  lastUsers.forEach((user, index) => {
    latesUsersWrapper.insertAdjacentHTML('beforeend', generateLatesUserTdTemplate(user, index))
  })
}

const renderPanelInfo = async () => {
  let panelCountElems = document.querySelectorAll('.panel-count')
  let panelInfo = await getPanelInfo();
  let panelCounts = panelInfo.infos;

  for (let i = 0; i < panelCounts.length; i++) {
    panelCountElems[i].innerHTML = panelCounts[i].count
    
  }
}

const loadAadminAllInfo = async () => {
  let adminInfo = await getMe()
  adminInfo = adminInfo.userInfo

  let nameInput = document.querySelector('#name')
  let usernameInput = document.querySelector('#username')
  let emailInput = document.querySelector('#email')
  let phoneInput = document.querySelector('#phone')

  nameInput.value = adminInfo.name;
  usernameInput.value = adminInfo.username
  emailInput.value = adminInfo.email
  phoneInput.value = adminInfo.phone
}


const updateAdminInfo = async (href = '../main') => {
  let adminInfo =  createAdminInfo()

  let sendReq = await sendAdminInfo(adminInfo);
  if (sendReq.ok) {
    location.href = href
  }else{
    showToastSwal('ناموفق', sendReq, 'error')
  }
}



const renderPanelTickets = async () => {
  let ticketsWrapper = document.querySelector('#tickets-wrapper')
  ticketsWrapper.innerHTML = ''
  let tickets = await getAllTickets()
  console.log('Tickets :', tickets);
  tickets.forEach((ticket, index) => {
    ticketsWrapper.insertAdjacentHTML('beforeend', generatePanelTicketTdTemplate(ticket, index))
  })

  window.showTicket = showTicket
  window.answerTicket = answerTicket
}

export {
  renderAdminInfo,
  renderCoursesInPanel,
  loadCategories,
  uploadCourse,
  renderMenuItemsInPanel,
  loadMenuParentItems,
  uploadNewMenuItem,
  renderUsers,
  renderUserRegistration,
  renderCategories,
  uploadNewCategory,
  renderContacts,
  renderSessions,
  loadCourses,
  uploadSession,
  renderArticles,
  renderComments,
  renderDiscountCodes,
  registerDiscountCode,
  setCampaign,
  renderLatesUsers,
  renderPanelInfo,
  loadAadminAllInfo,
  updateAdminInfo,
  renderPanelTickets
};

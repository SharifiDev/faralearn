import {
  getToken,
  showSwal,
  showToastSwal,
  showInputSwal,
  hideElement,
  showElement,
} from "../../funcs/utils.js";
import {
  renderCategories,
  renderUsers,
  renderContacts,
  renderSessions,
  renderArticles,
  renderComments,
  renderDiscountCodes,
  renderPanelTickets,
} from "./shared.js";
const coversMainUrl = "https://sabzlearn2.liara.run";
const mainUrl = "https://sabzlearn2.liara.run/v1";

function removeNotif(notifId) {
  document.getElementById(notifId).remove();
}

const renderNotificationsWhatching = () => {
  let notificationIcon = document.querySelector("#notification-icon");
  let notificationBox = document.querySelector("#notification-modal");
  notificationIcon.addEventListener("mouseenter", () => {
    notificationBox.classList.add("active-modal-notfication");
  });

  notificationBox.addEventListener("mouseleave", () => {
    notificationBox.classList.remove("active-modal-notfication");
  });
};

const seenNotification = async (notifId) => {
  let seenReq = await fetch(`${mainUrl}/notifications/see/${notifId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  seenReq.ok == true && removeNotif(notifId);
};

const generateNotifications = (notifs, wrapper) => {
  if (notifs.length) {
    wrapper.innerHTML = "";
    notifs.forEach((notif) => {
      wrapper.insertAdjacentHTML(
        "beforeend",
        `
                <li class="home-notification-modal-item" id="${notif._id}">
                    <span class="home-notification-modal-text">${notif.msg}</span>
                    <a class="notif-seen-btn" onclick="seenNotification('${notif._id}')">دیدم</a>
                </li>
            `
      );
    });
  } else {
    wrapper.insertAdjacentHTML(
      "beforeend",
      `
        <li class="alert alert-danger">
            اعلانی وجود ندارد
        </li>
        `
    );
  }

  window.seenNotification = seenNotification;
};

const getCourses = async () => {
  let getReq = await fetch(`${mainUrl}/courses`);
  let getRes = await getReq.json();
  return getRes;
};

const editCourse = (courseId) => {
  console.log(courseId);
};

const deleteCourse = async (courseId) => {
  showSwal(
    "آیا از حذف دوره مطمئنید ؟",
    "پس از حذف دوره کاملا از سایت پاک شده و کسی  دسترسی به آن را نخواهد داشت",
    "warning",
    async (result) => {
      if (result.isConfirmed) {
        let deleteReq = await fetch(`${mainUrl}/courses/${courseId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        console.log(deleteReq);
        if (deleteReq.ok) {
          showToastSwal(
            "دوره با موفقیت حذف شد",
            "این دوره دگر در دسترس نیست",
            "success"
          );
          document.getElementById(courseId).remove();
        }
      }
    }
  );
};

const generateCourseTdTemplate = (index, course) => {
  return `
        <tr id="${course._id}">
            <td class="course-num">${index + 1}</td>
            <td class="course-name">
                <a href="../../course.html?name=${course.shortName}">${
    course.name
  }</a>
            </td>
            <td class="course-price">${
              course.price ? course.price.toLocaleString() : "رایگان"
            }</td>
            <td class="course-registers">${
              course.registers || "بدون شرکت کننده"
            }</td>
            <td class="course-support">${course.support}</td>
            <td class="course-category">${course?.categoryID?.title}</td>
            <td class="course-status">${
              course.isComplete ? "به اتمام رسیده" : "درحال برگزاری"
            }</td>
            <td class="course-score">${course.courseAverageScore}</td>
            <td>
                <button type="button" class="btn btn-primary" class="edit-btn" onclick="editCourse('${
                  course._id
                }')">ویرایش</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" class="delete-btn" onclick="deleteCourse('${
                  course._id
                }')">حذف</button>
            </td>
        </tr>
    `;
};

const getCategories = async () => {
  let getReq = await fetch(`${mainUrl}/category`);
  let getRes = await getReq.json();

  return getRes;
};

const readyCourseCategory = () => {
  let categoryListElem = document.querySelector(".category-list");
  categoryListElem.addEventListener("change", (e) => {
    categoryListElem.dataset.category = e.target.value;
  });
};

const readyMenuParentItem = () => {
  let menuParentItemsEl = document.querySelector("#menu-parents-item-wrapper");

  menuParentItemsEl.addEventListener("change", (e) => {
    menuParentItemsEl.dataset.parent = e.target.value;
  });
};

const createCourseData = () => {
  // Elements
  let courseName = document.querySelector("#course-name-input");
  let courseDescription = document.querySelector("#course-description-input");
  let courseCover = document.querySelector("#course-cover-input");
  let courseShortName = document.querySelector("#course-shortName-input");
  let coursePrice = document.querySelector("#course-price-input");
  let courseCategoryID = document.querySelector(".category-list");
  let courseSupport = document.querySelector("#course-support-input");

  let courseStatuses = document.querySelectorAll(".course-status-input");
  let courseStatus = Array.from(courseStatuses).filter(
    (statusEl) => statusEl.checked == true
  )[0];

  console.log(courseStatus.value);
  //Asigning Values
  let courseData = new FormData();
  courseData.append("name", courseName.value.trim());
  courseData.append("description", courseDescription.value.trim());
  courseData.append("cover", courseCover.files[0]);
  courseData.append("shortName", courseShortName.value.trim());
  courseData.append("price", coursePrice.value.trim());
  courseData.append("categoryID", courseCategoryID.dataset.category);
  courseData.append("support", courseSupport.value.trim());
  courseData.append("status", courseStatus.value);

  return courseData;
};

const createNewMenuItemData = () => {
  let newMenuItemTitle = document.querySelector("#new-menu-item-title");
  let newMenuItemLink = document.querySelector("#new-menu-item-link");
  let newMenuItemParent = document.querySelector("#menu-parents-item-wrapper");

  return {
    title: newMenuItemTitle.value.trim(),
    href: newMenuItemLink.value.trim(),
    parent: newMenuItemParent.dataset.parent,
  };
};

const sendCourseData = async (courseData) => {
  let sendReq = await fetch(`${mainUrl}/courses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: courseData,
  });

  return sendReq;
};

const sendNewMenuItemData = async (itemData) => {
  let sendReq = await fetch(`${mainUrl}/menus`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });

  return sendReq;
};

const getAllMenuItems = async () => {
  let getReq = await fetch(`${mainUrl}/menus/all`);
  let getRes = await getReq.json();
  return getRes;
};

const generatePanelMenuItemTemplate = (menuItem, index) => {
  let itemLink = menuItem.parent
    ? `../../course.html?name=${menuItem.href}`
    : `../../category.html?cat=${menuItem.href}`;
  return `
        <tr id='menu__item-${menuItem._id}'>

            <td>${index + 1}</td>

            <td>${menuItem.title}</td>

            <td>
                <a href="${itemLink}">
                    ${itemLink.slice(6)}
                </a>
            </td>

            <td>
                ${
                  menuItem.parent
                    ? `<a href="../../category.html?cat=${menuItem.parent.href}">
                        ${menuItem.parent.title}
                    </a>`
                    : "-------"
                }
            </td>

            <td>
                <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
            </td>

            <td>
                <button type='button' class='btn btn-danger delete-btn' onclick="removeMenuItem('${
                  menuItem._id
                }')">حذف</button>
            </td>
        </tr>
    `;
};

const sendRemoveMenuItemReq = async (id) => {
  let removeReq = fetch(`${mainUrl}/menus/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return removeReq;
};

const removeMenuItem = (itemID) => {
  showSwal(
    "میخای از منو حذفش کنی؟",
    "بعد از حذف این آیتم، این آیتم بعلاوه زیر آیتم هایش از منو حذف خواهند شد.",
    "warning",
    async (result) => {
      if (result.isConfirmed) {
        let removeReq = await sendRemoveMenuItemReq(itemID);
        if (removeReq.ok) {
          showToastSwal("آیتم با موفقیت حذف شد", "", "success");
          document.querySelector(`#menu__item-${itemID}`).remove();
        }
      }
    }
  );
};

const getAllUsers = async () => {
  let getReq = await fetch(`${mainUrl}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  let getRes = await getReq.json();

  return getRes;
};

const generatePanelUserTemplate = (user, index) => {
  return `
        <tr id="user-${user._id}">
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${user.role == "ADMIN" ? "مدیر" : "کاربر"}</td>
            <td>
                <button type='button' class='btn btn-primary edit-btn' onclick="editeUserRole(event)">ویرایش</button>
            </td>
            <td>
                <button type='button' class='btn btn-danger delete-btn' onclick="removeUser('${
                  user._id
                }')">حذف</button>
            </td>
            <td>
                <button type='button' class='btn btn-danger delete-btn' onclick="banUser('${
                  user._id
                }')">بن</button>
            </td>
        </tr>
    `;
};

const sendEditeUserRoleReq = async (id, role) => {
  let userData = {
    id: id,
    role: role,
  };
  console.log(JSON.stringify(userData));
  let sendReq = await fetch(`${mainUrl}/users/role`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return sendReq;
};

const editeUserRole = (event) => {
  let trId = event.target.parentElement.parentElement.getAttribute("id");
  let separatorIndex = trId.indexOf("-");

  let userID = trId.slice(separatorIndex + 1);

  showInputSwal(
    "نقش مورد نظر را وارد کنید",
    "نقش باید ADMIN یا USER باشد",
    "تغیر نقش",
    async (result) => {
      let sendReq = await sendEditeUserRoleReq(userID, result.value.trim());
      let sendRes = await sendReq.json();
      if (sendReq.ok) {
        showToastSwal("موفق", "نقش کاربر با موفقیت تغیر کرد", "success");
        renderUsers();
      } else {
        showToastSwal("نا موفق", sendRes.message[0].message, "error");
      }
    }
  );
};

const sendRemoveUserReq = async (id) => {
  let sendReq = await fetch(`${mainUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return sendReq;
};

const removeUser = (userID) => {
  showSwal(
    "آیا از حذف کاربر اطمینان دارید ؟",
    "پس از حذف این کاربر، وی دگر به اکانت خود دسترسی نداشته و دوره های آن به توقیف در میآیند.",
    "warning",
    async (result) => {
     if (result.isConfirmed) {
      let sendRemoveReq = await sendRemoveUserReq(userID);

      if (sendRemoveReq.ok) {
        showToastSwal(
          "کاربر حذف شد",
          "تمامی دوره هایش به توقیف درآمدند",
          "success"
        );
        document.querySelector(`#user-${userID}`).remove();
      }
     }
    }
  );
};

const sendBanUserReq = async (id) => {
  let sendReq = await fetch(`${mainUrl}/users/ban/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  console.log(await sendReq.json());
  return sendReq;
};

const banUser = async (userID) => {
  showSwal(
    "آیا مطمئن از بن کردن هستید؟",
    "پس از بن، کاربر به هیچ وجه نمیتواند  با این شماره  در وبسیات ثبت نام کند",
    "warning",
    async (result) => {
      if (result.isConfirmed) {
        let sendReq = await sendBanUserReq(userID);

        if (sendReq.ok) {
          await sendRemoveUserReq(userID);
          document.querySelector(`#user-${userID}`).remove();
          showToastSwal(
            "کاربر بن شد",
            "او دیگر قادر به ثبت نام با این شماره نخواهد بود",
            "success"
          );
        }
      }
    }
  );
};

const createUserData = () => {
  let nameInput = document.querySelector("#name");
  let usernameInput = document.querySelector("#username");
  let emailInput = document.querySelector("#email");
  let phoneInput = document.querySelector("#phone");
  let passwordInput = document.querySelector("#password");

  return {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: passwordInput.value.trim(),
  };
};

const sendUserData = async (userData) => {
  let sendReq = await fetch(`${mainUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return sendReq;
};

const generatePanelCategoryTemplate = (category, index) => {
  return `
        <tr id="category-${category._id}">
            <td>${index + 1}</td>
            <td>${category.title}</td>
            <td><a href="../../category.html?cat=${category.name}">
                ${category.name}
            </a></td>
            <td>
                <button type='button' class='btn btn-primary edit-btn' onclick='showModal(${JSON.stringify(
                  category
                )})'>ویرایش</button>
            </td>
            <td>
                <button type='button' class='btn btn-danger delete-btn' onclick="removeCategory('${
                  category._id
                }')">حذف</button>
            </td>
        </tr>
    `;
};

const showModal = (category) => {
  let modal = document.querySelector("#modal");
  showElement(modal, "flex");

  let [clBtn, titleInput, hrefInput, editBtn] = modal.children;

  titleInput.value = category.title;
  hrefInput.value = category.name;

  editBtn.dataset.id = category._id;
};

const hideModal = () => {
  let modal = document.querySelector("#modal");
  hideElement(modal);
};

const sendEditCategoryReq = async (id, categoryData) => {
  let editReq = await fetch(`${mainUrl}/category/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  return editReq;
};

const editeCategory = async (event) => {
  let titleInput = document.querySelector("#edited-title");
  let hrefInput = document.querySelector("#edited-href");
  let categoryData = {
    title: titleInput.value.trim(),
    name: hrefInput.value.trim(),
  };
  let categoryId = event.target.dataset.id;
  let editReq = await sendEditCategoryReq(categoryId, categoryData);

  if (editReq.ok) {
    showToastSwal("موفق", "ویرایش دسته بندی با موفقیت انجام شد", "success");
    renderCategories();
    hideModal();
  }
};

const sendRemoveCategoryReq = async (id) => {
  let sendReq = await fetch(`${mainUrl}/category/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return sendReq;
};

const removeCategory = (categoryID) => {
  showSwal("از حذف دسته بندی اطمینان دارید؟", "", "warning", async (result) => {
    if (result.isConfirmed) {
      let removeReq = await sendRemoveCategoryReq(categoryID);

      if (removeReq.ok) {
        showToastSwal("موفق", "حذف دسته بندی با موفقیت انجام شد", "success");
        renderCategories();
      }
    }
  });
};

const createNewCategoryData = () => {
  let categoryTitleInput = document.querySelector("#title");
  let categoryHrefInput = document.querySelector("#href");

  return {
    title: categoryTitleInput.value.trim(),
    name: categoryHrefInput.value.trim(),
  };
};

const sendNewCategoryData = async (categoryData) => {
  let sendReq = await fetch(`${mainUrl}/category`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  return sendReq;
};

const getContacts = async () => {
  let getReq = await fetch(`${mainUrl}/contact`);
  let getRes = getReq.json();
  return getRes;
};

const generateContactTdTemplate = (contact, index) => {
  return `
    <tr class="${contact.answer ? "answered-msg" : "not-answered-msg"}">
      <td>${index + 1}</td>
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>${contact.createdAt.slice(0, 10).replaceAll("-", "/")}</td>
      <td>
        <button type='button' class='btn btn-primary seen-btn' onclick='showMsgBody(${JSON.stringify(
          contact.body
        )}, "${contact.email}")'>مشاهده</button>
      </td>
      <td>
        <button type='button' class='btn btn-primary seen-btn' onclick="answerContact('${
          contact.email
        }')">جواب</button>
      </td>
      <td>
        <button type='button' class='btn btn-danger delete-btn' onclick="removeContact('${
          contact._id
        }')">حذف</button>
      </td>
    </tr>
  `;
};

const showMsgBody = (body, email) => {
  showSwal("", body, undefined, (result) => {
    if (result.isConfirmed) {
      answerContact(email)
    }
  });
};

const sendAnswerContactReq = async (email, answer) => {
  let answerData = {
    email,
    answer,
  };
  console.log(answerData);
  let answerReq = await fetch(`${mainUrl}/contact/answer/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answerData),
  });

  return answerReq;
};

const answerContact = (contactEmail) => {
  showInputSwal(
    `جواب خود را برای ${contactEmail} بنویسید`,
    "جواب شما ....",
    "ارسال جواب",
    async (result) => {
      if (result.value) {
        let answerReq = await sendAnswerContactReq(contactEmail, result.value);

        if (answerReq.ok) {
          showToastSwal("موفق", "پاسخ شما با موفقیت ارسال شد", "success");
          renderContacts();
        }
      }
    }
  );
};

const sendRemoveContactReq = async (id) => {
  let removeReq = await fetch(`${mainUrl}/contact/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  let removeRes = await removeReq.json();

  return removeReq.ok ? removeReq : removeRes;
};

const removeContact = async (contactID) => {
  showSwal("از حذف پیغام مطئنید؟", "", "warning", async (result) => {
    if (result.isConfirmed) {
      let removeReq = await sendRemoveContactReq(contactID);
      if (removeReq.ok) {
        showToastSwal("موفق", "پیغام با موفقتی حذف شد", "success");
        renderContacts();
      } else {
        showToastSwal("ناموفق", removeReq.message, "error");
      }
    }
  });
};

const getSessions = async () => {
  let getReq = await fetch(`${mainUrl}/courses/sessions`, {
    method: "GET",
    headers: {
      Authorization: `Bearaer ${getToken()}`,
    },
  });

  let getRes = await getReq.json();

  return getReq.ok ? getRes : getReq;
};

const generateSessionsTdTemplate = (session, index) => {
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${session.title}</td>
      <td>${session.time}</td>
      <td>${session.createdAt.slice(0, 10).replaceAll("-", "/")}</td>
      <td>${session.course?.name}</td>
      <td>
        <button type='button' class='btn btn-danger delete-btn' onclick="removeSession('${
          session._id
        }')">حذف</button>
      </td>
    </tr>
  `;
};

const sendRemoveSessionReq = async (id) => {
  let removeReq = await fetch(`${mainUrl}/courses/sessions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  let removeRes = removeReq.json();

  return removeReq.ok ? removeReq : removeRes;
};

const removeSession = async (sessionID) => {
  showSwal(
    "از حذف این جلسه مطئیند؟",
    "پس از حذف کاربران دیگر به این جلسه دسترسی نداشته و از جلسات دوره حذف خواهد شد",
    "warning",
    async (result) => {
      if (result.isConfirmed) {
        const removeRes = await sendRemoveSessionReq(sessionID);

        if (removeRes?.ok) {
          showToastSwal("موفق", "جلسه با موفقیت حذف شد", "success");
          renderSessions();
        } else {
          showToastSwal(
            "ناموفق",
            removeRes?.message[0]?.message || removeRes?.message,
            "error"
          );
        }
      }
    }
  );
};

const readySessionCourse = () => {
  let coursesList = document.querySelector("#courses-list");
  coursesList.addEventListener("change", (e) => {
    coursesList.dataset.id = e.target.value;
  });
};

const readySessionStatus = () => {
  let statusesWrapper = document.querySelector("#statuses-wrapper");
  let statuses = document.querySelectorAll("#statuses-wrapper input");
  statuses.forEach((status) => {
    status.addEventListener("click", (e) => {
      statusesWrapper.dataset.status = e.target.value;
    });
  });
};

const createSessionData = () => {
  // Elements \\
  let sessionTitleInput = document.querySelector("#new-session-title");
  let sessionTimeInput = document.querySelector("#new-session-time");
  let sessionVideoInput = document.querySelector("#new-session-video");
  let sessionStatusSelector = document.querySelector("#statuses-wrapper");
  // Asigment \\
  let sessionData = new FormData();
  sessionData.append("title", sessionTitleInput.value.trim());
  sessionData.append("time", sessionTimeInput.value.trim());
  sessionData.append("video", sessionVideoInput.files[0]);
  sessionData.append("free", +sessionStatusSelector.dataset.status);

  return sessionData;
};

const sendSessionData = async (sessionData, sessionCourseID) => {
  let sendReq = await fetch(`${mainUrl}/courses/${sessionCourseID}/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: sessionData,
  });

  let sendRes = await sendReq.json();

  return sendReq.ok ? sendReq : sendRes;
};

const getArticles = async () => {
  let getReq = await fetch(`${mainUrl}/articles`);
  let getRes = await getReq.json();
  return getRes;
};

const generateArticleTdTemplate = (article, index) => {
  return `
    <tr>
      <td>${index + 1}</td>
      <td><a href="../../article.html?name=${article.shortName}">
        ${article.title}
      </a></td>
      <td>${article.publish ? "منتشر شده" : "پیشنویس"}</td>
      <td>${article.createdAt.slice(0, 10).replaceAll("-", "/")}</td>
      <td>${article.creator.name}</td>
      <td>
        <button type='button' class='btn btn-danger delete-btn' onclick="removeArticle('${
          article._id
        }')">حذف</button>
      </td>
    </tr>
  `;
};

const sendRemoveArticleReq = async (id) => {
  let removeReq = await fetch(`${mainUrl}/articles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  let removeRes = await removeReq.json();

  return removeReq.ok ? removeReq : removeRes;
};

const removeArticle = async (articleID) => {
  showSwal(
    "از حذف مقاله مطمئیند؟",
    "پس از حذف از دسترس همگان خارج شده و از وبسایت پاک میشود.",
    "warning",
    async (result) => {
      if (result.isConfirmed) {
        let sendReq = await sendRemoveArticleReq(articleID);

        if (sendReq.ok) {
          showToastSwal("موفق", "مقاله مورد نظر با موفقیت حذف شد", "success");
          renderArticles();
        } else {
          showToastSwal(
            "ناموفق",
            sendReq?.message[0]?.message || sendReq?.message,
            "error"
          );
        }
      }
    }
  );
};

const getComments = async () => {
  let getReq = await fetch(`${mainUrl}/comments`);
  let getRes = await getReq.json();

  return getRes;
};

const generateCommentTdTemplate = (comment, index) => {
  console.log(comment);
  let commentStatus = null;

  if (comment.answer == 0) {
    commentStatus = "not-accepted";
  } else {
    if (!!comment.answerContent == false) {
      commentStatus = "not-answered";
    } else {
      commentStatus = "answered";
    }
  }

  return `
    <tr class="${commentStatus}">
      <td>${index + 1}</td>
      <td>${comment.creator.name}</td>
      <td>${comment.course}</td>
      <td>${comment.createdAt.slice(0, 10).replaceAll("-", "/")}</td>
      <td>${comment.score}</td>
      <td>
        <button type='button' class='btn btn-primary seen-btn showBtn' onclick='showComment(${JSON.stringify(
          comment.body
        )}, "${comment._id}")'>مشاهده</button>
      </td>
      <td>
        <button type='button' class='btn btn-primary seen-btn answerBtn' onclick="answerComment('${
          comment._id
        }')">پاسخ</button>
      </td>
      <td>
        <button type='button' class='btn btn-primary seen-btn acceptBtn' ${
          !comment.answer ? `onclick="acceptComment('${comment._id}')"` : ""
        }>تایید</button>
      </td>
      <td>
        <button type='button' class='btn btn-danger delete-btn rejectBtn' ${
          comment.answer ? `onclick="rejectcComment('${comment._id}'` : ""
        })">رد</button>
      </td>
      <td>
        <button type='button' class='btn btn-danger delete-btn removeBtn' onclick="removeComment('${
          comment._id
        }')">حذف</button>
      </td>
    </tr>
  `;
};

const showComment = (commentBody, commentID) => {
  showSwal(commentBody, "", "", (result) => {
    if (result.isConfirmed) {
      answerComment(commentID)
    }
  });
};

const sendAnswerCommentReq = async (answerBody, id) => {
  let answerData = {
    body: answerBody,
  };

  let answerReq = await fetch(`${mainUrl}/comments/answer/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answerData),
  });

  let answerRes = await answerReq.json();

  return answerReq.ok
    ? answerReq
    : answerRes?.message[0]?.message || answerRes.message;
};

const answerComment = (commentID) => {
  showInputSwal(
    "جوابتان را بنویسید",
    "جواب شما...",
    "ارسال جواب",
    async (result) => {
      let value = result?.value?.trim();

      if (value) {
        let answerReq = await sendAnswerCommentReq(value, commentID);

        if (answerReq.ok) {
          showToastSwal("موفق", "جواب شما با موفقیت ارسال شد", "success");
          renderComments();
        } else {
          showToastSwal("ناموفق", answerReq, "error");
        }
      }
    }
  );
};

const sendAcceptCommentReq = async (id) => {
  let acceptReq = await fetch(`${mainUrl}/comments/accept/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  let acceptRes = await acceptReq.json();

  return acceptReq.ok
    ? acceptReq
    : acceptRes?.message[0]?.message || acceptRes?.message;
};

const acceptComment = async (commentID) => {
  let acceptReq = await sendAcceptCommentReq(commentID);

  if (acceptReq) {
    showToastSwal("موفق", "کامنت تایید شد و قابل مشاهده است", "success");
    renderComments();
  } else {
    showToastSwal("ناموفق", acceptReq, "error");
  }
};

const sendRejectcCommentReq = async (id) => {
  let rejectReq = await fetch(`${mainUrl}/comments/reject/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  let rejectRes = await rejectReq.json();

  return rejectReq.ok
    ? rejectReq
    : rejectRes?.message[0]?.message || rejectRes.message;
};

const rejectcComment = async (commentID) => {
  let rejectReq = await sendRejectcCommentReq(commentID);

  if (rejectReq.ok) {
    showToastSwal("موفق", "کامنت رد شد و قابل مشاهده نیست", "success");
    renderComments();
  } else {
    showToastSwal("ناموفق", rejectReq, "error");
  }
};

const sendRemoveCommentReq = async (id) => {
  let removeReq = await fetch(`${mainUrl}/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  let removeRes = await removeReq.json();

  return removeReq.ok
    ? removeReq
    : removeRes?.message[0]?.message || removeRes.message;
};

const removeComment = (commentID) => {
  showSwal("آیا از حذف مطمئنید؟", "", "warning", async (result) => {
    if (result.isConfirmed) {
      let removeReq = await sendRemoveCommentReq(commentID);

      if (removeReq.ok) {
        showToastSwal("موفق", "کامنت با موفقیت حذف شد", "success");
        renderComments();
      } else {
        showToastSwal("ناموفق", removeReq, "error");
      }
    }
  });
};

const getDiscountCodes = async () => {
  let getReq = await fetch(`${mainUrl}/offs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  let getRes = await getReq.json();
  return getRes;
};

const generateDiscountCodeTdTemplate = (code, index) => {
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${code.code}</td>
      <td>${code.creator}</td>
      <td>${code.percent}</td>
      <td>${code.max}</td>
      <td>${code.uses}</td>
      <td>${code.createdAt.slice(0, 10).replaceAll('-', '/')}</td>
  
      <td>
        <button type='button' class='btn btn-danger delete-btn removeBtn' onclick="removeDiscountCode('${
          code._id
        }')">حذف</button>
      </td>
    </tr>
  `;
};

const sendRemoveDiscountCodeReq = async id => {
  let removeReq = await fetch(`${mainUrl}/offs/${id}`, {
    method : 'DELETE',
    headers : {
      Authorization : `Bearer ${getToken()}`
    }
  })

  let removeRes = await removeReq.json();

  return removeReq.ok ? removeReq : removeRes?.message[0]?.message || removeRes.message
}

const removeDiscountCode =  discountCodeID => {
  showSwal('از حف کد تخفیف مطمئنید', '', 'question', async (result) => {
    if (result.isConfirmed) {
      let removeReq = await sendRemoveDiscountCodeReq(discountCodeID)
      if (removeReq.ok) {
        showToastSwal('موفق', 'حذف کد تخفیف با موفقیت انجام شد', 'success')
        renderDiscountCodes()
      }else{
        showToastSwal('ناموفق', removeReq, 'ناموفق')
      }
    }
  })
}

const createDiscountCodeData = () => {
  // Elements \\
  let codeInput = document.querySelector('#code')
  let percentInput = document.querySelector('#percent')
  let maxInput = document.querySelector('#max')
  let courseSelector = document.querySelector('#courses-list')

  //Asigning
  let codeData = {
    code : codeInput.value.trim(),
    percent : percentInput.value.trim(),
    max : maxInput.value.trim(),
    course : courseSelector.dataset.id

  }

  return codeData
}

const sendDiscountCodeDataReq = async codeData => {
  let sendReq = await fetch(`${mainUrl}/offs`, {
    method: 'POST',
    headers:{
      Authorization : `Beader ${getToken()}`,
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(codeData)
  })

  let sendRes = await sendReq.json()

  return sendReq.ok ? sendReq : sendRes?.message[0]?.message || sendRes?.message
}

const sendSetCampaignReq = async (campaignData) => {
  let sendReq = await fetch(`${mainUrl}/offs/all`, {
    method: 'POST',
    headers : {
      Authorization : `Beader ${getToken()}`,
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(campaignData)
  })

  return sendReq
}

const getPanelInfo = async () => {
  let getReq = await fetch(`${mainUrl}/infos/p-admin`,{
    method : 'GET',
    headers : {
      Authorization : `Bearer ${getToken()}`
    }
  })

  let getRes = await getReq.json();

  return getRes
}

const generateLatesUserTdTemplate = (user, index) => {
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.phone}</td>
      <td>${user.email}</td>
      <td>${user.username}</td>
      <td>${user.role == "ADMIN" ? "مدیر" : "کاربر"}</td>
    </tr>
  `
}

const createAdminInfo = () => {
  let nameInput = document.querySelector('#name')
  let usernameInput = document.querySelector('#username')
  let emailInput = document.querySelector('#email')
  let phoneInput = document.querySelector('#phone')
  let passwordInput = document.querySelector('#password')
  

  let adminInfo = {
    name : nameInput.value.trim() ,
    username : usernameInput.value.trim(),
    email : emailInput.value.trim(),
    password : passwordInput.value.trim(),
    phone : phoneInput.value.trim(), 
  }
  return adminInfo

}

const sendAdminInfo = async (adminInfo) => {
  let sendReq = await fetch(`${mainUrl}/users`,{
    method : 'PUT',
    headers : {
      Authorization : `Bearer ${getToken()}`,
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(adminInfo)
  })

  let sendRes = await sendReq.json()
  console.log(sendRes);
  return sendReq.ok ? sendReq : sendRes?.message[0]?.message || sendRes?.message
}

const getAllTickets = async () => {
  let getReq = await fetch(`${mainUrl}/tickets`, {
    method : 'GET',
    headers : {
      Authorization : `Bearer ${getToken()}`
    }
  })

  let getRes = await getReq.json()
  return getRes
}

const generatePanelTicketTdTemplate = (ticket, index) => {
  let ticketPriority = null
  switch (ticket.priority) {
    case 1:
      ticketPriority = 'بالا'
      break;
  
    case 2:
      ticketPriority = 'متوسط'
      break;
  
    case 3:
      ticketPriority = 'پایین'
      break;
  
    default:
      break;
  }
  return `
      <tr>
        <td class="${ticket.answer ? 'answer-ticket' : 'no-answer-ticket'}">
          ${index + 1}
        </td>
        <td>${ticket.title}</td>
        <td>${ticket.user}</td>
        <td>${ticket.course ? ticket.course : '----'}</td>
        <td>${ticketPriority}</td>
        <td>${ticket.departmentID}</td>
        <td>${ticket.departmentSubID}</td>
        <td>${ticket.createdAt.slice(0, 10).replaceAll('-', '/')}</td>
        <td>
          <button type='button' class='btn btn-primary seen-btn showBtn' onclick='showTicket("${ticket.body}","${ticket._id}")'>مشاهده</button>
        </td>
        <td>
          <button type='button' class='btn btn-primary seen-btn answerBtn' onclick="answerTicket('${
            ticket._id
          }')">پاسخ</button>
        </td>
      </tr>
  `
}

const showTicket = async (ticketBody, ticketID) => {
  showSwal('متن ارسال شده :', JSON.stringify(ticketBody), 'info', (result) => {
    if (result.isConfirmed) {
      answerTicket(ticketID)
    }
  })
}

const sendTicketAnswerReq = async (id, body) => {
  let ticketData = {
    body,
    ticketID : id
  }
  let answerReq = await fetch(`${mainUrl}/tickets/answer`, {
    method : 'POST',
    headers : {
      Authorization : `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    },
    body : JSON.stringify(ticketData)
  })

  let answerRes = await answerReq.json();

  return answerReq.ok ? answerReq : answerRes?.message[0]?.message || answerRes?.message
}

const answerTicket =  ticketID => {
  showInputSwal('پاسخ را بنویسید', 'پاسخ شما ...', 'ارسال پاسخ', async (result) => {
    if (result.isConfirmed) {
      let answerReq = await sendTicketAnswerReq(ticketID, result.value.trim())

      if (answerReq.ok) {
        renderPanelTickets();
        showToastSwal('موفق', 'پاسخ تیکت با موفقیت ارسال شد', 'success')
      }else{
        showToastSwal('ناموفق', answerReq, 'error')
      }
    }
  })
}

export {
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
  readyMenuParentItem,
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
  readySessionCourse,
  readySessionStatus,
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
};

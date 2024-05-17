import { getToken, getUrlParam } from "../../funcs/utils.js";
import { uploadTicket } from "./shared.js";

const mainUrl = 'https://sabzlearn2.liara.run/v1';
const coversMainUrl = "https://sabzlearn2.liara.run";

const getOrders = async () => {
    let getReq = await fetch(`${mainUrl}/orders`, {
        method: 'GET',
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })

    let getRes = await getReq.json();
    return getRes
}

const generateOrdersTdTemplate = (order, index) => {
    return `
        <tr class="order__table-body-list">
            <th class="order__table-body-item">
                <a href="#" class="order__table-body-link">${index + 1}</a>
            </th>
            <th class="order__table-body-item">${order.createdAt.slice(0, 10).replaceAll('-', '/')}</th>
            <th class="order__table-body-item">تکمیل شده</th>
            <th class="order__table-body-item">${order.price}</th>
            <th class="order__table-body-item">
                <a class="order__table-body-btn" href="#">جزءیات</a>
            </th>
        </tr>
    `
}

const getBuyedCourses = async () => {
    let getReq = await fetch(`${mainUrl}/users/courses`, {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })

    let getRes = await getReq.json();

    return getRes
}

const generateByedCourseTemplate = (course) => {
    return `
        <div class="main__box">
            <div class="main__box-right">
                <a class="main__box-img-link" href="../../course.html?name=${course.shortName}">
                    <img class="main__box-img img-fluid" src="${coversMainUrl}/courses/covers/${course.cover}">
                </a>
            </div>
            <div class="main__box-left">
                <a href="../../course.html?name=${course.shortName}" class="main__box-title">${course.name}</a>
                <div class="main__box-bottom">
                    <div class="main__box-all">
                        <span class="main__box-all-text">قیمت :</span>
                        <span class="main__box-all-value">${course.price ? course.price.toLocaleString() : 'رایگان'}</span>
                    </div>
                    <div class="main__box-completed">
                        <span class="main__box-completed-text">وضعیت :</span>
                        <span class="main__box-completed-value">${
                            course.isCompleted ? 'به اتمام رسیده' :'درحال برگزاری'
                        }</span>
                    </div>
                </div>
            </div>
        </div>
    `
}

const filterCourses = (courses, filteringMethod) => {
    let filteredCourses = null;
    switch (filteringMethod) {
        case 'mony':
            filteredCourses = courses.filter(course => course.course.price != 0)
            break;
        
        case 'free' :
            filteredCourses = courses.filter(course => course.course.price == 0)
            break;
        case 'complete':
            filteredCourses = courses.filter(course => course.course.isCompleted == true)
            break;
        
        case 'free' :
            filteredCourses = courses.filter(course => course.course.isCompleted != true)
            break;

        default:
            filteredCourses = courses
            break;
    }

    return filteredCourses
}

const getUserTickets = async () => {
    let getReq = await fetch(`${mainUrl}/tickets/user`, {
        method: 'GET',
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })

    let getRes = await getReq.json()

    return getRes
}

const getDepartments = async () => {
    let getReq = await fetch(`${mainUrl}/tickets/departments`)
    let getRes = await getReq.json()
    return getRes
}

const getSubDepartments = async id => {
    let getReq = await fetch(`${mainUrl}/tickets/departments-subs/${id}`)
    let getRes= await getReq.json()
    return getRes
}

const loadSubDepartments = async (parentID) => {
    let ticketCourseCol  = document.querySelector('#course-col');
    let coursesWrapper = document.querySelector('#courses-list');
    ticketCourseCol.classList.add('d-none')
    coursesWrapper.innerHTML = `
        <option class="ticket-form__option" value=undefined >لطفا یک مورد را انتخاب نمایید.</option>
    `
    let subDepartmentsWrapper = document.querySelector('#subdepartments-list')
    let subDepartments = await getSubDepartments(parentID)
    console.log(subDepartments);
    subDepartmentsWrapper.innerHTML = `
        <option class="ticket-form__option" value="-1">لطفا یک ساب دپارتمنت را انتخاب نمایید.</option>
    `

    subDepartments.forEach(subDepartment => {
        subDepartmentsWrapper.insertAdjacentHTML('beforeend', `
        <option class="ticket-form__option" value="${subDepartment._id}">${subDepartment.title}</option>
    `) 
    });

    
}

const loadCourses = async () => {
    let coursesWrapper = document.querySelector('#courses-list');
    
    let courses = await getBuyedCourses()
    console.log(courses);
    courses.forEach(course => {
        coursesWrapper.insertAdjacentHTML('beforeend', `
            <option class="ticket-form__option" value=${course.course._id} >${course.course.name}</option>
        `)
    })
}

const readyTicketCourse = () => {
    let coursesWrapper = document.querySelector('#courses-list');
    coursesWrapper.onchange = e => {
        coursesWrapper.dataset.id = e.target.value
    }
}

const readySubDepartment = () => {
    let ticketCourseID = '63b688c5516a30a651e98156';
    let courseSelector = document.querySelector('#courses-list');
    let ticketCourseCol  = document.querySelector('#course-col')
    let subDepartmentsWrapper = document.querySelector('#subdepartments-list');

    subDepartmentsWrapper.onchange = async e => {
        console.log('subdepartemnt clicked');
        subDepartmentsWrapper.dataset.id = e.target.value;
        if (e.target.value == ticketCourseID) {
            await loadCourses()
            readyTicketCourse();
            ticketCourseCol.classList.remove('d-none')
        }else{
            ticketCourseCol.classList.add('d-none');
            courseSelector.dataset.id = '-1'

        }
    }
}

const readyTicketPriority = () => {
    let ticketPrioritiesEl = document.querySelector('#ticket-priorities')
    ticketPrioritiesEl.addEventListener('change', e => {
        ticketPrioritiesEl.dataset.priority = e.target.value
    })
}

const createTicketData = () =>{
    let departmentSelector  = document.querySelector('#departments-list')
    let prioritieSelector = document.querySelector('#ticket-priorities')
    let titleInput = document.querySelector('#ticket-title')
    let subDepartmentSelector = document.querySelector('#subdepartments-list')
    let bodyInput = document.querySelector('#ticket-body')
    let courseSelector = document.querySelector('#courses-list')

    return {
        departmentID : departmentSelector.dataset.id,
        departmentSubID : subDepartmentSelector.dataset.id,
        title : titleInput.value.trim(),
        body : bodyInput.value.trim(),
        priority : prioritieSelector.dataset.priority,
        course : courseSelector.dataset.id != '-1' ? courseSelector.dataset.id : undefined
    }
}

const sendTicketDataReq = async ticketData => {
    let sendReq = await fetch(`${mainUrl}/tickets`, {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${getToken()}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(ticketData)
    })

    let sendRes = await sendReq.json();

    return sendReq.ok ? sendReq : sendRes?.message[0]?.message|| sendRes?.message
}

const generateUserTicketTemplate = tikcet => {
    return `
        <div class="ticket-content__box">
            <div class="ticket-content__right">
                <div class="ticket-content__right-right">
                    <a class="ticket-content__link" href="../Answer-Ticket/index.html?ticketID=${tikcet._id}">${tikcet.title}</a>
                    <span class="ticket-content__category">
                        <i class="fa fa-ellipsis-v ticket-content__icon"></i>
                        ${tikcet.departmentSubID}</span>
                </div>
                <div class="ticket-content__right-left">
                    <span class="ticket-content__name">${tikcet.user}</span>
                </div>
            </div>
            <div class="ticket-content__left">
                <div class="ticket-content__left-right">
                    <div class="ticket-content__condition">
                        <span class="ticket-content__condition-text">${tikcet.answer ? 'پاسخ داده شده' : 'در انتظار پاسخ'}</span>
                    </div>
                </div>
                <div class="ticket-content__left-left">
                    <span class="ticket-content__time">${tikcet.createdAt.slice(0, 10).replaceAll('-', '/')}</span>
                    
                </div>
            </div>
        </div>
    `
}

const getTicketAnswerInfo = async () => {
    let ticketID = getUrlParam('ticketID');
    let getReq = await fetch(`${mainUrl}/tickets/answer/${ticketID}`, {
        method: 'GET',
        headers : {
            Authorization : `Bearer ${getToken()}`
        }
    })

    let getRes = await getReq.json();

    return getRes
}

export { 
    getOrders,
    generateOrdersTdTemplate,
    getBuyedCourses,
    generateByedCourseTemplate,
    getDepartments,
    filterCourses,
    getUserTickets,
    loadSubDepartments,
    readySubDepartment,
    readyTicketPriority,
    createTicketData,
    sendTicketDataReq,
    generateUserTicketTemplate,
    getTicketAnswerInfo
}
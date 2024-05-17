import { getMe } from "../../funcs/auth.js"
import { getFromLocal, showSwal, showToastSwal } from "../../funcs/utils.js"
import { generateOrdersTdTemplate,
     getOrders,
     filterCourses,
     generateByedCourseTemplate,
     getUserTickets,
     getDepartments,
     loadSubDepartments,
     readySubDepartment,
     createTicketData,
     sendTicketDataReq,
     generateUserTicketTemplate,
     getTicketAnswerInfo
} from "./utils.js"
const mainUrl = 'https://sabzlearn2.liara.run/v1';
const coversMainUrl = "https://sabzlearn2.liara.run";


const renderUserInfo = async () => {
    
    let userInfo = getFromLocal('userInfo').userInfo
    let userNameElems = document.querySelectorAll('.user-name')

    userNameElems.forEach(el => el.innerHTML = userInfo.name)
}

const renderOrders = async () => {
    let ordersWrapper = document.querySelector('#orders-wrapper')
    ordersWrapper.innerHTML = ''
    let oreders = await getOrders()
    console.log(oreders);

   if (oreders.length) {
    oreders.forEach((order, index) => {
        ordersWrapper.insertAdjacentHTML('beforeend', generateOrdersTdTemplate(order, index))
    });
   }else{
    ordersWrapper.parentElement.innerHTML = `
        <div class="alert alert-danger">تا الان سفارشی نداشتید</div>
    `
   }
}

const renderBuyedCourses = async (courses, filteringMethod = 'none') => {
    let coursesWrapper = document.querySelector('#courses-wrapper')
    coursesWrapper.innerHTML = '';
    let filteredCourses = courses = filterCourses(courses, filteringMethod)
    
    if (filteredCourses.length) {
        filteredCourses.forEach(course => {
            coursesWrapper.insertAdjacentHTML('beforeend', generateByedCourseTemplate(course.course))
        })
    }else{
        coursesWrapper.innerHTML = `
            <div class="alert alert-danger">دوره ای نبود</div>
        `
    }
}

const renderUserTickets = async () => {
    let ticketsWrapper = document.querySelector('#tickets-wrapper');
    let ticketsCountEl = document.querySelector('#tickets-count')
    let tickets = await getUserTickets()
    console.log(tickets);
    ticketsWrapper.innerHTML = '';
    ticketsCountEl.innerHTML = tickets.length

    if (tickets.length) {
        tickets.forEach(ticket => {
            ticketsWrapper.insertAdjacentHTML('beforeend', generateUserTicketTemplate(ticket))
        })
    }else{
        ticketsWrapper.innerHTML = `
            <div class="alert alert-danger">
                تیکتی ثبت نشده است
            </div>
        `
    }
}


const loadDepartments = async () => {
   
    let departmentsWrapper = document.querySelector('#departments-list')
       
    let departments = await getDepartments()

    departmentsWrapper.innerHTML = `
        <option class="ticket-form__option" value="-1">لطفا یک دپارتمنت را انتخاب نمایید.</option>
    `

    departments.forEach(department => {
        departmentsWrapper.insertAdjacentHTML('beforeend', `
            <option class="ticket-form__option" value="${department._id}">${department.title}</option>
        `)
    })
}

const readyDepartment = async () => {
    let selectors = document.querySelectorAll('.selector-list')
    let departmentList = document.querySelector('#departments-list')
    departmentList.onchange =  async e => {
        selectors.forEach(selector => selector.dataset.id = "-1")
        departmentList.dataset.id = e.target.value
        await loadSubDepartments(e.target.value)
        readySubDepartment()
    }

}

const uploadTicket = async () => {
    let ticketData = createTicketData();
    let sendTicketReq = await sendTicketDataReq(ticketData);

    if (sendTicketReq.ok) {
        showSwal('موفق', 'تیکت با موفقیت به واحد مدیریت ارسال شد', 'success', (res) => {
            if(res.isConfirmed){
                location.href = '../Tickets'
            }
        })
    }else{
        showToastSwal('ناموفق', sendTicketReq, 'error')
    }
}


const renderTicketAnswerInfo = async () => {
    let ticketEl = document.querySelector('#ticket-el')
    let answerEl = document.querySelector('#answer-el')
    let ticketAnswerInfo = await getTicketAnswerInfo()

    ticketEl.innerHTML = ticketAnswerInfo.ticket
    answerEl.innerHTML = ticketAnswerInfo.answer
}

export {
    renderUserInfo,
    renderOrders,
    renderBuyedCourses,
    renderUserTickets,
    loadDepartments,
    readyDepartment,
    uploadTicket,
    renderTicketAnswerInfo
}
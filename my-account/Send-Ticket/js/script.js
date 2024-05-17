import { loadDepartments, readyDepartment, uploadTicket } from "../../../js/my-account/funcs/shared.js"
import { readyTicketPriority } from "../../../js/my-account/funcs/utils.js"


window.uploadTicket = uploadTicket

readyTicketPriority()
await loadDepartments()
readyDepartment()
import {renderDiscountCodes, loadCourses, registerDiscountCode} from "../../../js/panel/funcs/shared.js"
import {readySessionCourse} from "../../../js/panel/funcs/utils.js"

window.registerDiscountCode = registerDiscountCode

renderDiscountCodes()
await loadCourses()
readySessionCourse()
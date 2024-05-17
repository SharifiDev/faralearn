import { renderSessions, loadCourses, uploadSession } from "../../../js/panel/funcs/shared.js";
import { readySessionCourse, readySessionStatus } from "../../../js/panel/funcs/utils.js";
window.uploadSession = uploadSession
renderSessions()  
readySessionStatus()
await loadCourses();
readySessionCourse()

import { readyCourseCategory } from "../../../js/panel/funcs/utils.js";
import { 
    renderCoursesInPanel,
    loadCategories,
    uploadCourse
} from "../../../js/panel/funcs/shared.js";

renderCoursesInPanel();
await loadCategories();
readyCourseCategory();

window.uploadCourse = uploadCourse
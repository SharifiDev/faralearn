import {CourseBox} from '../components/course-box/course-box.js'
import { ArticleBox } from "../components/article-box/article-box.js";
import {Topbar } from '../components/topbar/topbar.js';
import { Navbar } from "../components/navbar/navbar.js";
import {MobileNav} from "../components/mobileNav/mobileNav.js";
import { Footer } from "../components/footer/footer.js";
import {Pagination} from "../components/pagination/pagination.js"
import { Breadcrumb } from "../components/breadcrumb/breadcrumb.js";
import { CourseRowBox } from "../components/course-row-box/course-row-box.js";

window.customElements.define('course-box', CourseBox)
window.customElements.define('article-box', ArticleBox)
window.customElements.define('top-bar', Topbar)
window.customElements.define('nav-bar', Navbar)
window.customElements.define('mobile-nav', MobileNav)
window.customElements.define('web-footer', Footer)
window.customElements.define('web-pagination', Pagination)
window.customElements.define('bread-crumb', Breadcrumb)
window.customElements.define('course-row-box', CourseRowBox)


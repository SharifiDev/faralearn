let template = document.createElement('template');
template.innerHTML = `
<div class="mobile-nav" >
            

    <div class="mobile-menu__header">
        <span class="mobile-menu__site-name">  فرا لرن</span>
        <div class="mobile-menu__close-btn">
        <i class="fas fa-arrow-right mobile-menu__close-icon"></i>
                
        </div>
    </div>


    <div class="mobile-menu__search-box">
        <input type="text" class="mobile-menu__search-input" id="mobile-search-input" placeholder="دوره مد نظرتو وارد کن">
        <a class="mobile-menu__search-btn" id="mobile-search-btn">
            <i class="fas fa-search mobile-menu__search-icon"></i>
        </a>
    </div>

    <ul class="mobile-nav__menu" id="mobile-menu">
        <li class="mobile-nav__item">
            <a href="index.html" class="mobile-nav__link">صفحه اصلی</a>
        </li>

        <li class="mobile-nav__item">
            <a href="category.html" class="mobile-nav__link">تمامی دوره ها</a>
        </li>
    </ul>


</div>
`

//<li class="mobile-nav__item">
//    <p class="mobile-nav__link">فرانت اند</p>
//    <i class="fas fa-angle-down"></i>
//    <ul class="mobile-nav__dropdown-menu">
//        <li class="nav-mobile__dropdown-item">
//            <a href="#" class="mobile-nav__dropdown-link">آموزش Html</a>
//        </li>
//    </ul>
//</li>

class MobileNav extends HTMLElement {
    constructor(){
        super();
        this.appendChild(template.content.cloneNode(true));
    }
}

export {MobileNav}
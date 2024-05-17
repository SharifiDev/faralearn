let template = document.createElement('template');
template.innerHTML = `
<nav class="navbar">
        <div class="navbar__menu-button">
                
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
        </div>

            
        <div class="navbar__log navbar__center-logo">
            <h2 class="navbar__logo-text navbar__center-logo-text">faralearn</h2>
        </div>
            

    <div class="navbar__right-container">
        <div class="navbar__log">
            <h3 class="navbar__logo-text">faralearn</h3>
        </div>

        <ul class="navbar__menu" id="navbar-menu">
            <li class="navbar__item">
                <a href="index.html" class="navbar__link">صفحه اصلی</a>       
            </li>

            <li class="navbar__item">
                <a href="category.html" class="navbar__link">تمامی دوره ها</a>       
            </li>         
        </ul>
    </div>

    <div class="navbar__left-container">
        <a href="#" class="navbar__search-btn" id="navbar-search-btn">
            <i class="fas fa-search navbar__search-icon"></i>
        </a>

        <a href="#" class="navbar__basket-btn">
            <i class="fas fa-shopping-cart navbar__basket-icon"></i>
        </a>

        <a href="#" class="navbar__profile-btn" id="profile-btn">
            <span class="navbar__prifile-text"></span>
        </a>
    </div>
</nav>
`

//<ul class="navbar__dropdown-menu">
    // <li class="navbar__dropdown-item">
    //     <a href="#" class="navbar__dropdown-link">آموزش Html</a>
    // </li>
//</ul>
        
class Navbar extends HTMLElement{
    constructor(){
        super();
        this.appendChild(template.content.cloneNode(true));
    }
}

export {Navbar}
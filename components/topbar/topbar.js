let template = document.createElement('template');
template.innerHTML =`
<div class="top-bar">
    <div class="top-bar__right-container">
        <ul class="top-bar__menu">
            
        </ul>
    </div>

    <div class="top-bar__left-container">
        <div class="top-bar__email">
            <a href="#" class="top-bar__email-text">ali.sharifi6478@gmail.com</a>
            <i class="fas fa-envelope top-bar__email-icon"></i>
        </div>

        <div class="top-bar__phone">
            <a href="#" class="top-bar__phone-text">0994025649</a>
            <i class="fas fa-phone top-bar__phone-icon"></i>
        </div>
    </div>
</div>
`

//topBar Item Template : 
//<li class="top-bar__item">
    //<a href="#" class="top-bar__link" data-text="آموزش Html">آموزش Html</a>
//</li>


class Topbar extends HTMLElement{
    constructor(){
        super();
        this.appendChild(template.content.cloneNode(true))
    }
    
    connectedCallback(){
        // this.querySelector('.top-bar__email-text') = this.getData().
        

    }
    
}

export {Topbar}
let template = document.createElement('template');
template.innerHTML =`
<div class="breadcrumb">
    <div class="breadcrumb__home">
        <i class="fas fa-home breadcrumb__home-icon"></i>
    </div>
                
    <ul class="breadcrumb__list">

        <li class="breadcrumb__item">
            <a href="index.html" class="breadcrumb__link">    
                خانه                       
            </a>
        </li>

                            
    </ul>
</div>
`


// use in article-app.js

class Breadcrumb extends HTMLElement{
    constructor(){
        super(); 
        this.appendChild(template.content.cloneNode(true))
    }
    
}

export { Breadcrumb}
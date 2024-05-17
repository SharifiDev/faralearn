let template = document.createElement('template');
template.innerHTML = `
<div class="article-box">
    <div class="article-box__img-container">
        <img alt="article | مقاله" class="article-box__img">
    </div>

    <div class="article-box__main-container">
        <div class="article-box-infos">
            <a href="#" class="article-box__title">
                
            </a>

            <p class="article-box__subtitle">
                
            </p>
        </div>
        
        <a class="article-box__btn">بیشتر بخوانید</a>
    </div>
</div>
`

class ArticleBox extends HTMLElement{
    constructor(){
        super();

        this.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        this.querySelector('.article-box__img').src = this.getAttribute('imgSrc')
        this.querySelector('.article-box__title').innerHTML = this.getAttribute('title')
        this.querySelector('.article-box__subtitle').innerHTML = this.getAttribute('subTitle')
        this.setAttribute('data-aos', this.getAttribute('aos'))
        this.querySelectorAll('a').forEach(link => link.href = this.getAttribute('href'))
    }
    observedAttributes(){
        return['imgSrc',
         'title',
         'subTitle',
         'aos',
         'href'
        ]
    }
}

export {ArticleBox}
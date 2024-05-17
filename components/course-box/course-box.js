//data-firstColor="#333a00" data-secondColor="#77803a"
let template = document.createElement('template');
template.innerHTML = `
<div class="course-box" >
    <span class="course-box__discount-label hide" >
    </span>
    <div class="course-box__img-container">
        <a href="#" class="course-box__img">
            <img src="" alt="" class="course-img box-img">
        </a>
    </div>

    <div class="course-box__infos-container">
        <div class="course-box__main">
            <h4 class="course-box__title"></h4>
            <div class="course-box__teacher-infos">
                <span class="course-box__teacher-name"></span>
                <span class="course-box__teacher-stars">
                    
                </span>
            </div>
            <div class="course-box__infos">
                <div class="course-box__students">
                    <i class="fas fa-users course-box__students-icon"></i>
                    <span class="course-box__students-count"></span>
                </div>
                <div>
                <span class="course-box__price second-price hide"></span>
                <span class="course-box__price first-price"></span>
                </div>
            </div>
        </div>

        <div class="course-box__footer">
            <a href="#" class="course-box__footer__button">
                مشاهده اطلاعات
                <i class="fas fa-arrow-left course-box__footer__button-icon"></i>
            </a>
        </div>

    </div>


</div>
`

{/* <img src="./images/svgs/star.svg" alt="">
<img src="./images/svgs/star_fill.svg" alt="">
<img src="./images/svgs/star_fill.svg" alt="">
<img src="./images/svgs/star_fill.svg" alt="">
<img src="./images/svgs/star_fill.svg" alt=""></img> */}

class CourseBox extends HTMLElement {
    constructor(){
        super();
        this.appendChild(template.content.cloneNode(true))
    }

    setStars(){
        let starsContainer = this.querySelector('.course-box__teacher-stars')
        let fullStars = Number(this.getAttribute('starsNum'))
        let emptyStars = 5 - fullStars;

        

        for (let i = 0; i < emptyStars; i++) {
            starsContainer.insertAdjacentHTML('beforeend' , `
                <img src="./images/svgs/star.svg" alt="">
            `)
            
        }

        for (let i = 0; i < fullStars; i++) {
            starsContainer.insertAdjacentHTML('beforeend' , `
                <img src="./images/svgs/star_fill.svg" alt="">
            `)
            
        }
    }

    discountHandler(){
        const discountLabel = this.querySelector('.course-box__discount-label')
        const fisrtPriceEl = this.querySelector('.first-price')
        const secondPriceEl = this.querySelector('.second-price')
        let discountValue = + this.getAttribute('discount')
        let mainPrice = this.getAttribute('price');
        
        if (discountValue && mainPrice != 0) {
            let finalPrice = (mainPrice - (mainPrice * discountValue / 100))
            fisrtPriceEl.classList.add('before-discount');
            secondPriceEl.classList.replace('hide', 'discount')
            secondPriceEl.innerHTML = finalPrice ? finalPrice.toLocaleString() : 'رایگان'

            discountLabel.innerHTML = `% ${discountValue}`
            discountLabel.classList.remove('hide')
        }
    }
    
    connectedCallback(){
        let price = + this.getAttribute('price')
        this.querySelector('.course-img').src = this.getAttribute('imgSrc')
        this.querySelector('.course-img').alt = this.getAttribute('title')
        this.querySelector('.course-box__title').innerHTML = this.getAttribute('title');
        this.querySelector('.course-box__teacher-name').innerHTML = this.getAttribute('teacherName');
        this.querySelector('.course-box__students-count').innerHTML = this.getAttribute('studentsCount');
        this.querySelector('.course-box__price.first-price').innerHTML = price ? price.toLocaleString() : 'رایگان'
        this.querySelector('.course-box').classList.add(`cart-${this.getAttribute('order')}`);
        // this.classList.add(this.getAttribute('class') || '');
        this.querySelectorAll('a').forEach(a => a.href = this.getAttribute('href') || '#')
        this.setStars()
        this.discountHandler()

    }
    observedAttributes(){
        return ['imgSrc',
            'title',
            'teacherName',
            'studentsCount',
            'price',
            'href',
            'starsNum',
            'order',
            'class',
            'discount'
        ]
    }
}

export {CourseBox}
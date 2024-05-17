let template = document.createElement('template');
template.innerHTML = `
<div class="course-row-box">
    <div class="course-row__box-header">
        <div class="course-row__box-right">
            

            <div class="course-row__box-right__right">
                <div class="course-row__box-left-top">
                    
                </div>
                                    
                <div class="course-row__box-left-center">
                    <div class="course-row__box-left-teacher">
                        <svg class="svg-inline--fa fa-chalkboard-user course-row__box-left-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M592 0h-384C181.5 0 160 22.25 160 49.63V96c23.42 0 45.1 6.781 63.1 17.81V64h352v288h-64V304c0-8.838-7.164-16-16-16h-96c-8.836 0-16 7.162-16 16V352H287.3c22.07 16.48 39.54 38.5 50.76 64h253.9C618.5 416 640 393.8 640 366.4V49.63C640 22.25 618.5 0 592 0zM160 320c53.02 0 96-42.98 96-96c0-53.02-42.98-96-96-96C106.1 128 64 170.1 64 224C64 277 106.1 320 160 320zM192 352H128c-70.69 0-128 57.31-128 128c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32C320 409.3 262.7 352 192 352z"></path></svg><!-- <i class="course__box-left-icon fa fa-chalkboard-teacher"></i> Font Awesome fontawesome.com -->
                        <span class="course-row__box-left-name"></span>
                    </div>
                    <div class="course-row__box-left-stars">
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="course-row__box-left">
                                
            <div class="course-row__box-left-bottom">
                <div class="course__box-left-des">
                    <p class="course__box-left-des__text"></p>
                </div>
            </div>
            <div class="course-row__box-footer">
                <div class="course-row__box-footer-right">
                    <svg class="svg-inline--fa fa-users course-row__box-footer-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"></path></svg><!-- <i class="course__box-footer-icon fa fa-users"></i> Font Awesome fontawesome.com -->
                    <span class="course-row__box-footer-count"></span>
                </div>
                <span class="course-row__box-footer-left"></span>
            </div>
        </div>
    </div>
</div>
`
{/* <a href="#" class="course-row__box-left-link">آموزش 20 کتابخانه جاوا اسکریپت</a>

<span class="course-row__box-left-star">
    <img src="images/svgs/star_fill.svg">
</span>
 */}
class CourseRowBox extends HTMLElement {
    constructor(){
        super();
        this.appendChild(template.content.cloneNode(true))
    }

    setStars(){
        let starsMaxNum = 5;
        let starsNum = this.getAttribute('starsNum')
        let emptyStarsNum = + starsMaxNum - starsNum 

        for (let i = 0; i < starsNum; i++) {
            this.querySelector('.course-row__box-left-stars').insertAdjacentHTML('beforeend', `
              <span class="course-row__box-left-star">
                <img src="images/svgs/star_fill.svg">
              </span>
            `)
        }

        for (let i = 0; i < emptyStarsNum; i++) {
            this.querySelector('.course-row__box-left-stars').insertAdjacentHTML('afterbegin', `
              <span class="course-row__box-left-star">
                <img src="./images/svgs/star.svg" alt="">
              </span>
            `)
        }
    }

    connectedCallback(){
        this.setStars();

        this.querySelector('.course-row__box-right').insertAdjacentHTML('afterbegin', `
            <a class="course-row__box-right-link">
                <img src="${this.getAttribute('imgSrc')}" class="course-row__box-right-img">
            </a>
        `)

        this.querySelector('.course-row__box-left-top').insertAdjacentHTML('beforeend', `
          <a class="course-row__box-left-link">${this.getAttribute('title')}</a>
        `)  

        this.querySelector('.course-row__box-left-name').innerText = this.getAttribute('teacherName');
        this.querySelector('.course__box-left-des__text').innerText = this.getAttribute('description');
        this.querySelector('.course-row__box-footer-count').innerText = this.getAttribute('studentsNum');
        this.querySelector('.course-row__box-footer-left').innerText = this.getAttribute('price')
        this.querySelector('.course-row-box').classList.add(`cart-${this.getAttribute('order')}`)
        this.querySelectorAll('a').forEach(a => a.href = this.getAttribute('href'))
    }
    observedAttributes(){
        return['imgSrc',
        'order',
        'title',
        'teacherName',
        'starsNum',
        'description',
        'href',
        'studentsNum',
        'price'
        ]
    }
}

export {CourseRowBox}
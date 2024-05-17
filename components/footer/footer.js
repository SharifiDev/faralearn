import {joinInNewsLetter} from '../../js/funcs/shared.js'
let template = document.createElement('template');
template.innerHTML =`
<footer class="footer">
        <div class="container">
            <div class="footer__widgets">
                <div class="footer__widgets-item">
                    <span class="footer__widgets-title">درباره ما</span>
                    <span class="footer__widgets-text">
                        آکادمی آموزش برنامه نویسی فرا لرن کد به عنوان یک آکادمی خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون رو نداره 
                    </span>
                </div>
    
                <div class="footer__widgets-item">
                    <span class="footer__widgets-title">مطالب بیشتر</span>
                    <div class="footer__widgets-links">
                        <a href="#" class="footer__widgets-link">
                            نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                        </a>
    
                        <a href="#" class="footer__widgets-link">
                            چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن پایتون      
                        </a>
    
                        <a href="#" class="footer__widgets-link">
                            آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به گام و تصویری                  
                        </a>
    
                        <a href="#" class="footer__widgets-link">
                            بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی معایب و مزایا
                        </a>
    
                        <a href="#" class="footer__widgets-link">
                            معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش رایگان
                        </a>
                    </div>
                </div>
    
                <div class="footer__widgets-item">
                    <span class="footer__widgets-title">دسترسی سریع</span>
                    <div class="footer__widgets-links part-links">
                        <div class="footer__widgets-top part-link">
                            <a href="#" class="footer__widgets-link">
                                آموزش HTML
                            </a>
    
                            <a href="#" class="footer__widgets-link">
                                آموزش CSS
                            </a>
                            
                            <a href="#" class="footer__widgets-link">
                                آموزش جاوا اسکریپت
                            </a>
                        </div>
    
                        
    
                        <div class="footer__widgets-bottom part-link">
                            <a href="#" class="footer__widgets-link">
                                آموزش بوت استرپ
                            </a>
    
                            <a href="#" class="footer__widgets-link">
                                آموزش ریکت
                            </a>
    
                            <a href="#" class="footer-widgets__link">
                                آموزش پایتون
                            </a>
                        </div>
                    </div>

                    <div class="footer__add-news-letter">
                        <span class="footer__add-news-letter__title footer__widgets-title">عضویت در خبرنامه</span>

                        <p class="footer__add-news-letter__description">
                            در خبرنامه ما عضو شوید تا از رویداد ها و تخفیف های وبسایتمان بهره مند شوید.
                        </p>
                       <div class="footer__add-news-letter__inputBox">
                            <input type="text"  id="news-letter-input" placeholder="ایمیل خودرا جهت عضویت وارد کنید" class="footer__add-news-letter__input">
                            <button type="button" class="footer__add-news-letter__btn">عضویت</button>
                        </div>
                    </div>
                </div>
            </div>
    
            
        </div>
        <div class="footer__copyright">
            <p class="footer__copyright-text">کلیه حقوق برای آکادمی فرا لرن محفوظ است.</p>
            <span class="footer__coptyright-subtext">ali.sharifi6478@gamil.com</span>
        </div>
    </footer>
`

class Footer extends HTMLElement {
    constructor(){
        super();
        this.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        this.querySelector('.footer__add-news-letter__input').value = JSON.parse(localStorage.getItem('userInfo'))?.userInfo?.email || ''
        this.querySelector('.footer__add-news-letter__btn').onclick = joinInNewsLetter
    }
}

export {Footer}
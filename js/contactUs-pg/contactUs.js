import { hideLoader } from "../funcs/handlers/loadin-handler.js";
import { getFromLocal, showToastSwal } from "../funcs/utils.js";
import {
  renderNewContactUsMsg,
} from "../funcs/shared.js";

//==============================       Variables       ============================\\
let sendMsgBtn = document.querySelector("#send-btn");
let msgInputs = document.querySelectorAll(".msg-input");
let userInfo = getFromLocal('userInfo')?.userInfo;
//==============================       Functions       ============================\\

function setDefaultInputValues(){
    let userContactInfo = [
        [userInfo.name],
        [userInfo.email],
        [userInfo.phone]
    ];

    userContactInfo.forEach((info, index) => msgInputs[index].value = info)
}


function sendMsg(e) {
  e.preventDefault();
  let areValues = Array.from(msgInputs).every((input) => input.value.trim() != "");

  if (!areValues) {
    showToastSwal('خطا درارسال', 'باید تمامی ورودی ها را پر کنید', 'error')
    return false
  }

  renderNewContactUsMsg();
}
//==============================       Codes       ============================\\
window.addEventListener("load", async () => {
  hideLoader();
});

sendMsgBtn.addEventListener("click", sendMsg);

userInfo && setDefaultInputValues();

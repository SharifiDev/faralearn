import { showSwal, showToastSwal, setIntoLocal, getToken } from "./utils.js";
const mainUrl = 'https://sabzlearn2.liara.run/v1'

const getMe = async () => {
  let token = getToken();
  if (!token) {
    setIntoLocal('userInfo', {status : false, statusType : 'accessToken', message : 'لطفا ابتدا ورود کنید'})
    return false
  };
  let isGetingSuccess = {status : false, statusType : 'serverError', message : 'مشکلی پیشآمده. مججد تلاش کنید.'};

  let getReq = await fetch(`${mainUrl}/auth/me`, {
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
  
  if (getReq.status < 400){
    let result = await getReq.json()
    isGetingSuccess = {status : true, userInfo : result}
  }
  setIntoLocal('userInfo', isGetingSuccess)
  return isGetingSuccess
}

const register = () => {
  const inputs = document.querySelectorAll(".inputs-input");

  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const password = document.querySelector("#register-password");

  let userData = {
    name: name.value.trim(),
    username: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    password: password.value.trim(),
    confirmPassword: password.value.trim(),
  };

  fetch(`${mainUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      console.log(res);

      return res.json();
    })
    .then((result) => {
      console.log(result);
      if (!result.accessToken) throw result;
      let isRgisterSuccessSwal = true;
      showSwal("ثبت نام موفقیت آمیز بود", "آیا ورود میکنید؟", "success", async (res) => {
        if (res.isConfirmed) {
          setIntoLocal(
            "user",
            { accessToken: result.accessToken }
          );
          await getMe();
          if (isRgisterSuccessSwal) window.location.href = 'my-account/Account';
        }
        
      });
      inputs.forEach((input) => {
        input.value = "";
      });
    })
    .catch((err) => {
      showToastSwal("مشکلی پیش آمده", err.message[0].message || err.message, "error");
    });
};

const login = () => {
  const identifierInput = document.querySelector("#identifier");
  const passwordInput = document.querySelector("#login-password");
  
  const loginData = {
    identifier: identifierInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  fetch(`${mainUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then(async (result)  => {
      console.log(result);
      if (!result.accessToken) throw result;

      showToastSwal(
        "ورود با موفقیت انجام شد",
        "درحال ورود به پنل کاربری",
        "success"
      );
      setIntoLocal("user", { accessToken: result.accessToken });
      await getMe();
      window.location.href = 'my-account/Account'
    })
    .catch((err) => {
      showToastSwal(
        "مشخصات وارد شده اشتباه است",
        "لطفا پس از بررسی مجددا اقدام بفرمایید",
        "error"
      );
    });
};



export { register, login, getMe};

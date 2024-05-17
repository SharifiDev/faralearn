let menuBtn = document.querySelector(".sidebar-menu-btn");
let tBodyTable = document.querySelector("tbody");
let body = document.body;

menuBtn.addEventListener("click", function () {
  if (body.className !== "active-sidebar") {
    body.classList.add("active-sidebar");
    body.classList.remove("notactive-sidebar");
  } else {
    body.classList.add("notactive-sidebar");
    body.classList.remove("active-sidebar");
  }
});

menuBtn.addEventListener("click", function () {
  if (body.className !== "active-sidebar") {
    body.classList.add("active-sidebar");
    body.classList.remove("notactive-sidebar");
  } else {
    body.classList.add("notactive-sidebar");
    body.classList.remove("active-sidebar");
  }
});

function getDataFromDataBase() {
  let datas = JSON.parse(localStorage.getItem("users"));
  if (datas !== null) {
    for (let i = datas.length - 1; i >= datas.length - 5; i--) {
      let user = datas[i];
      tBodyTable.insertAdjacentHTML(
        "beforeend",
        "<tr><td>" +
          user.id +
          "</td><td>" +
          user.name +
          "</td><td>" +
          user.family +
          "</td><td>" +
          user.phoneNumber +
          "</td><td>" +
          user.email +
          "</td><td>" +
          user.password +
          "</td></tr>"
      );
    }
  }
}

window.addEventListener("load", getDataFromDataBase);

const navbarHandler = () => {
  //==============================       Variables      ============================\\
  const mobileMenu = document.querySelector("mobile-nav");
  const closeMobileMenuBtn = document.querySelector(".mobile-menu__close-btn");
  const openMobileMenuBtn = document.querySelector(".navbar__menu-button svg");

  const dropdownLabels = document.querySelectorAll(".mobile-nav__link");

  //Selectinf Coustom nav-bar Element
  let navbar = document.querySelector("nav-bar");
  
  //==============================       Functions       ============================\\
  function closeMobileMenu() {
    mobileMenu.style.right = "-100%";
  }
  function openMobileMenu() {
    mobileMenu.style.right = "0";
  }
  //==============================       Events / Code       ============================\\
  dropdownLabels.forEach((label) => {
    label.addEventListener("click", () => {
      dropdownLabels.forEach(
        (lb) =>
          label.parentElement.classList.contains("active") ||
          lb.parentElement.classList.remove("active")
      );
      label.parentElement.classList.toggle("active");
    });
  });

  closeMobileMenuBtn.addEventListener("click", closeMobileMenu);
  openMobileMenuBtn.addEventListener("click", openMobileMenu);

  let lastScrollSize = window.scrollY;
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1200) {
      navbar.style.top = 0;
    } else if (window.scrollY < 20) {
      navbar.style.top = "4.4rem";
    }
  });
  window.addEventListener("scroll", () => {
    let scrollSize = window.scrollY;

    if (scrollSize > 20) {
      navbar.style.top = "0";
    } else if (window.innerWidth > 1200) {
      navbar.style.top = "4.4rem";
    }

    if (scrollSize > 60) {
      if (scrollSize > lastScrollSize) {
        navbar.style.top = "-100%";
      } else {
        navbar.style.top = "0";
      }
      lastScrollSize = scrollSize;
    }
  });

  if (window.scrollY > 40 || window.innerWidth < 1200) {
    navbar.style.top = "0";
  } else if (window.innerWidth > 1200) {
    
    navbar.style.top = "4.4rem";
  }
};

export {navbarHandler}
const hideLoader = (param) => {
  let loadingContainer = document.querySelector(".loading-container");
  
    
    loadingContainer.remove();
    if (param?.hasSwal) {
      document.querySelector('.swal2-container').remove()
    }
  
};

const showLoader = () => {
  let loadingContainer = document.querySelector(".loading-container");

  loadingContainer.style.display = "flex";
};

export { hideLoader, showLoader };

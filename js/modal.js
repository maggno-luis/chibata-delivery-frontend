const btnCart = document.querySelector("#btn-cart");
const btnCloseModalCart = document.querySelector("#btn-close-modal-cart");
const modalCart = document.querySelector(".modal-cart");
const infoProfile = document.querySelector(".info-profile");
const modalProfile = document.querySelector(".profile");


btnCart.addEventListener('click', function(){
    modalCart.style.display = 'block';
})

btnCloseModalCart.addEventListener('click', function(){
    modalCart.style.display = 'none';
})

infoProfile.addEventListener('click', function(){
    if(modalProfile.style.right === '0px'){
        modalProfile.style.right = '-180px';
    }else{
        modalProfile.style.right = '0';
    }
})





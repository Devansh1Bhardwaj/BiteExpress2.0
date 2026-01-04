const navCloseBtn = document.querySelector('.nav-close');
const nav = document.querySelector('nav');
const hamburgerBtn = document.querySelector('.hamburger-icon');
const homePage = document.querySelector('.home-page');

function northIndian(){
    homePage.styles.display = 'none';
}
function southIndian(){
    homePage.styles.display = 'none';
}
function chinese(){
    homePage.styles.display = 'none';
}
function desert(){
    homePage.styles.display = 'none';
}


hamburgerBtn.addEventListener('click', (e)=>{
    nav.classList.toggle('open');
})

navCloseBtn.addEventListener('click', (e)=>{
    nav.classList.toggle('open');
})



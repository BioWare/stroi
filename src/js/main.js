window.onscroll = function showNav() {
  let header = document.querySelector('.nav-menu');

  if(window.pageYOffset > 200) {
    header.classList.add('.header-fixed');
  } else {
    header.classList.remove('.header-fixed');
  }
}
'use strict';

const header = document.querySelector('.header');
const headerLogo = header.querySelector('.logo-header');
const headerSignUpBtn = header.querySelector('.btn-solid');
const featuresOffset = window.pageYOffset + document.querySelector('.features').getBoundingClientRect().top;
const accordionItems = document.querySelectorAll('.faq-item');
const accordionHeaders = document.querySelectorAll('.faq-header');
const year = new Date().getFullYear();
const yearElements = document.querySelectorAll('.year-display');

// get the offset size when to show nav
const sectionPaddingRem = window.getComputedStyle(document.documentElement).getPropertyValue('--section-padding');
const remSize = window.getComputedStyle(document.documentElement).fontSize;
// remove the units (rem & px) then * sectionPad by the rem size to get section padding in px
const navOffset = featuresOffset - (4 * sectionPaddingRem.slice(0, -3) * remSize.slice(0, -2));

// flags 
let didScroll = false;
let isNavDisplayed = false;

// Nav
function showNav() {
  header.style.background = '#000';
  headerLogo.style.opacity = '1';
  headerSignUpBtn.style.opacity = '1';
  headerLogo.style.visibility = 'visible';
  headerSignUpBtn.style.visibility = 'visible';
}

function hideNav() {
  header.style.background = 'none';
  headerLogo.style.opacity = '0';
  headerSignUpBtn.style.opacity = '0';
  headerLogo.style.visibility = 'hidden';
  headerSignUpBtn.style.visibility = 'hidden';
}

document.addEventListener('scroll', () => {
  didScroll = true;
});

setInterval(() => { // instead of calling on every scroll only call every 50ms
  if (didScroll) {
    didScroll = false;
    if (scrollY >= navOffset && !isNavDisplayed) {
      showNav();
      isNavDisplayed = true;
    } else if (scrollY < navOffset && isNavDisplayed) {
      hideNav();
      isNavDisplayed = false;
    }
  }
}, 50);

// Accordion
accordionHeaders.forEach(header => header.addEventListener('click', () => {
  const parentElement = header.parentElement;
  parentElement.classList.toggle('collapsed');

  if (parentElement.classList.contains('collapsed')) {
    parentElement.style.maxHeight = header.offsetHeight+'px';
  } else {
    parentElement.style.maxHeight = '1000px';
  }
}));

// Year display
yearElements.forEach(yearEl => {
  yearEl.innerText = year;
});

// Window resize 
window.addEventListener('resize', function(event) {
  // resizes accordion item heights
  accordionItems.forEach(item => item.style.maxHeight = item.querySelector('header').offsetHeight+'px');
}, true);
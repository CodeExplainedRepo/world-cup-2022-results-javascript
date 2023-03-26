const navLinks = [...document.querySelectorAll('.navbar .link')];
const tabs = [...document.querySelectorAll('.tabs .tab')];

navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    selectTab(idx);
  });
});

function selectTab(idx) {
  navLinks.forEach((link, index) => {
    if (index === idx) {
      link.classList.add('active');
      tabs[index].classList.remove('hide');
    } else {
      link.classList.remove('active');
      tabs[index].classList.add('hide');
    }
  });
}

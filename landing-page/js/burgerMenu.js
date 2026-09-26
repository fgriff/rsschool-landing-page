export const burgerMenu = () => {
  const pageContainer = document.querySelector('.container');
  const burgerButton = document.querySelector('button.burger');
  const burgerMenu = document.querySelector('.burger-menu');

  const toggleElement = (elem, className) => {
    elem.classList.toggle(className)
  }

  const burgerButtonClickHandler = () => {
    toggleElement(burgerButton, 'burger_active');
    toggleElement(burgerMenu, 'burger-menu_opened');
    toggleElement(pageContainer, 'no-scroll');
  }

  burgerButton.addEventListener('click', burgerButtonClickHandler);
}
const KEY = 'Esc';

export const burgerMenu = () => {
  const pageContainer = document.querySelector('.container');
  const burgerButton = document.querySelector('button.burger');
  const burgerMenu = document.querySelector('.burger-menu');

  const toggleElement = (elem, className) => {
    elem.classList.toggle(className)
  }

  const removeClass = (elem, className) => {
    elem.classList.remove(className)
  }

  const closeMenu = () => {
    removeClass(burgerButton, 'burger_active');
    removeClass(burgerMenu, 'burger-menu_opened');
    removeClass(pageContainer, 'no-scroll');
  }

  const burgerButtonClickHandler = () => {
    toggleElement(burgerButton, 'burger_active');
    toggleElement(burgerMenu, 'burger-menu_opened');
    toggleElement(pageContainer, 'no-scroll');
  }

  const keyClickHandler = (e) => {
    if (e.key.startsWith(KEY)) {
      closeMenu();
    }
  }

  burgerButton.addEventListener('click', burgerButtonClickHandler);
  window.addEventListener('keydown', keyClickHandler);
}
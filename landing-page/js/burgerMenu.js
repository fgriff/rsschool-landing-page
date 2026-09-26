const KEY = 'Esc';

export const burgerMenu = () => {
  const pageContainer = document.querySelector('.container');
  const burgerButton = document.querySelector('button.burger');
  const burgerMenu = document.querySelector('.burger-menu');
  let targetHref = '';

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

  const calculateHref = (hrefAttr) => {
    let newHref = '';

    if (hrefAttr.startsWith('#')) {
      newHref = window.location.origin + window.location.pathname + hrefAttr;
    } else if (hrefAttr.startsWith('..')) {
      newHref =
        window.location.origin +
        window.location.pathname.replace(/[a-z]+?\/$/i, '') +
        hrefAttr.slice(3);
    }

    return newHref;
  }

  const burgerMenuClickHandler = (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();

      targetHref = calculateHref(e.target.getAttribute('href'));

      toggleElement(burgerButton, 'burger_active');
      toggleElement(burgerMenu, 'burger-menu_opened');
      toggleElement(pageContainer, 'no-scroll');
    }
  }

  const burgerMenuTransitionEndHandler = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    const isMenuClosed =
      e.target === burgerMenu &&
      !e.target.classList.contains('burger-menu_opened');

    if (isMenuClosed && targetHref) {
      window.location.href = targetHref;
    }
  }

  burgerButton.addEventListener('click', burgerButtonClickHandler);
  window.addEventListener('keydown', keyClickHandler);
  burgerMenu.addEventListener('click', burgerMenuClickHandler);
  burgerMenu.addEventListener('transitionend', burgerMenuTransitionEndHandler);
}
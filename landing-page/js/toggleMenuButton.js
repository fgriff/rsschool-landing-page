export const toggleMenuButton = () => {
  const a = document.querySelector('a.header__menu');

  if (window.location.href.includes('menu')) {
    a.classList.add('header__menu_active');
  } else {
    a.classList.remove('header__menu_active');
  }
}

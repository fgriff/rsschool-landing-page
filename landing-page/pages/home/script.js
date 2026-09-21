const LS_KEY = 'fgriff-landing-page';
const input = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = JSON.parse(localStorage.getItem(LS_KEY));

if (savedTheme === 'dark') {
  input.checked = true;
}

input.addEventListener('change', () => {
  const dark = input.checked;

  localStorage.setItem(LS_KEY, JSON.stringify(dark ? 'dark' : 'light'));

  html.classList.toggle('theme-dark', dark);
});

const a = document.querySelector('a.header__menu');

if (window.location.href.includes('menu')) {
  a.classList.add('header__menu_active');
} else {
  a.classList.remove('header__menu_active');
}
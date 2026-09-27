export const cards = () => {
  const tabs = document.querySelector('.menu__tabs');
  const tabsButtons = tabs.querySelectorAll('.tabs__item');

  const changeActiveButton = (category) => {
    tabsButtons.forEach((tab) =>
      tab.classList.toggle('tabs__item_active', tab.dataset['category'] === category))
  }

  const tabsClickHandler = (e) => {
    const button = e.target.closest('button');

    if (!button) {
      return;
    }

    changeActiveButton(button.dataset['category']);
  }

  tabs.addEventListener('click', tabsClickHandler);
}
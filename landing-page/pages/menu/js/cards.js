import { createCard } from "./card.js";

const WIDTH_TO_SHOW_ALL_CARDS = 768;
const MIN_CARDS_COUNT = 4;

export const cards = () => {
  const cardsContainer = document.querySelector('.menu__cards');
  const tabs = document.querySelector('.menu__tabs');
  const tabsButtons = tabs.querySelectorAll('.tabs__item');

  const cardsCategory = {
    coffee: [],
    tea: [],
    dessert: [],
  };
  let currentCategory = 'coffee';
  let isTabletLayout = window.innerWidth <= WIDTH_TO_SHOW_ALL_CARDS;

  (async () => {
    try {
      const response = await fetch('../../data/products.json');

      if (!response.ok) {
        return;
      }

      const cardsData = await response.json();
      cardsData.forEach((card) => {
        if (cardsCategory[card.category]) {
          cardsCategory[card.category].push(card);
        }
      });

      renderCards();
    } catch (error) {
      console.error("Error loading or processing data:", error);
    }
  })()

  const changeActiveTab = () => {
    tabsButtons.forEach((tab) =>
      tab.classList.toggle('tabs__item_active', tab.dataset['category'] === currentCategory))
  }

  const renderCards = () => {
    const currentCards = cardsCategory[currentCategory];

    const count = isTabletLayout ? MIN_CARDS_COUNT : currentCards.length;

    const cardsToRender = currentCards
      .slice(0, count)
      .map((cardData, index) => createCard(cardData, index + 1));

    cardsContainer.replaceChildren(...cardsToRender);
  };

  const tabsClickHandler = (e) => {
    const button = e.target.closest('button');

    if (!button) {
      return;
    }

    currentCategory = button.dataset['category'];
    changeActiveTab();

    renderCards();
  };

  const windowResizeHandler = () => {
    const currentIsTablet = window.innerWidth <= WIDTH_TO_SHOW_ALL_CARDS;

    if (currentIsTablet !== isTabletLayout) {
      isTabletLayout = currentIsTablet;
      renderCards();
    }
  };

  tabs.addEventListener('click', tabsClickHandler);
  window.addEventListener('resize', windowResizeHandler);
};

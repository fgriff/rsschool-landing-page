import { cardsStore } from "./cardsStore.js";
import { createCard } from "./card.js";

const WIDTH_TO_SHOW_ALL_CARDS = 768;
const MIN_CARDS_COUNT = 4;

export const cards = () => {
  const cardsContainer = document.querySelector('.menu__cards');
  const tabs = document.querySelector('.menu__tabs');
  const tabsButtons = tabs.querySelectorAll('.tabs__item');
  const loadMoreButton = document.querySelector('.menu__load-btn');

  let isTabletLayout = window.innerWidth <= WIDTH_TO_SHOW_ALL_CARDS;
  let isLoaded = false;

  const renderCards = () => {
    const currentCards = cardsStore.getCurrentCategoryCards();

    const count = (isTabletLayout && !isLoaded) ? MIN_CARDS_COUNT : currentCards.length;

    const cardsToRender = currentCards
      .slice(0, count)
      .map((cardData, index) => createCard(cardData, index));

    cardsContainer.replaceChildren(...cardsToRender);

    const hasHiddenCards = isTabletLayout && currentCards.length > MIN_CARDS_COUNT;

    if (hasHiddenCards && !isLoaded) {
      loadMoreButton.classList.remove('menu__load-btn_hidden');
    } else {
      loadMoreButton.classList.add('menu__load-btn_hidden');
    }
  };

  const initCardsStore = async () => {
    await cardsStore.init;
    renderCards();
  }

  initCardsStore();

  const changeActiveTab = () => {
    const currentCategory = cardsStore.currentCategory;

    tabsButtons.forEach((tab) =>
      tab.classList.toggle('tabs__item_active', tab.dataset['category'] === currentCategory))
  }

  const tabsClickHandler = (e) => {
    const button = e.target.closest('button');

    if (!button) {
      return;
    }

    cardsStore.currentCategory = button.dataset['category'];
    changeActiveTab();

    isLoaded = false;

    renderCards();
  };

  const loadMoreButtonClickHandler = () => {
    isLoaded = true;
    renderCards();
  }

  const windowResizeHandler = () => {
    const currentIsTablet = window.innerWidth <= WIDTH_TO_SHOW_ALL_CARDS;

    if (currentIsTablet !== isTabletLayout) {
      isTabletLayout = currentIsTablet;
      isLoaded = false;

      renderCards();
    }
  };

  tabs.addEventListener('click', tabsClickHandler);
  loadMoreButton.addEventListener('click', loadMoreButtonClickHandler);
  window.addEventListener('resize', windowResizeHandler);
};

import { createCard } from "./card.js";

const WIDTH_TO_SHOW_ALL_CARDS = 768;
const MIN_CARDS_COUNT = 4;

export const cards = () => {
  const cardsContainer = document.querySelector('.menu__cards');
  const tabs = document.querySelector('.menu__tabs');
  const tabsButtons = tabs.querySelectorAll('.tabs__item');

  let cardsData = [];
  let displayedСardsCount = 0;
  let currentCategory = 'coffee';
  const categoryCardsCount = {
    coffee: {
      count: 0,
      offset: 0,
    },
    tea: {
      count: 0,
      offset: 0,
    },
    dessert: {
      count: 0,
      offset: 0,
    },
  };

  (async () => {
    const response = await fetch('../../data/products.json');

    if (!response.ok) {
      return;
    }

    cardsData = await response.json();

    initData();

    const cards = generateCards(0, displayedСardsCount || categoryCardsCount[currentCategory].count);
    showCards(cards);
  })()

  const initData = () => {
    displayedСardsCount = window.innerWidth > WIDTH_TO_SHOW_ALL_CARDS ? 0 : MIN_CARDS_COUNT;

    for (const card of cardsData) {
      switch (card.category) {
        case 'coffee':
          categoryCardsCount.coffee.count += 1;
          categoryCardsCount.tea.offset += 1;
          categoryCardsCount.dessert.offset += 1;
          break;
        case 'tea':
          categoryCardsCount.tea.count += 1;
          categoryCardsCount.dessert.offset += 1;
          break;
        case 'dessert':
          categoryCardsCount.dessert.count += 1;
          break;
        default:
          break;
      }
    }
  }

  const generateCards = (start, end) => {
    const cards = [];
    const offset = categoryCardsCount[currentCategory].offset;

    for (let i = start; i < end; i++) {
      cards.push(createCard(cardsData[i], (i + 1) - offset));
    }

    return cards;
  }

  const showCards = (cards) => {
    cardsContainer.append(...cards);
  }

  const changeActiveButton = () => {
    tabsButtons.forEach((tab) =>
      tab.classList.toggle('tabs__item_active', tab.dataset['category'] === currentCategory))
  }

  const tabsClickHandler = (e) => {
    const button = e.target.closest('button');

    if (!button) {
      return;
    }

    currentCategory = button.dataset['category'];

    changeActiveButton();

    const startIndex = categoryCardsCount[currentCategory].offset;
    const endIndex = categoryCardsCount[currentCategory].offset + categoryCardsCount[currentCategory].count;

    const newCategoryCards = generateCards(startIndex, endIndex);
    cardsContainer.replaceChildren(...newCategoryCards);
  }

  tabs.addEventListener('click', tabsClickHandler);
}
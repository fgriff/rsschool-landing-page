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
  let prevScreenWidth = 0;

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
    prevScreenWidth = window.innerWidth;

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

  const removeCards = () => {
    const countCardsToRemove = cardsContainer.childElementCount - MIN_CARDS_COUNT;

    for (let i = 0; i < countCardsToRemove; i++) {
      const lastChild = cardsContainer.lastElementChild;

      if (lastChild) {
        lastChild.remove();
      }
    }
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

    let startIndex;
    let endIndex;

    if (window.innerWidth <= WIDTH_TO_SHOW_ALL_CARDS) {
      startIndex = categoryCardsCount[currentCategory].offset;
      endIndex = categoryCardsCount[currentCategory].offset + 4;
    } else {
      startIndex = categoryCardsCount[currentCategory].offset;
      endIndex = categoryCardsCount[currentCategory].offset + categoryCardsCount[currentCategory].count;
    }

    const newCategoryCards = generateCards(startIndex, endIndex);
    cardsContainer.replaceChildren(...newCategoryCards);
  }

  const windowResizeHandler = (e) => {
    displayedСardsCount = e.target.innerWidth > WIDTH_TO_SHOW_ALL_CARDS ? 0 : MIN_CARDS_COUNT;

    if (e.target.innerWidth > WIDTH_TO_SHOW_ALL_CARDS &&
        prevScreenWidth <= WIDTH_TO_SHOW_ALL_CARDS
      ) {
        prevScreenWidth = e.target.innerWidth;

        const startIndex = categoryCardsCount[currentCategory].offset + 4;
        const endIndex = categoryCardsCount[currentCategory].offset + categoryCardsCount[currentCategory].count;

        const cards = generateCards(startIndex, endIndex);
        showCards(cards);
    } else if (e.target.innerWidth <= WIDTH_TO_SHOW_ALL_CARDS &&
        prevScreenWidth > WIDTH_TO_SHOW_ALL_CARDS
      ) {
        prevScreenWidth = e.target.innerWidth;
        removeCards();
    }
  }

  tabs.addEventListener('click', tabsClickHandler);
  window.addEventListener('resize', windowResizeHandler);
}
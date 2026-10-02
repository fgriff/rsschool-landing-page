import { cardsStore } from "./cardsStore.js";
import { createModalWindowCard } from "./modalWindowCard.js";

const KEY = 'Esc';

export const modalWindow = () => {
  const container = document.querySelector('.container');
  const overlay = container.querySelector('.overlay');
  const cardsContainer = document.querySelector('.menu__cards');

  const cardClickHandler = (e) => {
    const card = e.target.closest('.menu__card');

    if (!card) {
      return;
    }

    const cardIndex = Number(card.dataset['id']);

    const cardData = cardsStore.getCardData(cardIndex);

    const modalWindowCard = createModalWindowCard(cardData, cardIndex, closeModalWindow);

    overlay.replaceChildren(modalWindowCard);

    overlay.classList.remove('overlay_hidden');
    container.classList.add('no-scroll');
  }

  const closeModalWindow = (e) => {
    if (e.target.classList.contains('modal-window__button') ||
        e.target.classList.contains('overlay')
      ) {
      overlay.classList.add('overlay_hidden');
      container.classList.remove('no-scroll');
    }
  }

  const keyClickHandler = (e) => {
    if (e.key.startsWith(KEY)) {
      overlay.classList.add('overlay_hidden');
      container.classList.remove('no-scroll');
    }
  }

  cardsContainer.addEventListener('click', cardClickHandler);
  overlay.addEventListener('click', closeModalWindow);
  window.addEventListener('keydown', keyClickHandler);
}
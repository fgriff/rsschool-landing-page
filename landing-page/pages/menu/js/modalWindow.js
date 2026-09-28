import { createModalWindowCard } from "./modalWindowCard.js";

export const modalWindow = () => {
  const container = document.querySelector('.container');
  const overlay = container.querySelector('.overlay');
  const cardsContainer = document.querySelector('.menu__cards');

  const cardClickHandler = (e) => {
    const card = e.target.closest('.menu__card');

    if (!card) {
      return;
    }
    const modalWindowCard = createModalWindowCard();

    overlay.replaceChildren(modalWindowCard);

    overlay.classList.remove('overlay_hidden');
    container.classList.add('no-scroll');
  }

  cardsContainer.addEventListener('click', cardClickHandler)
}
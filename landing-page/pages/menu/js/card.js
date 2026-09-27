export const createCard = (cardData, cardNumber) => {
  const card = document.createElement('div');
  card.classList.add('menu__card', 'card');

  const cardImage = document.createElement('div');
  cardImage.classList.add('card__image');

  const image = document.createElement('img');
  image.src = `../../assets/img/menu/${cardData.category}-${cardNumber}.jpg`;
  image.alt = cardData.name;

  cardImage.append(image);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card__info');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card__title');
  cardTitle.textContent = cardData.name;

  const cardDescription = document.createElement('p');
  cardDescription.classList.add('card__description');
  cardDescription.textContent = cardData.description;

  const cardPrice = document.createElement('div');
  cardPrice.classList.add('card__price');
  cardPrice.textContent = `$${cardData.price}`;

  cardInfo.append(cardTitle, cardDescription, cardPrice);
  card.append(cardImage, cardInfo);

  return card;
}
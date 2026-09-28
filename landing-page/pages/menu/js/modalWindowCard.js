export const createModalWindowCard = (cardData, imgPath, closeHandler) => {
  const container = document.createElement('div');
  container.classList.add('modal-window');

  const content = document.createElement('div');
  content.classList.add('modal-window__content');

  const image = document.createElement('div');
  image.classList.add('modal-window__image');

  const img = document.createElement('img');
  img.src = imgPath;
  img.alt = cardData.name;

  image.append(img);
  content.append(image);

  const info = document.createElement('div');
  info.classList.add('modal-window__info');

  const header = document.createElement('header');
  header.classList.add('modal-window__header');

  const title = document.createElement('h3');
  title.classList.add('modal-window__title');
  title.textContent = cardData.name;

  const description = document.createElement('p');
  description.classList.add('modal-window__description');
  description.textContent = cardData.description;

  header.append(title, description);
  info.append(header);

  const sizeControls = document.createElement('div');
  sizeControls.classList.add('modal-window__controls', 'controls');

  const sizeTitle = document.createElement('h3');
  sizeTitle.classList.add('controls__title');
  sizeTitle.textContent = 'Size';

  const sizeWrapper = document.createElement('div');
  sizeWrapper.classList.add('controls__wrapper');

  const sizes = Object.entries(cardData.sizes);

  const sizeButtons = [];

  for (let i = 0; i < sizes.length; i++) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('controls__item');
    button.dataset.size = sizes[i][0];
    button.dataset.price = sizes[i][1]['add-price'];

    if (i === 0) {
      button.classList.add('controls__item_active');
    }

    const label = document.createElement('span');
    label.classList.add('controls__label');
    label.textContent = sizes[i][0];

    const text = document.createElement('span');
    text.classList.add('controls__text');
    text.textContent = sizes[i][1].size;

    button.addEventListener('click', sizeClickHandler);

    button.append(label, text);
    sizeButtons.push(button);
  }

  sizeWrapper.append(...sizeButtons);

  sizeControls.append(sizeTitle, sizeWrapper);
  info.append(sizeControls);

  const additivesControls = document.createElement('div');
  additivesControls.classList.add('modal-window__controls', 'controls');

  const additivesTitle = document.createElement('h3');
  additivesTitle.classList.add('controls__title');
  additivesTitle.textContent = 'Additives';

  const additivesWrapper = document.createElement('div');
  additivesWrapper.classList.add('controls__wrapper');

  const additivesButtons = [];

  for (let i = 0; i < cardData.additives.length; i++) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('controls__item');
    button.dataset.price = cardData.additives[i]['add-price'];

    const label = document.createElement('span');
    label.classList.add('controls__label');
    label.textContent = i + 1;

    const text = document.createElement('span');
    text.classList.add('controls__text');
    text.textContent = cardData.additives[i].name;

    button.addEventListener('click', additiveClickHandler);

    button.append(label, text);
    additivesButtons.push(button);
  }

  additivesWrapper.append(...additivesButtons);

  additivesControls.append(additivesTitle, additivesWrapper);
  info.append(additivesControls);

  const total = document.createElement('div');
  total.classList.add('modal-window__total');

  const spanTotal = document.createElement('span');
  spanTotal.textContent = 'Total:';

  const spanPrice = document.createElement('span');
  spanPrice.textContent = `$${cardData.price}`;

  total.append(spanTotal, spanPrice);
  info.append(total);

  const attention = document.createElement('div');
  attention.classList.add('modal-window__attention', 'attention');
  attention.innerHTML = `
    <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_147811_7961)">
      <path d="M8 7.66663V11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 5.00667L8.00667 4.99926" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_147811_7961">
      <rect width="16" height="16" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  `;

  const p = document.createElement('p');
  p.classList.add('attention__text');
  p.textContent = 'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.';

  attention.append(p);
  info.append(attention);

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('modal-window__button');
  button.textContent = 'Close';
  button.addEventListener('click', closeHandler);

  info.append(button);
  content.append(info);
  container.append(content);

  const changeActiveButton = (buttons, dataAttr, value) => {
    buttons.forEach((btn) =>
      btn.classList.toggle('controls__item_active', btn.dataset[dataAttr] === value))
  }

  const basePrice = parseFloat(cardData.price);
  let sizePrice = 0;
  let additivePrice = 0;

  function sizeClickHandler (e) {
    if (e.currentTarget.tagName !== 'BUTTON') {
      return;
    }

    if (e.currentTarget.classList.contains('controls__item_active')) {
      return;
    }

    const size = e.currentTarget.dataset['size'];
    sizePrice = parseFloat(e.currentTarget.dataset['price']);

    changeActiveButton(sizeButtons, 'size', size);

    spanPrice.textContent = `$${(basePrice + sizePrice + additivePrice).toFixed(2)}`;
  }

  function additiveClickHandler (e) {
    if (e.currentTarget.tagName !== 'BUTTON') {
      return;
    }

    const price = parseFloat(e.currentTarget.dataset['price']);

    if (e.currentTarget.classList.contains('controls__item_active')) {
      e.currentTarget.classList.remove('controls__item_active');
      additivePrice -= price;
      spanPrice.textContent = `$${(basePrice + sizePrice + additivePrice).toFixed(2)}`;
    } else {
      e.currentTarget.classList.add('controls__item_active');
      additivePrice += price;
      spanPrice.textContent = `$${(basePrice + sizePrice + additivePrice).toFixed(2)}`;
    }
  }

  return container;
}
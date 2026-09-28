export const createModalWindowCard = (closeHandler) => {
  const container = document.createElement('div');
  container.classList.add('modal-window');

  const content = document.createElement('div');
  content.classList.add('modal-window__content');

  const image = document.createElement('div');
  image.classList.add('modal-window__image');

  const img = document.createElement('img');
  img.src = `../../assets/img/menu/coffee-1.jpg`;
  img.alt = '';

  image.append(img);
  content.append(image);

  const info = document.createElement('div');
  info.classList.add('modal-window__info');

  const header = document.createElement('header');
  header.classList.add('modal-window__header');

  const title = document.createElement('h3');
  title.classList.add('modal-window__title');
  title.textContent = 'Irish coffee';

  const description = document.createElement('p');
  description.classList.add('modal-window__description');
  description.textContent = 'Fragrant black coffee with Jameson Irish whiskey and whipped milk';

  header.append(title, description);
  info.append(header);

  const sizeControls = document.createElement('div');
  sizeControls.classList.add('modal-window__controls', 'controls');

  const sizeTitle = document.createElement('h3');
  sizeTitle.classList.add('controls__title');
  sizeTitle.textContent = 'Size';

  const sizeWrapper = document.createElement('div');
  sizeWrapper.classList.add('controls__wrapper');

  for (let i = 0; i < 3; i++) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('controls__item');

    if (i === 0) {
      button.classList.add('controls__item_active');
    }

    const label = document.createElement('span');
    label.classList.add('controls__label');
    label.textContent = 's';

    const text = document.createElement('span');
    text.classList.add('controls__text');
    text.textContent = '200 ml';

    button.append(label, text);
    sizeWrapper.append(button);
  }

  sizeControls.append(sizeTitle, sizeWrapper);
  info.append(sizeControls);

  const additivesControls = document.createElement('div');
  additivesControls.classList.add('modal-window__controls', 'controls');

  const additivesTitle = document.createElement('h3');
  additivesTitle.classList.add('controls__title');
  additivesTitle.textContent = 'Additives';

  const additivesWrapper = document.createElement('div');
  additivesWrapper.classList.add('controls__wrapper');

  for (let i = 0; i < 3; i++) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('controls__item');

    if (i === 0) {
      button.classList.add('controls__item_active');
    }

    const label = document.createElement('span');
    label.classList.add('controls__label');
    label.textContent = '1';

    const text = document.createElement('span');
    text.classList.add('controls__text');
    text.textContent = 'Sugar';

    button.append(label, text);
    additivesWrapper.append(button);
  }

  additivesControls.append(additivesTitle, additivesWrapper);
  info.append(additivesControls);

  const total = document.createElement('div');
  total.classList.add('modal-window__total');

  const span1 = document.createElement('span');
  span1.textContent = 'Total:';

  const span2 = document.createElement('span');
  span2.textContent = '$7.00';

  total.append(span1, span2);
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

  return container;
}
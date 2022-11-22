import './scss/card.scss';

import { i18nDictionary } from '../../i18n-dictionary/i18n-dictionary';

export const getCardTemplate = (
  { id, name, image, species, audio, description },
  language
) => {
  const dictionary = i18nDictionary[language];

  return `<article class="card" data-id="${id}">
    <h3 class="visually-hidden">${name}</h3>
    <div class="wrapper card--wrapper">
      <figure class="figure card--figure">
        <img class="image card--image" src="${image}" alt="${name}" title="${name}">
      </figure>
      <div class="wrapper card--wrapper card--wrapper-inner">
        <h3 class="card--title">${name}</h3>
        <p class="latin--title">${species}</p>
        <audio class="audio card--audio" controls>
          <source src="${audio}" type="audio/mpeg">
          <span data-i18n="audioNotSupported">
            ${dictionary.audioNotSupported.content}
          </span>
        </audio>
      </div>
    </div>
    <p class="paragraph description card--description">
      ${description}
    </p>
  </article>`;
};

export const translateCard = (cardElement, cardsList) => {
  const targetCard = cardElement.querySelector('.card');
  if (!targetCard) return;

  const cardId = Number(targetCard.dataset.id);

  const newCardData = cardsList.find((card) => card.id === cardId);
  const { name, description } = newCardData;

  const cardImage = cardElement.querySelector('.card--image');
  cardImage.setAttribute('alt', name);
  cardImage.setAttribute('title', name);

  const cardTitle = cardElement.querySelector('.card--title');
  cardTitle.innerText = name;

  const cardDescription = cardElement.querySelector('.card--description');
  cardDescription.innerText = description;
};

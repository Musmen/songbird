import './scss/gallery.view.scss';

import { i18nDictionary } from '../i18n-dictionary/i18n-dictionary';

import { BaseView } from '../../common/base-classes/base-view';

import Swiper from '../components/swiper/swiper';
import { getCardTemplate, translateCard } from '../components/card/card';

class GalleryView extends BaseView {
  constructor() {
    super();

    this.elements = {
      template: null,
      swiper: null,
    };
  }

  init = (language) => {
    const section = document.createElement('section');
    section.className = 'gallery';
    section.insertAdjacentHTML(
      'afterbegin',
      `<h2 class="gallery--title" data-i18n="galleryTitle">
        ${i18nDictionary[language].galleryTitle.content}
      </h2>`
    );

    const swiper = new Swiper();
    const swiperTemplate = swiper.render();
    section.insertAdjacentHTML('beforeend', swiperTemplate);

    const template = document.createElement('div');
    template.className = 'centralizer main--centralizer';
    template.append(section);

    this.elements = { template, swiper };

    super.init();
  };

  renderSlides(cardsList, language) {
    const slidesContainer = document.querySelector('.swiper--container');
    slidesContainer.innerHTML = '';

    const slidesListTemplate = cardsList
      .map(
        (card, index) => `
          <div class="swiper--slide ${
            index === 0 ? 'swiper--slide-active' : ''
          }">
            ${getCardTemplate(card, language)}
          </div>`
      )
      .join('');

    slidesContainer.insertAdjacentHTML('afterbegin', slidesListTemplate);
  }

  initSwiper() {
    this.elements.swiper.init();
  }

  unmount() {
    this.elements.swiper.unmount();
    super.unmount();
  }

  translateCardsInformation = (cardsList) => {
    const slidesElementsList = document.querySelectorAll('.swiper--slide');
    Array.from(slidesElementsList).forEach((slidesElement) =>
      translateCard(slidesElement, cardsList)
    );
  };
}

export default new GalleryView();

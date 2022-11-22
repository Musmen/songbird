import './scss/about.view.scss';

import { i18nDictionary } from '../i18n-dictionary/i18n-dictionary';

import { BaseView } from '../../common/base-classes/base-view';
import { getAboutSectionTemplate } from './about.template';

class AboutView extends BaseView {
  constructor() {
    super();

    this.elements = {
      template: null,
      newGameButton: null,
    };
  }

  init = (language) => {
    const newGameButton = document.createElement('button');
    newGameButton.className = 'button about--button';
    newGameButton.setAttribute('data-i18n', 'aboutButton');
    newGameButton.setAttribute(
      'title',
      i18nDictionary[language].aboutButton.title
    );
    newGameButton.innerText = i18nDictionary[language].aboutButton.content;
    this.elements.newGameButton = newGameButton;

    const section = document.createElement('section');
    section.className = 'about';
    const sectionTemplate = getAboutSectionTemplate(language);
    section.insertAdjacentHTML('afterbegin', sectionTemplate);

    const template = document.createElement('div');
    template.className = 'centralizer main--centralizer';
    template.append(section);
    template.append(this.elements.newGameButton);
    this.elements.template = template;

    super.init();
  };

  addNewGameButtonHandler = (newGameButtonHandler) => {
    this.addHandler({
      element: this.elements.newGameButton,
      event: 'click',
      handler: newGameButtonHandler,
    });
  };
}

export default new AboutView();

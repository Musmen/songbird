import './scss/results.view.scss';

import { i18nDictionary } from '../i18n-dictionary/i18n-dictionary';

import { BaseView } from '../../common/base-classes/base-view';
import {
  getResultsSectionTemplate,
  getResultsScoreTemplate,
  getResultsMaxScoreTemplate,
} from './results.templates';

class ResultsView extends BaseView {
  constructor() {
    super();

    this.language = null;

    this.elements = {
      template: null,
      section: null,
      newGameButton: null,
      score: null,
    };
  }

  init = (language) => {
    this.language = language;

    const newGameButton = document.createElement('button');
    newGameButton.className = 'button results--button';
    newGameButton.setAttribute('data-i18n', 'resultsButton');
    newGameButton.setAttribute(
      'title',
      i18nDictionary[language].resultsButton.title
    );
    newGameButton.innerText = i18nDictionary[language].resultsButton.content;
    this.elements.newGameButton = newGameButton;

    const section = document.createElement('section');
    section.className = 'results';
    const sectionTemplate = getResultsSectionTemplate(language);
    section.insertAdjacentHTML('afterbegin', sectionTemplate);
    this.elements.section = section;

    this.elements.score = section.querySelector('.results--score');

    const template = document.createElement('div');
    template.className = 'centralizer main--centralizer';
    template.append(this.elements.section);
    this.elements.template = template;

    super.init();
  };

  renderNewGameButton = () => {
    this.elements.template.append(this.elements.newGameButton);
  };

  renderScoreResults = (points) => {
    this.elements.score.innerHTML = '';
    const resultsScoreTemplate = getResultsScoreTemplate(this.language, points);
    this.elements.score.insertAdjacentHTML('afterbegin', resultsScoreTemplate);
  };

  renderMaxScoreResults = () => {
    this.elements.score.innerHTML = '';
    const resultsMaxScoreTemplate = getResultsMaxScoreTemplate(this.language);
    this.elements.score.insertAdjacentHTML(
      'afterbegin',
      resultsMaxScoreTemplate
    );
  };

  addNewGameButtonHandler = (newGameButtonHandler) => {
    this.addHandler({
      element: this.elements.newGameButton,
      event: 'click',
      handler: newGameButtonHandler,
    });
  };
}

export default new ResultsView();

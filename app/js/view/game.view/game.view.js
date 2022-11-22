import defaultImg from '../../../assets/img/default_image.png';

import './scss/game.view.scss';

import correctSound from '../../../assets/audio/correct.mp3';
import errorSound from '../../../assets/audio/error.mp3';

import { i18nDictionary } from '../i18n-dictionary/i18n-dictionary';

import { BaseView } from '../../common/base-classes/base-view';
import { getGameTemplate } from './game.template';

import { getCardTemplate, translateCard } from '../components/card/card';

class GameView extends BaseView {
  constructor() {
    super();

    this.elements = {
      template: null,
      categoriesList: null,
      question: {
        image: null,
        answer: null,
        audio: null,
      },
      answersList: null,
      information: null,
      nextRoundButton: null,
    };

    this.audio = {
      correct: new Audio(correctSound),
      error: new Audio(errorSound),
    };
  }

  init = (language) => {
    const nextRoundButton = document.createElement('button');
    nextRoundButton.className = 'button button-disabled game--button';
    nextRoundButton.innerText = 'Next Round';

    nextRoundButton.setAttribute('data-i18n', 'nextRoundButton');
    nextRoundButton.setAttribute(
      'title',
      i18nDictionary[language].nextRoundButton.title
    );
    nextRoundButton.innerText =
      i18nDictionary[language].nextRoundButton.content;

    const article = document.createElement('article');
    article.className = 'game';
    const gameTemplate = getGameTemplate(language);
    article.insertAdjacentHTML('afterbegin', gameTemplate);
    article.append(nextRoundButton);

    this.elements = {
      categoriesList: article.querySelector('.categories--list'),
      score: article.querySelector('.score--value'),
      question: {
        image: article.querySelector('.question--image'),
        answer: article.querySelector('.question--answer'),
        audio: article.querySelector('.question--audio source'),
      },
      answersList: article.querySelector('.answers--list'),
      information: article.querySelector('.information'),
      nextRoundButton,
    };

    const template = document.createElement('div');
    template.className = 'centralizer main--centralizer';
    template.append(article);
    this.elements.template = template;

    super.init();
  };

  renderQuizCategories = (quizCategories) => {
    const categoriesList = quizCategories
      .map(
        (quizCategory) =>
          `<li class="list--item categories--item">
            ${quizCategory}
          </li>`
      )
      .join('');

    this.elements.categoriesList.innerHTML = '';
    this.elements.categoriesList.insertAdjacentHTML(
      'afterbegin',
      categoriesList
    );
  };

  translateQuizCategories = (quizCategories) => {
    const categoriesElements =
      this.elements.categoriesList.querySelectorAll('.categories--item');

    Array.from(categoriesElements).forEach((categoriesElement, index) => {
      const translatedCategoriesElement = categoriesElement;
      translatedCategoriesElement.innerText = quizCategories[index];
    });
  };

  removeActiveQuizCategory = () => {
    const activeCategoryElement = this.elements.categoriesList.querySelector(
      '.categories--item-active'
    );
    if (!activeCategoryElement) return;
    activeCategoryElement.classList.remove('categories--item-active');
  };

  addActiveQuizCategory = (currentRound) => {
    const newActiveCategoryElement = this.elements.categoriesList.querySelector(
      `.categories--item:nth-of-type(${currentRound})`
    );
    newActiveCategoryElement.classList.add('categories--item-active');
  };

  updateActiveQuizCategory = (currentRound) => {
    this.removeActiveQuizCategory();
    this.addActiveQuizCategory(currentRound);
  };

  renderAnswersList = (answersWithIds) => {
    const answersList = answersWithIds
      .map(
        ({ id, answer }) =>
          `<li class="list--item answers--item">
            <button class="button answers--button" data-id="${id}">
              ${answer}
            </button>
          </li>`
      )
      .join('');

    this.elements.answersList.innerHTML = '';
    this.elements.answersList.insertAdjacentHTML('afterbegin', answersList);
  };

  translateAnswersList = (newAnswers) => {
    const answersList =
      this.elements.answersList.querySelectorAll('.answers--button');

    Array.from(answersList).forEach((answer, index) => {
      const translatedNewAnswer = answer;
      translatedNewAnswer.innerText = newAnswers[index];
    });
  };

  getCurrentAnswerId = (element) => Number(element.dataset.id);

  chekcIsAnswerButton = (element) =>
    element.className.includes('answers--button');

  updateScore = (score) => {
    this.elements.score.innerText = score;
  };

  updateQuestionImage = (src) => {
    this.elements.question.image.src = src;
  };

  renderDefaultQuestionImage = () => {
    this.updateQuestionImage(defaultImg);
  };

  updateQuestionAnswer = (answer) => {
    this.elements.question.answer.textContent = answer;
  };

  renderMaskQuestionAnswer = () => {
    this.updateQuestionAnswer('******');
  };

  setQuestionAudio = (audioSrc) => {
    this.elements.question.audio.src = audioSrc;
  };

  updateQuestionAudio = (audioSrc) => {
    this.setQuestionAudio(audioSrc);
    const player = this.elements.question.audio.parentElement;
    player.load();
  };

  showAnswer = ({ image, name }) => {
    this.updateQuestionImage(image);
    this.updateQuestionAnswer(name);
  };

  hideAnswer = () => {
    this.renderDefaultQuestionImage();
    this.renderMaskQuestionAnswer();
  };

  renderCardInformation = (card, language) => {
    const cardTemplate = getCardTemplate(card, language);

    const { information } = this.elements;

    information.innerHTML = '';
    information.insertAdjacentHTML('afterbegin', cardTemplate);
  };

  translateCardInformation = (cardsList) => {
    translateCard(this.elements.information, cardsList);
  };

  renderDefaultDescription = (language) => {
    const { information } = this.elements;

    information.innerHTML = '';
    information.insertAdjacentHTML(
      'afterbegin',
      `<p class="paragraph information--paragraph" data-i18n="informationParagraph">
        ${i18nDictionary[language].informationParagraph.content}
      </p>`
    );
  };

  stopQuestionAudio = () => {
    this.elements.question.audio.parentElement.pause();
  };

  playAudio = (audio) => {
    const player = audio;
    player.pause();
    player.currentTime = 0;
    player.play();
  };

  playCorrectAudio = (audio = this.audio.correct) => {
    this.playAudio(audio);
  };

  playErrorAudio = (audio = this.audio.error) => {
    this.playAudio(audio);
  };

  addLabel = (element, labelClassName) => {
    element.parentElement.classList.add(labelClassName);
  };

  addCorrectLabel = (element) => {
    this.addLabel(element, 'answers--item-correct');
  };

  addErrorLabel = (element) => {
    this.addLabel(element, 'answers--item-error');
  };

  checkHasLabel = (element) => {
    const parentClassList = element.parentElement.classList;

    return (
      parentClassList.contains('answers--item-correct') ||
      parentClassList.contains('answers--item-error')
    );
  };

  enableNextRoundButtonHandler = () => {
    const { nextRoundButton } = this.elements;
    nextRoundButton.classList.remove('button-disabled');
    nextRoundButton.removeAttribute('disabled');
  };

  disableNextRoundButtonHandler = () => {
    const { nextRoundButton } = this.elements;
    nextRoundButton.classList.add('button-disabled');
    nextRoundButton.setAttribute('disabled', true);
  };

  addNextRoundButtonClickHandler = (nextRoundButtonClickHandler) => {
    this.addHandler({
      element: this.elements.nextRoundButton,
      event: 'click',
      handler: nextRoundButtonClickHandler,
    });
  };

  addAnswersListButtonClickHandler = (answersListButtonClickHandler) => {
    this.addHandler({
      element: this.elements.answersList,
      event: 'click',
      handler: answersListButtonClickHandler,
    });
  };
}

export default new GameView();

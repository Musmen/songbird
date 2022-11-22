import { QUIZ_CATEGORIES, QUIZ_DATA } from './quiz-data/quiz-data';

import {
  FIRST_ROUND,
  MAX_POINTS_PER_ROUND,
  MAX_ROUND,
  WINNER_POINTS,
  DEFAULT_LANGUAGE,
} from '../common/constants';

import { getRandomArrayItem } from '../common/helpers';

import localStorageService from '../services/local-storage.service';

class Model {
  constructor() {
    this.points = null;
    this.attempts = null;
    this.currentRound = null;
    this.quizDataForCurrentRound = null;

    this.correctAnswer = {
      id: null,
      data: null,
    };

    this.isRoundEnd = null;

    this.language = null;
  }

  init = () => {
    this.loadLanguageFromLS();
  };

  loadLanguageFromLS = () => {
    this.language = localStorageService.loadLanguage() || DEFAULT_LANGUAGE;
  };

  saveLanguageToLS = (language) => {
    localStorageService.saveLanguage(language);
  };

  getQuizCategories = (language = this.language) => QUIZ_CATEGORIES[language];

  getQiuzDaraForCurrentLanguage = (language = this.language) =>
    QUIZ_DATA[language].flat(Infinity);

  getAnswersWithIdsForCurrentRound = (
    questionsIndex = this.currentRound - 1,
    language = this.language
  ) =>
    QUIZ_DATA[language][questionsIndex].map(({ id, name }) => ({
      id,
      answer: name,
    }));

  getAnswersForCurrentRound = (
    questionsIndex = this.currentRound - 1,
    language = this.language
  ) => QUIZ_DATA[language][questionsIndex].map(({ name }) => name);

  getQuizDataForCurrentRound = (
    questionsIndex = this.currentRound - 1,
    language = this.language
  ) => QUIZ_DATA[language][questionsIndex];

  getAnswerDataById = (
    answerId,
    questionsIndex = this.currentRound - 1,
    language = this.language
  ) => QUIZ_DATA[language][questionsIndex].find(({ id }) => id === answerId);

  getCorrectAnswerData = (correctId = this.correctAnswer.id) =>
    this.getAnswerDataById(correctId);

  getAudioSrcForQuestion = () => this.correctAnswer.data.audio;

  setQuizDataForCurrentRound = () => {
    this.quizDataForCurrentRound = this.getQuizDataForCurrentRound();
  };

  randomlySelectAnswerId = () => {
    const quizDataForCurrentRoundIdList = this.quizDataForCurrentRound.map(
      ({ id }) => id
    );
    this.correctAnswer.id = getRandomArrayItem(quizDataForCurrentRoundIdList);
  };

  setCurrentRound = (currentRound) => {
    this.currentRound = currentRound;
  };

  setCorrectAnswerData = () => {
    this.correctAnswer.data = this.getCorrectAnswerData();
  };

  checkIsAnswerCorrect = (answerId) => answerId === this.correctAnswer.id;

  updateCurrentRound = (currentRound) => {
    this.startRound();
    this.setCurrentRound(currentRound);
    this.setQuizDataForCurrentRound();
    this.randomlySelectAnswerId();
    this.setCorrectAnswerData();
    this.resetAttempts();
  };

  addPoints = () => {
    this.points += MAX_POINTS_PER_ROUND - this.attempts;
  };

  resetPoints = () => {
    this.points = 0;
  };

  addAttempts = () => {
    this.attempts += 1;
  };

  resetAttempts = () => {
    this.attempts = 0;
  };

  newGame = () => {
    this.updateCurrentRound(FIRST_ROUND);
    this.resetPoints();
  };

  nextRound = () => {
    this.updateCurrentRound(this.currentRound + 1);
  };

  startRound = () => {
    this.isRoundEnd = false;
  };

  finishRound = () => {
    this.isRoundEnd = true;
    this.addPoints();
  };

  checkIsGameEnd = (currentRound = this.currentRound) => {
    if (currentRound === MAX_ROUND) return true;
    return false;
  };

  checkIsWinner = () => {
    if (this.points === WINNER_POINTS) return true;
    return false;
  };

  checkIsRoundEnd = () => this.isRoundEnd;

  setLanguage(language) {
    this.saveLanguageToLS(language);
    this.language = language;
  }
}

export default new Model();

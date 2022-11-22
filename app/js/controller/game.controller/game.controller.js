import gameView from '../../view/game.view/game.view';
import model from '../../model/model';

class GameController {
  constructor() {
    this.gotoResultsPage = null;
  }

  initPage = () => {
    this.newGame();
    this.addHandlers();
  };

  addHandlers = () => {
    gameView.addAnswersListButtonClickHandler(
      this.answersListButtonClickHandler
    );
    gameView.addNextRoundButtonClickHandler(this.nextRoundButtonClickHandler);
  };

  errorTurn = (answerButton) => {
    gameView.playErrorAudio();
    gameView.addErrorLabel(answerButton);
  };

  correctTurn = (answerButton) => {
    gameView.stopQuestionAudio();
    gameView.playCorrectAudio();
    gameView.addCorrectLabel(answerButton);
    model.finishRound();
    this.showAnswer();
    gameView.updateScore(model.points);
    gameView.enableNextRoundButtonHandler();
  };

  turn = (answerId, answerButton) => {
    model.addAttempts();

    if (!model.checkIsAnswerCorrect(answerId)) {
      this.errorTurn(answerButton);
      return;
    }

    this.correctTurn(answerButton);
  };

  answersListButtonClickHandler = ({ target }) => {
    if (!gameView.chekcIsAnswerButton(target)) return;

    const answerId = gameView.getCurrentAnswerId(target);

    const answerData = model.getAnswerDataById(answerId);
    this.showFullCardInformation(answerData);

    if (model.isRoundEnd || gameView.checkHasLabel(target)) return;

    this.turn(answerId, target);
  };

  updateQuestionAudio = () => {
    const questionAudio = model.getAudioSrcForQuestion();
    gameView.updateQuestionAudio(questionAudio);
  };

  prepareRound = () => {
    gameView.disableNextRoundButtonHandler();
    gameView.hideAnswer();
    gameView.renderDefaultDescription(model.language);

    this.updateQuestionAudio();
    this.renderAnswersWithIds();
  };

  newGame = () => {
    model.newGame();
    gameView.updateScore(0);
    this.renderQuizCategories();
    this.prepareRound();
  };

  nextRoundButtonClickHandler = () => {
    if (model.checkIsGameEnd()) {
      this.gotoResultsPage();
      return;
    }

    model.nextRound();
    gameView.updateActiveQuizCategory(model.currentRound);
    this.prepareRound();
  };

  renderQuizCategories = (quizCategories = model.getQuizCategories()) => {
    gameView.renderQuizCategories(quizCategories);
    gameView.addActiveQuizCategory(model.currentRound);
  };

  renderAnswersWithIds = () => {
    const answersWithIds = model.getAnswersWithIdsForCurrentRound();
    gameView.renderAnswersList(answersWithIds);
  };

  updateScore = (score) => {
    gameView.updateScore(score);
  };

  showAnswer = () => {
    const { name, image } = model.correctAnswer.data;
    gameView.showAnswer({ name, image });
  };

  showFullCardInformation = (card) => {
    gameView.renderCardInformation(card, model.language);
  };

  changeLanguage = () => {
    model.setQuizDataForCurrentRound();
    model.setCorrectAnswerData();

    const newQuizCategories = model.getQuizCategories();
    gameView.translateQuizCategories(newQuizCategories);

    const newAnswers = model.getAnswersForCurrentRound();
    gameView.translateAnswersList(newAnswers);

    if (model.checkIsRoundEnd())
      gameView.updateQuestionAnswer(model.correctAnswer.data.name);

    gameView.translateCardInformation(model.quizDataForCurrentRound);
  };
}

export default new GameController();

import resultsView from '../../view/results.view/results.view';
import model from '../../model/model';

class ResultsController {
  constructor() {
    this.gotoGamePage = null;
  }

  initPage = () => {
    if (model.checkIsWinner()) {
      resultsView.renderMaxScoreResults();
      return;
    }

    resultsView.renderScoreResults(model.points);
    resultsView.renderNewGameButton();
    this.addHandlers();
  };

  addHandlers = () => {
    resultsView.addNewGameButtonHandler(this.newGameButtonHandler);
  };

  newGameButtonHandler = () => {
    this.gotoGamePage();
  };
}

export default new ResultsController();

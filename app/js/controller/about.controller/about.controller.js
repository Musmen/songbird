import aboutView from '../../view/about.view/about.view';

class AboutController {
  constructor() {
    this.gotoGamePage = null;
  }

  initPage = () => {
    this.addHandlers();
  };

  addHandlers = () => {
    aboutView.addNewGameButtonHandler(this.newGameButtonHandler);
  };

  newGameButtonHandler = () => {
    this.gotoGamePage();
  };
}

export default new AboutController();

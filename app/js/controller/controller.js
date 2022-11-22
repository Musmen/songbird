import view from '../view/view';
import model from '../model/model';

import aboutView from '../view/about.view/about.view';
import gameView from '../view/game.view/game.view';
import resultsView from '../view/results.view/results.view';
import galleryView from '../view/gallery.view/gallery.view';

import aboutController from './about.controller/about.controller';
import gameController from './game.controller/game.controller';
import resultsController from './results.controller/results.controller';
import galleryController from './gallery.controller/gallery.controller';

const pagesViews = {
  about: aboutView,
  game: gameView,
  results: resultsView,
  gallery: galleryView,
};

const pagesControllers = {
  about: aboutController,
  game: gameController,
  results: resultsController,
  gallery: galleryController,
};

class Controller {
  constructor() {
    this.currentPage = { view: null, controller: null };
  }

  init = () => {
    const { gamePageLink } = view.elements;
    aboutController.gotoGamePage = gamePageLink.click.bind(gamePageLink);
    resultsController.gotoGamePage = gamePageLink.click.bind(gamePageLink);
    gameController.gotoResultsPage = this.gotoResultsPage;

    this.setCurrentPage({ view: aboutView, controller: aboutController });

    this.mountCurrentPage();

    this.addHandlers();
  };

  addHandlers = () => {
    view.addMenuLinkOnClickHandler(this.menuLinkOnClickHandler);
    view.addLanguageSelectOnChangeHandler(this.languageSelectOnChangeHandler);
  };

  setCurrentPage = (newPage) => {
    this.currentPage = newPage;
  };

  mountCurrentPage = (container = view.elements.mainContainer) => {
    this.currentPage.view.init(model.language);
    this.currentPage.view.mount(container);
    this.currentPage.controller.initPage();
  };

  updateCurrentPage = (newPage) => {
    if (this.currentPage.view) this.currentPage.view.unmount();
    this.setCurrentPage(newPage);
    this.mountCurrentPage();
  };

  updateMenuItemsActiveState = (menuItemElement) => {
    view.removeMenuItemsActiveState();
    view.addMenuItemActiveState(menuItemElement);
  };

  menuLinkOnClickHandler = ({ target }) => {
    if (!view.checkIsMenuLink(target) || view.checkIsActiveMenuLink(target))
      return;

    const menuItemElement = target.parentElement;
    this.updateMenuItemsActiveState(menuItemElement);

    const { component } = target.dataset;
    const newPage = {
      view: pagesViews[component],
      controller: pagesControllers[component],
    };
    this.updateCurrentPage(newPage);
  };

  languageSelectOnChangeHandler = ({ target }) => {
    const newLanguage = target.value;
    model.setLanguage(newLanguage);
    view.updateLanguage(newLanguage);

    if (this.currentPage.controller.changeLanguage)
      this.currentPage.controller.changeLanguage(newLanguage);
  };

  gotoResultsPage = () => {
    view.removeMenuItemsActiveState();

    const newPage = {
      view: resultsView,
      controller: resultsController,
    };
    this.updateCurrentPage(newPage);
  };
}

export default new Controller();

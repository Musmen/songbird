import { i18nDictionary } from './i18n-dictionary/i18n-dictionary';

import { BaseView } from '../common/base-classes/base-view';

import { getHeaderTemplate } from './components/header/header';
import { getMainTemplate } from './components/main/main';
import { getFooterTemplate } from './components/footer/footer';

class View extends BaseView {
  constructor() {
    super();

    this.elements = {
      menu: null,
      gamePageLink: null,
      mainContainer: null,
      languageSelect: null,
    };
  }

  init = (language) => {
    this.renderBaseTemplate(language);

    this.elements = {
      menu: document.querySelector('.menu'),
      gamePageLink: document.querySelector('.menu--link-new_game'),
      mainContainer: document.querySelector('.main'),
      languageSelect: document.querySelector('.select-language'),
    };

    super.init();
  };

  renderBaseTemplate = (language) => {
    const headerTemplate = getHeaderTemplate(language);
    const mainTemplate = getMainTemplate();
    const footerTemplate = getFooterTemplate(language);

    document.body.insertAdjacentHTML('afterbegin', headerTemplate);
    document.body.insertAdjacentHTML('beforeend', mainTemplate);
    document.body.insertAdjacentHTML('beforeend', footerTemplate);
  };

  addMenuLinkOnClickHandler = (menuLinkOnClickHandler) => {
    this.addHandler({
      element: this.elements.menu,
      event: 'click',
      handler: menuLinkOnClickHandler,
    });
  };

  addLanguageSelectOnChangeHandler = (languageSelectOnChangeHandler) => {
    this.addHandler({
      element: this.elements.languageSelect,
      event: 'change',
      handler: languageSelectOnChangeHandler,
    });
  };

  setTabindexOnMenuLink = (menuItem, tabindex) => {
    const menuLink = menuItem.querySelector('.menu--link');
    menuLink.setAttribute('tabindex', tabindex);
  };

  allowTabindexOnMenuLink = (menuItem) => {
    this.setTabindexOnMenuLink(menuItem, 0);
  };

  disallowTabindexOnMenuLink = (activeMenuItem) => {
    this.setTabindexOnMenuLink(activeMenuItem, -1);
  };

  removeMenuItemsActiveState = () => {
    const previousActiveMenuItem =
      this.elements.menu.querySelector('.menu--item-active');
    if (!previousActiveMenuItem) return;

    previousActiveMenuItem.classList.remove('menu--item-active');
    this.allowTabindexOnMenuLink(previousActiveMenuItem);
  };

  addMenuItemActiveState = (menuItemElement) => {
    menuItemElement.classList.add('menu--item-active');
    this.disallowTabindexOnMenuLink(menuItemElement);
  };

  checkIsMenuLink = (element) => element.className.includes('menu--link');

  checkIsActiveMenuLink = (element) =>
    element.parentElement.className.includes('menu--item-active');

  updateLanguage(newLanguage) {
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach((element) => {
      const newLanguageDictionary = i18nDictionary[newLanguage];
      const elementDictionaryName = element.dataset.i18n;
      const { content, title, alt } =
        newLanguageDictionary[elementDictionaryName];

      const elementToTranslate = element;
      if (content) elementToTranslate.textContent = content;
      if (title) elementToTranslate.setAttribute('title', title);
      if (alt) elementToTranslate.setAttribute('alt', alt);
    });
  }
}

export default new View();

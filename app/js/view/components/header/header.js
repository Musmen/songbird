import './scss/index.scss';

import { i18nDictionary } from '../../i18n-dictionary/i18n-dictionary';

export const getHeaderTemplate = (language) => {
  const dictionary = i18nDictionary[language];

  return `<header class="header body--header">
    <div class="centralizer header--centralizer">
      <a
        class="link header--link header--logo"
        href="./index.html"
        title="${dictionary.headerLink.title}"
        data-i18n="headerLink"
      >
        <span class="logo--icon"></span>
        <h1 class="logo--title">SongBird</h1>
      </a>

      <nav class="menu header--menu">
        <ul class="list menu--list">
          <li class="list--item menu--item menu--item-active">
            <a
              class="link menu--link"
              href="#"
              title="${dictionary.menuLinkAbout.title}"
              tabindex="-1"
              data-component="about"
              data-i18n="menuLinkAbout"
            >
              ${dictionary.menuLinkAbout.content}
            </a>
          </li>
          <li class="list--item menu--item">
            <a
              class="link menu--link menu--link-new_game"
              href="#"
              title="${dictionary.menuLinkNewGame.title}"
              data-component="game"
              data-i18n="menuLinkNewGame"
            >
              ${dictionary.menuLinkNewGame.content}
            </a>
          </li>
          <li class="list--item menu--item">
            <a
              class="link menu--link"
              href="#"
              title="${dictionary.menuLinkGallery.title}"
              data-component="gallery"
              data-i18n="menuLinkGallery"
            >
              ${dictionary.menuLinkGallery.content}
            </a>
          </li>
        </ul>
      </nav>

      <select
        class="select header--select select-language"
        title="${dictionary.selectLanguage.title}"
        data-i18n="selectLanguage"
      >
        <option value="en" ${language === 'en' ? 'selected' : ''}>en</option>
        <option value="ru" ${language === 'ru' ? 'selected' : ''}>ru</option>
      </select>
    </div>
  </header>`;
};

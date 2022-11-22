import { i18nDictionary } from '../i18n-dictionary/i18n-dictionary';

export const getAboutSectionTemplate = (language) => {
  const dictionary = i18nDictionary[language];

  return `
    <h2 class="title about--title" data-i18n="aboutTitle">
      ${dictionary.aboutTitle.content}
    </h2>
    <p class="paragraph about--paragraph" data-i18n="aboutParagraph">
      ${dictionary.aboutParagraph.content}
    </p>
  `;
};

import { i18nDictionary } from '../i18n-dictionary/i18n-dictionary';

export const getResultsMaxScoreTemplate = (language) => `
  <span class="score--label results--label" data-i18n="resultsLabelMaxPoints">
    ${i18nDictionary[language].resultsLabelMaxPoints.content}
  </span>`;

export const getResultsScoreTemplate = (language, points = 0) => {
  const dictionary = i18nDictionary[language];

  return `
    <span class="score--label results--label">
      <span data-i18n="resultsLabelFirstPart">
        ${dictionary.resultsLabelFirstPart.content}
      </span>
      <span class="score--value results--value">${points}</span>
      <span data-i18n="resultsLabelLastPart">
        ${dictionary.resultsLabelLastPart.content}
      </span>
    </span>`;
};

export const getResultsSectionTemplate = (language) => {
  const dictionary = i18nDictionary[language];

  return `
    <h2 class="visually-hidden" data-i18n="resultsHiddenTitle">
      ${dictionary.resultsHiddenTitle.content}
    </h2>
    <h3 class="title results--title" data-i18n="resultsTitle">
      ${dictionary.resultsTitle.content}
    </h3>
    <p class="paragraph results--score">
      ${getResultsScoreTemplate(language)}
    </p>
  `;
};

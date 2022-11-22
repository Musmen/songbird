import defaultImg from '../../../assets/img/default_image.png';

import { i18nDictionary } from '../i18n-dictionary/i18n-dictionary';

export const getGameTemplate = (language) => {
  const dictionary = i18nDictionary[language];

  return `
    <h2 class="visually-hidden" data-i18n="gameHiddenTitle">
      ${dictionary.gameHiddenTitle.content}
    </h2>
    <header class="questions">
      <ul class="list categories--list">
      </ul>
      <p class="paragraph score">
        <span class="score--label" data-i18n="gameScoreLabel">
          ${dictionary.gameScoreLabel.content}
        </span>
        <span class="score--value">0</span>
      </p>
    </header>
    <div class="wrapper wrapper-flex wrapper-central">
      <section class="question">
        <h3 class="visually-hidden" data-i18n="questionHiddenTitle">
          ${dictionary.questionHiddenTitle.content}
        </h3>
        <div class="wrapper wrapper-flex question--wrapper">
          <figure class="figure question--figure">
            <img class="image question--image" src="${defaultImg}" 
              alt="${dictionary.gameQuestionImage.alt}"
              title="${dictionary.gameQuestionImage.title}"
              data-i18n="gameQuestionImage"
            >
          </figure>
          <div class="wrapper wrapper-flex question--wrapper-inner">
            <p class="answer question--answer">******</p>
            <audio class="audio question--audio" controls>
              <source src="" type="audio/mpeg">
              <span data-i18n="audioNotSupported">
                ${dictionary.audioNotSupported.content}
              </span>
            </audio>
          </div>
        </div>
      </section>
      <section class="answers">
        <h3 class="visually-hidden" data-i18n="answersHiddenTitle">
          ${dictionary.answersHiddenTitle.content}
        </h3>
        <ul class="list answers--list">
        </ul>
      </section>
    </div>
    <aside class="information">
      <p class="paragraph information--paragraph" data-i18n="informationParagraph">
        ${dictionary.informationParagraph.content}
      </p>
    </aside>
  `;
};

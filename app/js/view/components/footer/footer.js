import './scss/index.scss';

import { i18nDictionary } from '../../i18n-dictionary/i18n-dictionary';

export const getFooterTemplate = (language) => {
  const dictionary = i18nDictionary[language];

  return `<footer class="footer body--footer">
    <div class="centralizer footer--centralizer">
      <p class="footer--description footer--description-course">
        <span class="course--year">2022</span>
        <a
          class="link footer--link footer--link-rss_course"
          href="https://rs.school/js/"
          title="${dictionary.footerLinkRssCourse.title}"
          data-i18n="footerLinkRssCourse"
        >
          ${dictionary.footerLinkRssCourse.content}
        </a>
      </p>

      <section class="footer--description footer--description-author">
        <h3 class="author">@Musmen</h3>
        <ul class="socials--list list">
          <li class="socials--item">
            <a
              class="link footer--link socials--link"
              title="${dictionary.socialsLinkGithub.title}"
              href="https://github.com/Musmen"
              data-i18n="socialsLinkGithub"
            >
              <span class="socials--icon socials--icon-github"></span>
            </a>
          </li>
          <li class="socials--item">
            <a
              class="link footer--link socials--link"
              title="${dictionary.socialsLinkTelegram.title}"
              href="https://t.me/IgorMusmen"
              data-i18n="socialsLinkTelegram"
            >
              <span class="socials--icon socials--icon-telegram"></span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </footer>`;
};

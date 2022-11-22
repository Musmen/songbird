import { DIRECTIONS } from './swiper.constants';

export const hideItemAnimationEndHandler = ({ target }) => {
  target.classList.remove('swiper--slide-active', ...DIRECTIONS);
  target.removeEventListener('animationend', hideItemAnimationEndHandler);
};

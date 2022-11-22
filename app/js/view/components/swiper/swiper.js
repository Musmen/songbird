import './scss/swiper.scss';

import { hideItemAnimationEndHandler } from './common/swiper.helpers';

import {
  ALLOWED_MAX_DIST_Y,
  ALLOWED_MIN_DIST_X,
  ALLOWED_TIME,
  DIRECTIONS,
} from './common/swiper.constants';

class Swiper {
  constructor() {
    this.elements = null;

    this.isSwipeEnabled = true;

    this.startSwipeX = 0;
    this.startSwipeY = 0;
    this.distSwipeX = 0;
    this.distSwipeY = 0;
    this.startSwipeTime = 0;

    this.currentSlide = 0;
    this.slidesCollection = null;

    this.showItemAnimationEndHandler =
      this.showItemAnimationEndHandler.bind(this);
    this.surfaceMouseDownHandler = this.surfaceMouseDownHandler.bind(this);
    this.surfaceMouseUpHandler = this.surfaceMouseUpHandler.bind(this);

    this.previousButtonClickHandler =
      this.previousButtonClickHandler.bind(this);
    this.nextButtonClickHandler = this.nextButtonClickHandler.bind(this);

    this.surfaceTouchStartHandler = this.surfaceTouchStartHandler.bind(this);
    this.surfaceTouchMoveHandler = this.surfaceTouchMoveHandler.bind(this);
    this.surfaceTouchEndHandler = this.surfaceTouchEndHandler.bind(this);
  }

  changeCurrentSlide(index) {
    this.currentSlide =
      (index + this.slidesCollection.length) % this.slidesCollection.length;
  }

  nextItem(index) {
    this.hideItem('to-left');
    this.changeCurrentSlide(index + 1);
    this.showItem('from-right');
  }

  previousItem(index) {
    this.hideItem('to-right');
    this.changeCurrentSlide(index - 1);
    this.showItem('from-left');
  }

  hideItem(direction) {
    this.isSwipeEnabled = false;
    this.slidesCollection[this.currentSlide].classList.add(direction);
    this.slidesCollection[this.currentSlide].addEventListener(
      'animationend',
      hideItemAnimationEndHandler
    );
  }

  showItem(direction) {
    this.slidesCollection[this.currentSlide].classList.add(
      'swiper--slide-next',
      direction
    );
    this.slidesCollection[this.currentSlide].addEventListener(
      'animationend',
      this.showItemAnimationEndHandler
    );
  }

  showItemAnimationEndHandler({ target }) {
    target.classList.remove('swiper--slide-next', ...DIRECTIONS);
    target.classList.add('swiper--slide-active');
    this.isSwipeEnabled = true;
    target.removeEventListener(
      'animationend',
      this.showItemAnimationEndHandler
    );
  }

  surfaceMouseDownHandler(event) {
    this.startSwipeX = event.pageX;
    this.startSwipeY = event.pageY;
    this.startSwipeTime = Date.now();
    event.preventDefault();
  }

  surfaceMouseUpHandler(event) {
    this.distSwipeX = event.pageX - this.startSwipeX;
    this.distSwipeY = event.pageY - this.startSwipeY;

    const durationTime = Date.now() - this.startSwipeTime;

    if (
      !this.isSwipeEnabled ||
      durationTime > ALLOWED_TIME ||
      Math.abs(this.distSwipeX) < ALLOWED_MIN_DIST_X ||
      Math.abs(this.distSwipeY) > ALLOWED_MAX_DIST_Y
    )
      return;

    event.preventDefault();

    if (this.distSwipeX > 0) this.previousItem(this.currentSlide);
    else this.nextItem(this.currentSlide);
  }

  surfaceTouchStartHandler(event) {
    const { target } = event;

    if (
      this.isSwipeEnabled &&
      (target.classList.contains('control--wrapper') ||
        target.classList.contains('swiper--control'))
    )
      if (target.classList.contains('swiper--control-left'))
        this.previousItem(this.currentSlide);
      else this.nextItem(this.currentSlide);

    const touchObj = event.changedTouches[0];
    this.startSwipeX = touchObj.pageX;
    this.startSwipeY = touchObj.pageY;
    this.startSwipeTime = Date.now();
  }

  surfaceTouchMoveHandler(event) {
    event.preventDefault();
  }

  surfaceTouchEndHandler(event) {
    const touchObj = event.changedTouches[0];

    this.distSwipeX = touchObj.pageX - this.startSwipeX;
    this.distSwipeY = touchObj.pageY - this.startSwipeY;

    const durationTime = Date.now() - this.startSwipeTime;

    if (
      !this.isSwipeEnabled ||
      durationTime > ALLOWED_TIME ||
      Math.abs(this.distSwipeX) < ALLOWED_MIN_DIST_X ||
      Math.abs(this.distSwipeY) > ALLOWED_MAX_DIST_Y
    )
      return;

    if (this.distSwipeX > 0) this.previousItem(this.currentSlide);
    else this.nextItem(this.currentSlide);
  }

  swipeDetect(surface) {
    surface.addEventListener('mousedown', this.surfaceMouseDownHandler);
    surface.addEventListener('mouseup', this.surfaceMouseUpHandler);

    surface.addEventListener('touchstart', this.surfaceTouchStartHandler);
    surface.addEventListener('touchmove', this.surfaceTouchMoveHandler);
    surface.addEventListener('touchend', this.surfaceTouchEndHandler);
  }

  previousButtonClickHandler() {
    if (this.isSwipeEnabled) this.previousItem(this.currentSlide);
  }

  nextButtonClickHandler() {
    if (this.isSwipeEnabled) this.nextItem(this.currentSlide);
  }

  init() {
    this.slidesCollection = document.querySelectorAll('.swiper--slide');
    this.elements = {
      previousButton: document.querySelector('.swiper--control-left'),
      nextButton: document.querySelector('.swiper--control-right'),
      swiperSurface: document.querySelector('.swiper'),
    };

    this.elements.previousButton.addEventListener(
      'click',
      this.previousButtonClickHandler
    );
    this.elements.nextButton.addEventListener(
      'click',
      this.nextButtonClickHandler
    );
    this.swipeDetect(this.elements.swiperSurface);
  }

  unmount() {
    this.elements.previousButton.removeEventListener(
      'click',
      this.previousButtonClickHandler
    );
    this.elements.nextButton.removeEventListener(
      'click',
      this.nextButtonClickHandler
    );

    this.elements.swiperSurface.removeEventListener(
      'mousedown',
      this.surfaceMouseDownHandler
    );
    this.elements.swiperSurface.removeEventListener(
      'mouseup',
      this.surfaceMouseUpHandler
    );

    this.elements.swiperSurface.removeEventListener(
      'touchstart',
      this.surfaceTouchStartHandler
    );
    this.elements.swiperSurface.removeEventListener(
      'touchmove',
      this.surfaceTouchMoveHandler
    );
    this.elements.swiperSurface.removeEventListener(
      'touchend',
      this.surfaceTouchEndHandler
    );
  }

  render() {
    return `
      <div class="swiper">
        <div class="swiper--container">
        </div>
        <div class="control--wrapper control--wrapper-left">
          <button class="swiper--control swiper--control-left"></button>
        </div>
        <div class="control--wrapper control--wrapper-right">
          <button class="swiper--control swiper--control-right"></button>
        </div>
      </div>`;
  }
}

export default Swiper;

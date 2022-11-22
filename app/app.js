import './styles.scss';

import view from './js/view/view';
import model from './js/model/model';
import controller from './js/controller/controller';

const appInit = () => {
  document.removeEventListener('DOMContentLoaded', appInit);

  model.init();
  view.init(model.language);
  controller.init();
};

document.addEventListener('DOMContentLoaded', appInit);

console.log(
  `Моя самооценка по заданию - 250 баллов.
   Не реализован кастомный аудиоплеер, использовал стандартный html5
   Остальное все реализовано. В галерее есть слайдер/свайпер, который позволяет 
   и на мобильных устройствах или планшетах свайпить слайды`
);

import model from '../../model/model';
import galleryView from '../../view/gallery.view/gallery.view';

class GalleryController {
  initPage = () => {
    const cardsList = model.getQiuzDaraForCurrentLanguage();
    galleryView.renderSlides(cardsList, model.language);
    galleryView.initSwiper();
  };

  changeLanguage = () => {
    const cardsList = model.getQiuzDaraForCurrentLanguage();
    galleryView.translateCardsInformation(cardsList);
  };
}

export default new GalleryController();

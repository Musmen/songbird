import { LOCAL_STORAGE_KEYS } from './common/constants';

class LocalStorageService {
  setLocalStorageData(value, key) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  saveLanguage(language) {
    this.setLocalStorageData(language, LOCAL_STORAGE_KEYS.LANGUAGE);
  }

  loadLanguage() {
    return this.getFromLocalStorage(LOCAL_STORAGE_KEYS.LANGUAGE);
  }
}

export default new LocalStorageService();

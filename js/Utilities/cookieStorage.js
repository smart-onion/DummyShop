import {IStorage} from "./IStorage.js";

class CookieStorage extends IStorage {
  constructor() {
    super();
    const cookies = document.cookie.split(';');
    if (cookies.length > 0 && cookies[0] !== '') {
    for (let cookie of cookies) {
      cookie = cookie.trim();
      let keyValue = cookie.split('=');
      this.storage.set(keyValue[0], JSON.parse(keyValue[1]));
    }
    }
  }
  has(keyValue) {
    return this.storage.has(keyValue);
  }
  get(key){
    return this.storage.get(key);
  }
  set(name, value, days = 1){
    this.storage.set(name, value);
    value = JSON.stringify(value);
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  }
}

export const cookies = new CookieStorage();

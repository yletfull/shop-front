import { makeAutoObservable } from 'mobx';

class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._card = [];
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  setCard(card) {
    this._card = card;
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get card() {
    return this._card;
  }
}

export default new UserStore();

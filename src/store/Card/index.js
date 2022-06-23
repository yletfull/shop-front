import { makeAutoObservable, toJS } from 'mobx';

class CardStore {
  constructor() {
    this._card = [];
    makeAutoObservable(this);
  }

  setCard(card) {
    this._card = card;
  }

  get card() {
    return toJS(this._card);
  }
}

export default new CardStore();

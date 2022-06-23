import { makeAutoObservable } from 'mobx';

class CardStore {
  constructor() {
    this._card = [];
    makeAutoObservable(this);
  }

  setCard(card) {
    this._card = card;
  }

  get card() {
    return this._card;
  }
}

export default new CardStore();

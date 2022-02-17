import { toJS, makeAutoObservable } from 'mobx';

class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._ratings = [];
    this._devices = [];
    this._selectedType = '';
    this._selectedBrands = [];
    this._selectedRating = '';
    this._selectedPrice = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 6;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setRatings(ratings) {
    this._ratings = ratings;
  }
  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedBrands(brands) {
    this.setPage(1);
    this._selectedBrands = brands;
  }
  setSelectedRating(rating) {
    this.setPage(1);
    this._selectedRating = rating;
  }
  setSelectedPrice(price) {
    this.setPage(1);
    this._selectedPrice = price;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setLimit(limit) {
    this._limit = limit;
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get ratings() {
    return toJS(this._ratings);
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return toJS(this._selectedType);
  }
  get selectedBrands() {
    return toJS(this._selectedBrands);
  }
  get selectedRating() {
    return toJS(this._selectedRating);
  }
  get selectedPrice() {
    return toJS(this._selectedPrice);
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}


export default new DeviceStore();

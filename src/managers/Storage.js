import * as PIXI from 'pixi.js';

export default class Store {
  constructor(world) {

  }
  set(name, val) {
    localStorage.setItem(name, JSON.stringify(val));
  }
  get(name) {
    return JSON.parse(localStorage.getItem(name));
  }
}

import * as PIXI from 'pixi.js';

export default class Store {
  constructor(world) {

  }
  set(name, val) {
    localStorage.setItem(name, val);
  }
  get(name) {
    return localStorage.getItem(name);
  }
}

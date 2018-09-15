import * as PIXI from 'pixi.js';
import Scenes from './managers/Scenes'
import Storage from './managers/Storage'

export default class World extends PIXI.Application {
  constructor() {
    super({
      backgroundColor: 0xCCCCCC,
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(this.view);

    this.scenes = new Scenes(this);
    this.storage = new Storage(this);
    this.ticker.add(() => this.update());
  }
  update() {
    this.scenes.update();
  }
}

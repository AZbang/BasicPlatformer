import * as PIXI from 'pixi.js';
import Scenes from './managers/Scenes'

export default class World extends PIXI.Application {
  constructor() {
    super({
      background: 0xCCCCCC,
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(this.view);

    this.scenes = new Scenes(this);
    this.ticker.add(() => this.update());
  }
  update() {
    this.scenes.update();
  }
}

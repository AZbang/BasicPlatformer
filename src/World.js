import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';

import Scenes from './managers/Scenes'
import Storage from './managers/Storage'

export default class World extends PIXI.Application {
  constructor() {
    super({
      backgroundColor: 0xCCCCCC,
      width: window.innerWidth,
      height: window.innerHeight,
      roundPixels: true
    });
    document.body.appendChild(this.view);
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    this.scenes = new Scenes(this);
    this.storage = new Storage(this);
    this.ticker.add((dt) => this.update(dt));
  }
  update(dt) {
    this.scenes.update(dt);
    TWEEN.update();
  }
}

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

    this.resolution = null;
    this.w = 1920;
    this.h = 700;

    this.scenes = new Scenes(this);
    this.storage = new Storage(this);
    this.ticker.add((dt) => this.update(dt));
    this.resize();
    this._bindEvents();
  }
  _bindEvents() {
    window.addEventListener('resize', () => this.resize(this));
  }
  resize() {
    this.resolution = window.innerWidth/this.w;
    this.renderer.resize(window.innerWidth, this.h*this.resolution);
    this.view.style.marginTop = window.innerHeight/2-this.h*this.resolution/2 + 'px';
    this.stage.scale.set(this.resolution);
  }
  update(dt) {
    this.scenes.update(dt);
    TWEEN.update();
  }
}

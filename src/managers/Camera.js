import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';

export default class Camera extends PIXI.Container {
  constructor(world) {
    super();
    this.position.set(world.screen.width/2, world.screen.height/2);
  }
  setPosition(point) {
    this.pivot.set(point.x, point.y);
  }

  zoom(scale, time) {
    new TWEEN.Tween(this.scale)
      .to({x: scale, y: scale}, time)
      .start();
  }
}

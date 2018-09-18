import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';

export default class Camera extends PIXI.Container {
  constructor(scene) {
    super();
    this.position.set(scene.world.screen.width/2, scene.world.screen.height/2);
  }
  fallow(obj) {
    this.pivot.set(obj.x+obj.width/2, obj.y);
  }
  zoom(scale, time) {
    if(this.scale.x === scale) return;
    new TWEEN.Tween(this.scale)
      .to({x: scale, y: scale}, time)
      .start();
  }
  update(dt) {

  }
}

import * as PIXI from 'pixi.js';
import AnimationController from '../managers/AnimationController';

export default class GraphicSprite extends AnimationController {
  constructor(map, data) {
    super();

    this.map = map;
    data.frames && this.addAnimation('default', {images: data.frames, speed: data.animationSpeed}, true);

    this.anchor.set(.5);
    this.scale.set(1);
    this.x = data.x || 0;
    this.y = data.y || 0;
    this.width = data.width || 0;
    this.height = data.height || 0;
    this.rotation = data.rotation * PIXI.DEG_TO_RAD;
    this.alpha = data.alpha != null ? data.alpha : 1;

    if(data.collider) this.collider = new PIXI.Rectangle(data.collider.x, data.collider.y, data.collider.width, this.height);
    else this.collider = new PIXI.Rectangle(0, 0, this.width, this.height);
  }
  getColliderBounds() {
    return {
      x: this.x-this.width/2+this.collider.x,
      y: this.y-this.height/2+this.collider.y,
      width: this.collider.width,
      height: this.collider.height
    }
  }
}

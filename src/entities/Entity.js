import * as PIXI from 'pixi.js';
import utils from '../utils';

export default class Entity extends PIXI.Sprite {
  constructor(manager, x, y, w, h, properties) {
    super(PIXI.Texture.WHITE);
    Object.assign(this, properties);

    this.manager = manager;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.dx = 0;
    this.dy = 0;
  }
  update(dt) {
    this.x += this.dx;
    this.y += this.dy;

    for(let i = 0; i < this.manager.objects.length; i++) {
      let obj = this.manager.objects[i];
      if(utils.checkRectsCollision(this, obj)) {
        switch (obj.name) {
          case 'solid':

            break;
          case 'jump':

            break;
          case 'slopeRight':

            break;
          case 'slopeLeft':

            break;
        }
        this.onCollide(obj);
      }
    }
    this.updateBehavior(dt);
  }
}

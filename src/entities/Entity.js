import * as PIXI from 'pixi.js';
import utils from '../utils';

export default class Entity extends PIXI.Sprite {
  constructor(manager, x, y, props) {
    super(PIXI.Texture.WHITE);
    Object.assign(this, props);

    this.manager = manager;
    this.x = x;
    this.y = y;

    this.isGround = false;
    this.dx = 0;
    this.dy = 0;
  }
  update(dt) {
    this.dy += this.manager.level.gravity*dt;

    this.x += this.dx*dt;
    this.checkCollision(0);

    this.y += this.dy*dt;
    this.checkCollision(1);

    this.updateBehavior(dt);
  }
  checkCollision(dir) {
    for(let i = 0; i < this.manager.objects.length; i++) {
      let obj = this.manager.objects[i];
      if(obj.name === this.name) continue;
      if(utils.checkRectsCollision(this, obj)) {
        switch(obj.name) {
          case 'solid':
            if(this.dy > 0 && dir) {
              this.y = obj.top-this.height;
              this.isGround = true;
              this.dy = 0;
            } else if(this.dy < 0 && dir) {
              this.y = obj.bottom;
              this.dy = 0;
            }
            if(this.dx < 0 && !dir) {
              this.x = obj.right;
              this.dx = 0;
            } else if(this.dx > 0 && !dir) {
              this.x = obj.left-this.width;
              this.dx = 0;
            }
            break;
          case 'jump':
            if(this.isGround) this.dy = -10;
            break;
          case 'slopeRight':

            break;
          case 'slopeLeft':

            break;
        }
        this.onCollide(obj, dir);
      }
    }
  }
}

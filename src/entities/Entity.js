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
    this.checkCollisionAreas(0);

    this.y += this.dy*dt;
    this.checkCollisionAreas(1);
    this.checkCollisionEntities();
    this.updateBehavior(dt);
  }
  checkCollisionEntities() {
    for(let i = 0; i < this.manager.children.length; i++) {
      let entity = this.manager.children[i];
      if(entity.name === this.name) continue;
      if(utils.checkRectsCollision(this, entity)) this.onCollide(entity);
    }
  }
  checkCollisionAreas(dir) {
    for(let i = 0; i < this.manager.objects.length; i++) {
      let obj = this.manager.objects[i];
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
            if(this.isGround) this.dy = -45;
            break;
          case 'slopeRight':
            let dtX = obj.x-(this.x+this.width);
            let dtY = Math.abs(obj.height*dtX/obj.width);
            if(this.y > obj.y+obj.height-dtY-this.height)
              this.y = obj.y+obj.height-dtY-this.height;
            break;
          case 'slopeLeft':

            break;
        }
        this.onCollide(obj, dir);
      }
    }
  }
}

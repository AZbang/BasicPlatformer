import * as PIXI from 'pixi.js';
import utils from '../utils';
import AnimationController from '../managers/AnimationController';

export default class Entity extends AnimationController {
  constructor(manager, x, y, props) {
    super();
    Object.assign(this, props);

    this.manager = manager;
    this.anchor.set(.5);
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;

    // flags
    this.isSolid = true;
    this.isDead = false;
    this.isCollision = true;
    this.isGround = false;
  }
  updateEntity(dt) {
    this.dy += this.manager.level.gravity*dt;

    this.x += this.dx*dt;
    this.isCollision && this.checkCollisionAreas(0);

    this.y += this.dy*dt;
    this.isCollision && this.checkCollisionAreas(1);
    this.isCollision && this.checkCollisionEntities();
    this.updateBehavior(dt);
  }
  getCollisionBounds() {
    return {
      x: this.x-this.width/2+this.collisionArea.x,
      y: this.y-this.height/2+this.collisionArea.y,
      width: this.collisionArea.width,
      height: this.collisionArea.height
    }
  }
  checkCollisionEntities() {
    for(let i = 0; i < this.manager.children.length; i++) {
      let entity = this.manager.children[i];
      if(entity.name === this.name) continue;
      if(utils.checkRectsCollision(this.getCollisionBounds(), entity.getCollisionBounds())) this.onCollide(entity);
    }
  }
  checkCollisionAreas(dir) {
    for(let i = 0; i < this.manager.objects.length; i++) {
      let obj = this.manager.objects[i];
      let rectEntity = this.getCollisionBounds();
      if(utils.checkRectsCollision(rectEntity, obj)) {
        if(obj.name === 'solid' && this.isSolid) {
          this.rotation = 0;
          if(this.dy > 0 && dir) {
            this.y = obj.top-this.collisionArea.height+this.height/2;
            this.isGround = true;
            this.dy = 0;
          } else if(this.dy < 0 && dir) {
            this.y = obj.bottom+this.collisionArea.y+this.height/2;
            this.dy = 0;
          }
          if(this.dx < 0 && !dir) {
            this.x = obj.right-this.collisionArea.x+this.width/2;
            this.dx = 0;
          } else if(this.dx > 0 && !dir) {
            this.x = obj.left-this.collisionArea.width-this.collisionArea.x+this.width/2;
            this.dx = 0;
          }
        }
        else if(obj.name === 'slopeRight' && this.isSolid) {
          let dtX = Math.abs(obj.x-(rectEntity.x+this.collisionArea.width));
          let dtY = obj.height*dtX/obj.width;
          if(rectEntity.y > obj.y+obj.height-dtY-this.collisionArea.height) {
            this.y = obj.y+obj.height-dtY-this.collisionArea.height+this.height/2;
            this.isGround = true;
            // this.rotation = PIXI.DEG_TO_RAD*-20;
            this.dy = 0;
          }
        }
        else if(obj.name === 'slopeLeft' && this.isSolid) {
          let dtX = Math.abs(obj.x-(rectEntity.x+this.collisionArea.width));
          let dtY = obj.height*dtX/obj.width;
          if(rectEntity.y > obj.y+dtY-this.collisionArea.height-20) {
            this.y = obj.y+dtY-this.collisionArea.height+this.height/2-20;
            this.isGround = true;
            // this.rotation = PIXI.DEG_TO_RAD*20;
            this.dy = 0;
          }
          break;
        }
        else if(obj.name === 'jump') {
          if(this.isGround) this.dy = -45;
        }
        this.onCollide(obj, dir);
      }
    }
  }
}

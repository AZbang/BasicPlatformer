import * as PIXI from 'pixi.js';
import utils from '../utils';
import GraphicSprite from './GraphicSprite';

export default class Entity extends GraphicSprite {
  constructor(map, data) {
    super(map, data);

    this.dx = 0;
    this.dy = 0;

    // flags
    this.isSolid = true;
    this.isDead = false;
    this.isGravity = true;
    this.isGround = false;
    this.isCollision = true;
  }
  updateEntity(dt) {
    if(this.isGravity) this.dy += this.map.gravity*dt;

    this.x += this.dx*dt;
    this.isCollision && this.checkCollisionAreas(0);

    this.y += this.dy*dt;
    this.isCollision && this.checkCollisionAreas(1);
    this.isCollision && this.checkCollisionEntities();
    this.updateBehavior(dt);
  }
  checkCollisionEntities() {
    for(let i = 0; i < this.map.entities.length; i++) {
      let entity = this.map.entities[i];
      if(entity.name === this.name) continue;
      if(utils.checkRectsCollision(this.getColliderBounds(), entity.getColliderBounds())) this.onCollide(entity);
    }
  }
  checkCollisionAreas(dir) {
    for(let i = 0; i < this.map.areas.length; i++) {
      let obj = this.map.areas[i];
      let rectEntity = this.getColliderBounds();

      if(utils.checkRectsCollision(rectEntity, obj)) {
        // check collision with Y
        if(obj.name === 'solid' && this.isSolid) {
          if(this.dy > 0 && dir) {
            this.y = obj.top-this.collider.height+this.height/2;
            this.isGround = true;
            this.dy = 0;
          } else if(this.dy < 0 && dir) {
            this.y = obj.bottom+this.collider.y+this.height/2;
            this.dy = 0;
          }

          // check collision with X
          if(this.dx < 0 && !dir) {
            this.x = obj.right-this.collider.x+this.width/2;
            this.dx = 0;
          } else if(this.dx > 0 && !dir) {
            this.x = obj.left-this.collider.width-this.collider.x+this.width/2;
            this.dx = 0;
          }
        }

        if(obj.name === 'platform' && this.isSolid) {
          if(this.dy > 0 && dir && rectEntity.y+rectEntity.height/2 < obj.y) {
            this.y = obj.top-this.collider.height+this.height/2;
            this.isGround = true;
            this.dy = 0;
          }
        }

        else if(obj.name === 'slopeRight' && this.isSolid) {
          let dtX = Math.abs(obj.x-(rectEntity.x+this.collider.width));
          let dtY = obj.height*dtX/obj.width;
          if(rectEntity.y > obj.y+obj.height-dtY-this.collider.height) {
            this.y = obj.y+obj.height-dtY-this.collider.height+this.height/2;
            this.isGround = true;
            this.dy = 0;
          }
        }

        else if(obj.name === 'slopeLeft' && this.isSolid) {
          let dtX = Math.abs(obj.x-(rectEntity.x+this.collider.width));
          let dtY = obj.height*dtX/obj.width;
          if(rectEntity.y > obj.y+dtY-this.collider.height-20) {
            this.y = obj.y+dtY-this.collider.height+this.height/2-20;
            this.isGround = true;
            this.dy = 0;
          }
        }

        this.onCollide(obj, dir);
      }
    }
  }
}

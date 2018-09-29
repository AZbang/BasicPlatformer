import * as PIXI from 'pixi.js';
import utils from '../utils';
import GraphicSprite from './GraphicSprite';

export default class Entity extends GraphicSprite {
  constructor(map, data) {
    super(map, data);

    this.dx = 0;
    this.dy = 0;
    this.y -= this.height;

    this.name = data.name;
    // flags
    this.isSolid = true;
    this.isDead = false;
    this.isGravity = true;
    this.isGround = false;
    this.isCollision = true;

    if(data.collider) {
      this.body = new PIXI.Rectangle(data.x, data.y, data.collider.width, data.collider.height);
      this.offsetBody = new PIXI.Point(data.collider.x, data.collider.y);
    } else {
      this.body = new PIXI.Rectangle(this.x, this.y, this.width, this.height);
      this.offsetBody = new PIXI.Point(0, 0);
    }
  }
  updateEntity(dt) {
    if(this.isGravity) this.dy += this.map.gravity*dt;

    this.body.x += this.dx*dt;
    this.isCollision && this.checkCollisionAreas(0);

    this.body.y += this.dy*dt;
    this.isCollision && this.checkCollisionAreas(1);
    this.isCollision && this.checkCollisionEntities();
    this.updateBehavior(dt);

    this.x = Math.round(this.body.x)-this.offsetBody.x+this.width/2;
    this.y = Math.round(this.body.y)-this.offsetBody.y+this.height/2;
  }
  checkCollisionEntities() {
    for(let i = 0; i < this.map.entities.length; i++) {
      let entity = this.map.entities[i];
      if(entity.name === this.name) continue;
      if(utils.checkRectsCollision(this.body, entity.body)) this.onCollide(entity);
    }
  }
  checkCollisionAreas(dir) {
    for(let i = 0; i < this.map.areas.length; i++) {
      let obj = this.map.areas[i];

      if(utils.checkRectsCollision(this.body, obj)) {
        // check collision with Y
        if(obj.name === 'solid' && this.isSolid) {
          if(this.dy > 0 && dir) {
            this.body.y = obj.top-this.body.height;
            this.isGround = true;
            this.dy = 0;
          } else if(this.dy < 0 && dir) {
            this.body.y = obj.bottom;
            this.dy = 0;
          }

          // check collision with X
          if(this.dx < 0 && !dir) {
            this.body.x = obj.right;
            this.dx = 0;
          } else if(this.dx > 0 && !dir) {
            this.body.x = obj.left-this.body.width;
            this.dx = 0;
          }
        }

        if(obj.name === 'platform' && this.isSolid) {
          if(this.dy > 0 && dir && this.body.y+this.body.height/2 < obj.y) {
            this.body.y = obj.top-this.body.height;
            this.isGround = true;
            this.dy = 0;
          }
        }

        else if(obj.name === 'slopeRight' && this.isSolid) {
          let dtX = Math.abs(obj.x-(this.body.x+this.body.width));
          let dtY = obj.height*dtX/obj.width;
          if(this.body.y > obj.y+obj.height-dtY-this.body.height) {
            this.body.y = obj.y+obj.height-dtY-this.body.height;
            this.isGround = true;
            this.dy = 0;
          }
        }

        else if(obj.name === 'slopeLeft' && this.isSolid) {
          let dtX = Math.abs(obj.x-(this.body.x+this.body.width));
          let dtY = obj.height*dtX/obj.width;
          if(this.body.y > obj.y+dtY-this.body.height-20) {
            this.body.y = obj.y+dtY-this.body.height-20;
            this.isGround = true;
            this.dy = 0;
          }
        }

        this.onCollide(obj, dir);
      }
    }
  }
}

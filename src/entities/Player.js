import Entity from './Entity'
import key from '../utils/keymaster'

export default class Player extends Entity {
  constructor(manager, x, y, properties) {
    super(manager, x, y, properties);

    this.addAnimation('walk', {
      images: ['alienPink_walk1.png', 'alienPink_walk2.png'],
      speed: .1
    });
    this.addAnimation('jump', {
      images: ['alienPink_jump.png'],
      speed: .1
    });
    this.addAnimation('stand', {
      images: ['alienPink_stand.png'],
      speed: .1
    });
    this.addAnimation('hit', {
      images: ['alienPink_hit.png'],
      speed: 1,
    });
    this.setAnimation('stand');

    this.STATE = 'stand';

    this.collisionArea = new PIXI.Rectangle(40, 0, this.width-80, this.height);
  }
  updateBehavior() {
    // state machine
    if(this.STATE === 'stand') this.setAnimation('stand');
    else if(this.STATE === 'walk') this.setAnimation('walk');
    else if(this.STATE === 'jump') this.setAnimation('jump');
    else if(this.STATE === 'hit') this.setAnimation('hit');

    if(this.isDead) return;

    this.manager.level.camera.fallow(this);
    if(key.isPressed('d')) {
      this.dx = 10;
      this.STATE = 'walk';
      this.scale.x = 1;
    } else if(key.isPressed('a')) {
      this.dx = -10;
      this.STATE = 'walk';
      this.scale.x = -1;
    } else {
      this.STATE = 'stand';
      this.dx = 0;
    }
    if(key.isPressed('w') && this.isGround) {
      this.dy = -24;
      this.isGround = false;
    }
    if(!this.isGround) this.STATE = 'jump';
  }
  onCollide(obj) {
    if(obj.name === 'slime' || obj.name === 'dead') {
      this.STATE = 'hit';
      this.isCollision = false;
      this.isDead = true;
      this.dy = -10;
      this.manager.level.restart();
    }

    if(obj.name === 'exit') this.manager.level.complete();
    if(obj.name === 'zoomCamera') {
      this.manager.level.camera.zoom(obj.zoom, 400);
      this.manager.removeArea(obj);
    }
  }
}

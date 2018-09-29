import Entity from './Entity'
import key from '../utils/keymaster'

export default class Player extends Entity {
  constructor(map, data) {
    super(map, data);

    this.addAnimation('walk', {
      images: ['alienPink_walk1.png', 'alienPink_walk2.png'],
      speed: .1
    });
    this.addAnimation('climb', {
      images: ['alienPink_climb1.png', 'alienPink_climb2.png'],
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
  }
  updateBehavior() {
    // state machine
    if(this.STATE === 'stand') this.setAnimation('stand');
    else if(this.STATE === 'walk') this.setAnimation('walk');
    else if(this.STATE === 'jump') this.setAnimation('jump');
    else if(this.STATE === 'climb') this.setAnimation('climb');
    else if(this.STATE === 'hit') return this.setAnimation('hit');

    this.map.camera.setPosition(this);

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

    if(this.isLadderCollide) {
      this.isGravity = false;
      if(key.isPressed('w')) {
        this.dy = -10;
        this.STATE = 'climb'
      } else if(key.isPressed('s')) {
        this.dy = 10;
        this.STATE = 'climb'
      } else {
        this.dy = 0;
      }
    } else this.isGravity = true;

    if(key.isPressed('w') && this.isGround && !this.isLadderCollide) {
      this.dy = -24;
      this.isGround = false;
    }
    if(!this.isGround && !this.isLadderCollide) this.STATE = 'jump';
  }
  dead() {
    this.STATE = 'hit';
    this.isCollision = false;
    this.isDead = true;
    this.dy = -10;
    this.map.restartLevel();
  }
  onCollide(obj) {
    if(obj.name === 'dead') this.dead();

    if(obj.name === 'jump') {
      if(this.isGround) this.dy = -45;
    }

    if(obj.name === 'exit') this.map.completeLevel();
    if(obj.name === 'zoomCamera') {
      this.map.camera.zoom(obj.zoom, 400);
      this.map.removeArea(obj);
    }
  }
}

import Entity from './Entity'

export default class Slime extends Entity {
  constructor(map, data) {
    super(map, data);

    this.addAnimation('walk', {
      images: ['bee.png', 'bee_move.png'],
      speed: .1
    });
    this.setAnimation('walk');

    this.isGravity = false;
    this.speed = data.properties.speed || 3;
    this.dir = data.properties.dir || -1;
    this.path = data.properties.path*128 || 3*128;
    this._move = 0;
    this._i = 0;
  }
  updateBehavior(dt) {
    this.dx = this.dir*this.speed;
    this._i += .1;
    this.body.y += Math.sin(this._i);

    if(this._move >= this.path) {
      this._move = 0;
      this.dir *= -1;
      this.scale.x *= -1;
    } else this._move += Math.abs(this.dx);
  }
  onCollide(obj) {
    if(obj.name === 'dead') this.map.removeEntity(this);
    if(obj.name === 'player') obj.dead();
  }
}

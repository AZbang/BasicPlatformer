import Entity from './Entity'

export default class Slime extends Entity {
  constructor(map, data) {
    super(map, data);

    this.addAnimation('walk', {
      images: ['slimeGreen.png', 'slimeGreen_move.png'],
      speed: .1
    });
    this.setAnimation('walk');

    this.speed = data.properties.speed || 3;
    this.dir = data.properties.dir || -1;
    this.path = data.properties.path*128 || 3*128;
    this._move = 0;
  }
  updateBehavior(dt) {
    this.dx = this.dir*this.speed;

    if(this._move >= this.path) {
      this._move = 0;
      this.scale.x *= -1;
      this.dir *= -1;
    } else this._move += Math.abs(this.dx);
  }
  onCollide(obj) {
    if(obj.name === 'dead') this.map.removeEntity(this);
    if(obj.name === 'player') obj.dead();
  }
}

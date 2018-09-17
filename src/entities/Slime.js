import Entity from './Entity'

export default class Slime extends Entity {
  constructor(manager, x, y, w, h, properties) {
    super(manager, x, y, w, h, properties);
    this.texture = PIXI.Texture.fromFrame('slimeGreen.png');

  }
  updateBehavior(dt) {
    if(this.isGround) this.dx = 3;
    else this.dx = 0;
  }
  onCollide(obj) {
    if(obj.name === 'edge') {
      this.dx = -this.dx;
      this.scale.x *= -1;
    }
    if(obj.name === 'dead') {
      this.manager.removeEntity(this);
    }
  }
}

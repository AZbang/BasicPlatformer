import Entity from './Entity'

export default class Slime extends Entity {
  constructor(manager, x, y, w, h, properties) {
    super(manager, x, y, w, h, properties);
    this.texture = PIXI.Texture.fromFrame('slimeGreen.png');

    this.collisionArea = new PIXI.Rectangle(0, 0, this.width, this.height);
    this.dir = -3;
  }
  updateBehavior(dt) {
    if(this.isGround) this.dx = this.dir;
    else this.dx = 0;
  }
  onCollide(obj) {
    if(obj.name === 'edgeLeft') {
      this.dir = 3;
      this.scale.x = -1;
    } else if(obj.name === 'edgeRight') {
      this.dir = -3;
      this.scale.x = 1;
    }
    if(obj.name === 'dead') this.manager.removeEntity(this);
  }
}

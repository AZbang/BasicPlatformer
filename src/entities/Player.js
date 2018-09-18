import Entity from './Entity'
import key from '../utils/keymaster'

export default class Player extends Entity {
  constructor(manager, x, y, properties) {
    super(manager, x, y, properties);
    this.texture = PIXI.Texture.fromFrame('alienPink_front.png');

    this.collisionArea = new PIXI.Rectangle(40, 0, this.width-80, this.height);
    this.manager.level.camera.zoom(.5);
  }
  updateBehavior() {
    if(key.isPressed('d')) this.dx = 10;
    else if(key.isPressed('a')) this.dx = -10;
    else this.dx = 0;

    if(key.isPressed('w') && this.isGround) {
      this.dy = -24;
      this.isGround = false;
    }
    this.manager.level.camera.fallow(this);
  }
  onCollide(obj) {
    if(obj.name === 'slime' || obj.name === 'dead') this.manager.level.restart();
    if(obj.name === 'exit') this.manager.level.complete();
  }
}

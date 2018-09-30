import Entity from './Entity'

export default class Jumper extends Entity {
  constructor(map, data) {
    super(map, data);

    this.gotoAndStop(0);
    this.power = data.properties.power || 45;
  }
  updateBehavior() {

  }
  onCollide(obj) {
    if(obj.name === 'player' && !obj.isGround) {
      obj.dy = -this.power;
    }
  }
}

import Entity from './Entity'

export default class Coin extends Entity {
  constructor(map, data) {
    super(map, data);

    this.isGravity = false;
    this.score = data.properties.score;
    this._i = 0;
  }
  updateBehavior(dt) {
    this._i += .1;
    this.y += Math.sin(this._i);
  }
  onCollide(obj) {
    if(obj.name === 'player') {
      obj.addScore(this.score);
      this.map.removeEntity(this);
    }
  }
}

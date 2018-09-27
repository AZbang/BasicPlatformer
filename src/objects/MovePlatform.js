import Entity from './Entity'

export default class MovePlatform extends Entity {
  constructor(map, data) {
    super(map, data);

    this.isGravity = false;
    this.speedX = data.properties.speedX || 5;
    this.speedY = data.properties.speedY || 5;
    this.dirX = data.properties.dirX || 0;
    this.dirY = data.properties.dirY || 0;
  }
  updateBehavior(dt) {
    this.dx = this.dirX*this.speedX;
    this.dy = this.dirY*this.speedY;
  }
  onCollide(name, dir) {
    if(name === 'solid' && !dir) this.dirX *= -1;
    if(name === 'solid' && dir) this.dirY *= -1;
  }
}

import * as PIXI from 'pixi.js';

export default class Camera extends PIXI.Container {
  constructor(scene) {
    super();
    this.position.set(scene.world.screen.width/2, scene.world.screen.height/2);
  }
  fallow(entity) {
    this.pivot.copy(entity.position);
  }
  update(dt) {

  }
}

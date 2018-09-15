import * as PIXI from 'pixi.js';
import scenes from '../scenes'

export default class Scenes extends PIXI.Container {
  constructor(world) {
    super();
    this.world = world;
    this.world.stage.addChild(this);

    this.currentScene = null;
  }
  set(name) {
    if(!scenes[name]) throw Error('Scene' + name + ' is not defined');

    this.removeChild(this.currentScene);
    this.currentScene = new scenes[name](this);
    this.addChild(this.currentScene);
  }
  update(dt) {
    this.currentScene && this.currentScene.update(dt);
  }
}

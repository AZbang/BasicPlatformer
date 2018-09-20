import * as PIXI from 'pixi.js';
import scenes from '../scenes'
import TWEEN from '@tweenjs/tween.js';

export default class Scenes extends PIXI.Container {
  constructor(world) {
    super();
    this.world = world;
    this.world.stage.addChild(this);

    this.grph = new PIXI.Graphics();
    this.grph.alpha = 0;
    this.world.stage.addChild(this.grph);

    this.currentScene = null;
  }
  splash(color, time, onShow, onHide) {
    this.grph.beginFill(color);
    this.grph.drawRect(0, 0, this.world.screen.width, this.world.screen.height);
    let tweenShow = new TWEEN.Tween(this.grph)
      .to({alpha: 1}, time/2)
      .onComplete(() => onShow && onShow())
      .start();
    let tweenHide = new TWEEN.Tween(this.grph)
    	.to({alpha: 0}, time/2)
      .onComplete(() => onHide && onHide())
    	.start();
    tweenShow.chain(tweenHide);
  }
  set(name, props) {
    if(!scenes[name]) throw Error('Scene' + name + ' is not defined');

    this.removeChild(this.currentScene);
    this.currentScene = new scenes[name](this, props);
    this.addChildAt(this.currentScene, 0);
  }
  update(dt) {
    this.currentScene && this.currentScene.update(dt);
  }
}

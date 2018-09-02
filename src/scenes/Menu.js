import * as PIXI from 'pixi.js';

export default class Menu extends PIXI.Container {
  constructor(scenes) {
    super();

    this.label = new PIXI.Text('Hello World!', {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
    this.label.anchor.set(.5);
    this.label.x = scenes.world.screen.width/2;
    this.label.y = scenes.world.screen.height/2;
    this.label.interactive = true;
    this.label.cursor = 'pointer';
    this.label.pointertap = () => {
      scenes.set('playground');
    }
    this.addChild(this.label);
  }
  update() {

  }
}

import * as PIXI from 'pixi.js';
import TiledMap from '../managers/TiledMap'

export default class Menu extends TiledMap {
  constructor(world) {
    super(world, PIXI.loader.resources['menu'].data, PIXI.loader.resources['tileset'].data);

    this.world = world;

    this.label = new PIXI.Text('START GAME!', {
      fontFamily: 'Bebas Neue',
      fontSize: 72,
      fill: 0xff1010,
      align: 'center'
    });
    this.label.anchor.set(.5);
    this.label.x = this.world.screen.width/2;
    this.label.y = 300;
    this.label.interactive = true;
    this.label.cursor = 'pointer';
    this.label.pointertap = () => {
      this.world.scenes.set('playground', this.world.storage.get('level'));
    }
    this.addChild(this.label);

    this.camera.setPosition({x: this.world.screen.width, y: this.world.screen.height-200});
    this.camera.zoom(.8, 1000);
  }
}

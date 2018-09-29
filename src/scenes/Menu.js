import * as PIXI from 'pixi.js';
import TiledMap from '../managers/TiledMap'

export default class Menu extends TiledMap {
  constructor(world) {
    super(world, PIXI.loader.resources['menu'].data, PIXI.loader.resources['tileset'].data);

    this.world = world;

    this.label = new PIXI.Text('START GAME!', {
      fontFamily: 'Comic Sans MS',
      fontSize: 42,
      fill: 0x000000,
      align: 'center'
    });
    this.label.anchor.set(.5);
    this.label.x = this.world.w/2;
    this.label.y = 400;
    this.label.interactive = true;
    this.label.cursor = 'pointer';
    this.label.pointertap = () => {
      this.world.scenes.set('playground', this.world.storage.get('level'));
    }
    this.addChild(this.label);
  }
}

import * as PIXI from 'pixi.js';
import TileMap from '../managers/TileMap'


export default class Menu extends PIXI.Container {
  constructor(scenes) {
    super();

    this.scenes = scenes;
    this.world = scenes.world;

    this.label = new PIXI.Text('START GAME!', {fontFamily : 'Bebas Neue', fontSize: 72, fill : 0xff1010, align : 'center'});
    this.label.anchor.set(.5);
    this.label.x = scenes.world.screen.width/2;
    this.label.y = 300;
    this.label.interactive = true;
    this.label.cursor = 'pointer';
    this.label.pointertap = () => {
      scenes.set('playground');
    }

    this.menuData = PIXI.loader.resources['menu'].data;
    this.background = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage(this.menuData.properties.background), this.world.screen.width, this.world.screen.height)
    this.tilemap = new TileMap(this, this.menuData);
    this.tilemap.y = -this.world.screen.height/5;

    this.addChild(this.background);
    this.addChild(this.tilemap);
    this.addChild(this.label);
  }
  update() {

  }
}

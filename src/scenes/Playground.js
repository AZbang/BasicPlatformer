import * as PIXI from 'pixi.js'
import Camera from '../managers/Camera'
import TileMap from '../managers/TileMap'
import EntitiesManager from '../managers/EntitiesManager'

export default class Playground extends PIXI.Container {
  constructor(scenes, level=1) {
    super();

    this.scenes = scenes;
    this.world = scenes.world;

    this.levelCount = level;
    this.levelData = PIXI.loader.resources['level' + level].data;

    this.gravity = 1;

    this.camera = new Camera(this);
    this.background =  new PIXI.extras.TilingSprite(PIXI.Texture.fromImage(this.levelData.properties.background), this.world.screen.width, this.world.screen.height)
    this.entities = new EntitiesManager(this, this.levelData);
    this.tilemap = new TileMap(this, this.levelData);

    this.addChild(this.background);
    this.addChild(this.camera);
    this.camera.addChild(this.tilemap);
    this.camera.addChild(this.entities);
  }
  update(dt) {
    this.tilemap.update(dt);
    this.entities.update(dt);
    this.camera.update(dt);
    this.background.tilePosition.x = this.camera.pivot.x/50;

  }
  restart() {
    this.scenes.splash(0xFFFFFF, 2000, () => {
      this.scenes.set('playground', this.levelCount);
    });
  }
  complete() {
    this.scenes.splash(0xFFFFFF, 2000, () => {
      this.world.storage.set('level', this.levelCount+1);
      this.scenes.set('playground', this.levelCount+1);
    });
  }
}

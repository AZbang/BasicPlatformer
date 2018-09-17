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
    this.background = new PIXI.Sprite.fromImage(this.levelData.properties.background);
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
  }
  restart() {
    this.scenes.set('playground', this.levelCount);
  }
  complete() {
    this.world.storage.set('level', this.levelCount++);
    this.scenes.set('playground', this.levelCount);
  }
}

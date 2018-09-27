import * as PIXI from 'pixi.js'
import TiledMap from '../managers/TiledMap'

export default class Playground extends TiledMap {
  constructor(world, level=1) {
    console.log(PIXI.loader.resources['level' + level])
    super(world, PIXI.loader.resources['level' + level].data, PIXI.loader.resources['tileset'].data);

    this.world = world;
    this.levelCount = level;
  }
  restartLevel() {
    this.world.scenes.splash(0xFFFFFF, 2000, () => {
      this.world.scenes.set('playground', this.levelCount);
    });
  }
  completeLevel() {
    this.world.scenes.splash(0xFFFFFF, 2000, () => {
      this.world.storage.set('level', this.levelCount+1);
      this.world.scenes.set('playground', this.levelCount+1);
    });
  }
}

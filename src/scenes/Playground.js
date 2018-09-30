import * as PIXI from 'pixi.js'
import TiledMap from '../managers/TiledMap'

export default class Playground extends TiledMap {
  constructor(world, level=1) {
    super(world, PIXI.loader.resources['level' + level].data, PIXI.loader.resources['tileset'].data);

    this.world = world;
    this.levelCount = level;

    this.score = 0;
    this.scoreText = new PIXI.Text('SCORE: 0', {
      fontFamily: 'Comic Sans MS',
      fontSize: 42,
      fill: 0x000000,
      align: 'center'
    });
    this.scoreText.x = 50;
    this.scoreText.y = 100;
    this.addChild(this.scoreText)
  }
  addScore(score=0) {
    this.score += score;
    this.scoreText.text = 'SCORE: ' + this.score;
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

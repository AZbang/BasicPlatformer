import World from './src/World'

PIXI.loader
    .add('spritesheet_tiles.png', 'assets/spritesheet_tiles.png')
    .add('spritesheet_ground.png', 'assets/spritesheet_ground.png')
    .add('blue_grass.png', 'assets/blue_grass.png')
    .add('assets/spritesheet_players.xml')
    .add('level1', 'assets/level1.json')
    .load(onAssetsLoaded);

function onAssetsLoaded(res) {
  console.log(res);
  var world = new World();
  world.scenes.set('menu');
}

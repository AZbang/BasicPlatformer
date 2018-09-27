import World from './src/World'

PIXI.loader
    .add('blue_grass.png', 'assets/blue_grass.png')
    .add('sprites', 'assets/sprites.json')
    .add('tileset', 'assets/tileset.json')
    .add('menu', 'assets/menu.json')
    .add('level1', 'assets/level1.json')
    .load(onAssetsLoaded);

function onAssetsLoaded(res) {
  var world = new World();
  world.scenes.set('menu');
}

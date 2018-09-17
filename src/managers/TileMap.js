import * as PIXI from 'pixi.js';

export default class TileMap extends PIXI.Container {
  constructor(scene, data) {
    super();

    this.textures = [];
    data.tilesets.forEach((tileset) => {
      for(let y = 0; y < tileset.imageheight/tileset.tileheight; y++) {
        for(let x = 0; x < tileset.columns; x++) {
          this.textures.push(new PIXI.Texture(PIXI.Texture.fromImage(tileset.image), new PIXI.Rectangle(x*tileset.tilewidth, y*tileset.tileheight, tileset.tilewidth, tileset.tileheight)));
        }
      }
    });

    data.layers.forEach((layer) => {
      if(layer.type == 'tilelayer') {
        for(let x = 0; x < layer.width; x++) {
          for(let y = 0; y < layer.height; y++) {
            if(!layer.data[x+layer.width*y]) continue;
            let tile = new PIXI.Sprite(this.textures[layer.data[x+layer.width*y]-1]);
            tile.x = x*128;
            tile.y = y*128;
            this.addChild(tile);
          }
        }
      }
    });
  }
  update(dt) {

  }
}

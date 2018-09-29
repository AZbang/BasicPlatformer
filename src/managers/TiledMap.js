import * as PIXI from 'pixi.js';
import Camera from './Camera'
import entities from '../objects'
import GraphicSprite from '../objects/GraphicSprite'

export default class TiledMap extends PIXI.Container {
  constructor(world, map, tileset) {
    super();

    this.map = JSON.parse(JSON.stringify(map));
    this.tileset = tileset;
    this.tilewidth = this.map.tilewidth;
    this.tileheight = this.map.tileheight;
    this.mapWidth = this.map.width;
    this.mapHeight = this.map.height;

    let backgroundTexture = PIXI.Texture.fromImage(this.map.properties.background);
    this.background = new PIXI.extras.TilingSprite(backgroundTexture, world.screen.width, world.screen.height);
    this.gravity = this.map.properties.gravity;

    this.camera = new Camera(world);
    this.addChild(this.background);
    this.addChild(this.camera);

    this.entities = [];
    this.areas = [];

    this._parseMap();
  }
  _parseMap() {
    this.map.layers.forEach((layer) => {
      if(layer.type == 'tilelayer') {
        for(let x = 0; x < layer.width; x++) {
          for(let y = 0; y < layer.height; y++) {
            let gid = layer.data[x+layer.width*y];
            gid && this.newSprite({
              gid,
              x: x*this.tilewidth,
              y: y*this.tileheight,
              width: this.tilewidth,
              height: this.tileheight
            }).anchor.set(0);
          }
        }
      } else if(layer.type == 'objectgroup') {
        layer.objects.forEach((obj) => {
          if(obj.type === 'entity') this.newEntity(obj);
          else if(obj.type === 'area') this.newArea(obj);
          else {
            if(obj.gid) {
              let sprite = this.newSprite(obj);
              sprite.anchor.set(0, 1);
            }
          }
        })
      }
    });
  }
  update(dt) {
    this.background.tilePosition.x = this.camera.pivot.x/50;
    for(let i = 0; i < this.entities.length; i++) {
      this.entities[i].updateEntity(dt);
    }
  }
  newSprite(data) {
    let img = this.tileset.tiles[data.gid-1];
    let sprite = new GraphicSprite(this, {
      x: data.x || 0,
      y: data.y || 0,
      width: data.width,
      height: data.height,
      alpha: data.opacity,
      rotation: data.rotation || 0,
      animationSpeed: img.animation ? 1000 / 60 / img.animation[0].duration : 1,
      frames: img.animation ? img.animation.map((frame) => this.tileset.tiles[frame.tileid].image) : [img.image]
    });
    this.camera.addChild(sprite);
    return sprite;
  }
  removeEntity(entity) {
    const index = this.entities.indexOf(entity);
    if(index !== -1) this.entities.splice(index, 1);
    this.camera.removeChild(entity);
  }
  newEntity(data) {
    let tile = this.tileset.tiles[data.gid-1];

    let entity = new entities[data.name](this, {
      name: data.name,
      x: data.x || 0,
      y: data.y || 0,
      name: data.name,
      width: data.width,
      height: data.height,
      alpha: data.opacity,
      rotation: data.rotation,
      frames: [tile.image],
      properties: data.properties,
      collider: tile.objectgroup ? tile.objectgroup.objects[0] : null
    });
    this.entities.push(entity);
    this.camera.addChild(entity);
  }
  newArea(data) {
    let rect = new PIXI.Rectangle(data.x, data.y, data.width, data.height);
    let s = new PIXI.Sprite(PIXI.Texture.WHITE);
    rect.name = data.name;
    this.areas.push(rect);
  }
  removeArea(area) {
    const index = this.areas.indexOf(area);
    if(index !== -1) this.areas.splice(index, 1);
  }
}

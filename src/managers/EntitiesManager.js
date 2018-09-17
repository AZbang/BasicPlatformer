import entities from '../entities'
import * as PIXI from 'pixi.js';

export default class EntitiesManager extends PIXI.Container {
  constructor(level, data) {
    super();

    this.level = level;
    this.objects = [];

    data.layers.forEach((layer) => {
      if(layer.type === 'objectgroup') {
        layer.objects.forEach((obj) => {
          if(obj.type === 'spawn') this.addEntity(obj.name, obj.x, obj.y, obj.properties);
          else if(obj.type === 'area') this.addArea(obj.name, obj.x, obj.y, obj.width, obj.height, obj.properties);
        })
      }
    });
  }
  removeEntity(entity) {
    this.removeChild(entity);
  }
  addEntity(name, x, y, props) {
    let entity = new entities[name](this, x, y, props);
    entity.name = name;
    this.addChild(entity);
  }
  addArea(name, x, y, w, h, props) {
    let rect = new PIXI.Rectangle(x, y, w, h);
    Object.assign(rect, props);
    rect.name = name;
    this.objects.push(rect);
  }
  removeArea(area) {
    const index = this.objects.indexOf(area);
    if(index !== -1) this.objects.slice(index, 1);
  }
  update(dt) {
    for(let i = 0; i < this.children.length; i++) {
      this.children[i].update(dt);
    }
  }
}

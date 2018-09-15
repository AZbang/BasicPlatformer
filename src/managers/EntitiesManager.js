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
          if(obj.type === 'spawn') {
            let entity = new entities[obj.name](this, obj.x, obj.y, obj.properties);
            this.objects.push(entity);
            this.addChild(entity);
          } else if(obj.type === 'area') {
            let rect = new PIXI.Rectangle(obj.x, obj.y, obj.width, obj.height);
            Object.assign(rect, obj.properties);
            this.objects.push(rect);
          }
        })
      }
    });
  }
  update(dt) {
    for(let i = 0; i < this.children.length; i++) {
      this.children[i].update(dt);
    }
  }
}

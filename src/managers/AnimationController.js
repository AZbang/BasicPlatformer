export default class AnimationController extends PIXI.extras.AnimatedSprite {
  constructor() {
    super([PIXI.Texture.EMPTY]);

    this.animations = {};
    this.currentAnimation = null;
  }
  addAnimation(name, data) {
    let anim = [];
    for(let i = 0; i < data.images.length; i++) {
      let texture = PIXI.Texture.fromImage(data.images[i]);
      anim.push(texture);
    }
    this.animations[name] = {frames: anim};
    Object.assign(this.animations[name], data);
  }
  removeAnimation(name) {
    delete this.animations[name];
  }
  setAnimation(name) {
    if(this.currentAnimation === name) return;

    this.currentAnimation = name;
    this.textures = this.animations[name].frames;
    this.animationSpeed = this.animations[name].speed;
    this.loop = this.animations[name].speed;
    this.play();
    // ...add event bundlers and etc
  }
}

function Player(ctx) {
  this.ctx = ctx;
  
  this.w = this.ctx.canvas.width / 20;
  this.h = this.w * 2 ;
  
  this.x = 2 * this.w ;
  this.y0 = 0.95 * this.ctx.canvas.height - this.h;
  this.y = this.y0;
  
  this.vx = 0;
  this.vy = 0;
  this.g = 0.25;
  
  this.img = new Image();
  this.img.src = "./img/mario.png";
  this.img.frames = 3;
  this.img.frameIndex = 0;
  this.img.animateEvery = 5;

  this.drawCount = 0;
  
  this.bend = false;
  
  this.bullets = [];
}

Player.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    (this.img.width / this.img.frames) * this.img.frameIndex,
    0,
    this.img.width / this.img.frames,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );
  
  // this.animate();
  
  this.bullets.forEach(function(b) {
    b.draw();
  });

  // this.cleanBullets();
};

Player.prototype.cleanBullets = function() {
  this.bullets = this.bullets.filter(function(bullet) {
    console.log(this.bullets.length);
    
    return bullet.x < this.ctx.canvas.width;
  }.bind(this));
};

Player.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;

  if (this.isJumping()) {
    this.vy += this.g;
  } else {
    this.y = this.y0;
    this.vy = 0;
  }

  this.bullets.forEach(function(b) {
    b.move();
  });
};

Player.prototype.animate = function() {
  if (this.isJumping()) return;
  
  this.drawCount = this.drawCount + 1;
  if (this.drawCount === this.img.animateEvery){
    this.img.frameIndex++;
    this.drawCount = 0;
    if (this.img.frameIndex === this.img.frames){
      this.img.frameIndex = 0;
    }
  }
};

Player.prototype.jump = function() {
  if (this.isJumping()) return;

  this.vy -= 10; 
};
 
Player.prototype.shoot = function() {
  this.bullets.push(new Bullet(this.ctx, this.x + this.w, this.y + this.h / 2));
};

Player.prototype.startBend = function() {
  if (this.bend) return;
  this.bend = true;
  this.h /= 2;
  this.y += this.h;
  this.y0 += this.h;
  this.g += 1;
};

Player.prototype.stopBend = function() {
  this.bend = false;
  this.y -= this.h;
  this.y0 -= this.h;
  this.h *= 2;
  this.g -= 1;
};

Player.prototype.isJumping = function() {
  return this.y < this.y0;
};

Player.prototype.TOP = 38;
Player.prototype.DOWN = 40;
Player.prototype.LEFT = 37;
Player.prototype.RIGHT = 39;
Player.prototype.SHOOT = 32;

Player.prototype.onKeyDown = function(code) {
  switch(code) {
    case this.TOP:
    this.jump();
    break;
    case this.RIGHT:
    this.vx = 10;
    break;
    case this.LEFT:
    this.vx = -10;
    break;
    case this.DOWN:
    this.startBend();
    break;
    case this.SHOOT:
    this.shoot();
    break;
  }
};

Player.prototype.onKeyUp = function(code) {
  switch(code) {
    case this.RIGHT:
    case this.LEFT:
    this.vx = 0;
    break;
    case this.DOWN:
    this.stopBend();
  }
};

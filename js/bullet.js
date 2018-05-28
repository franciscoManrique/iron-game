function Bullet(ctx, x, y) {
  this.ctx = ctx;

  this.w = this.ctx.canvas.width / 30;
  this.h = this.w / 2;

  this.x = x;
  this.y = y;

  this.img = new Image();
  this.img.src = "./img/bullet.png";

  this.g = 0;

  this.vx = 20;
  this.vy = 0;
}

Bullet.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );
};

Bullet.prototype.move = function() {
  this.x += this.vx;
};


function Obstacle(ctx) {
  this.ctx = ctx;

  this.w = this.ctx.canvas.width / 20;
  this.h = this.w; 

  this.x = this.ctx.canvas.width;
  this.y = this.ctx.canvas.height * 0.95 - this.h;

  this.img = new Image();
  this.img.src = "./img/obstacle_" + Math.round(Math.random()) + ".png";

  this.vx = 5;
}

Obstacle.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.h,
    this.w
  );
};

Obstacle.prototype.move = function() {
  this.x -= this.vx; 
};

Obstacle.prototype.isCollision = function (bullet) {
  var xCol = (this.x <= (b.x + b.w) && b.x <= (this.x + this.w));
  var yCol = ((b.y + b.h) >= this.y);

  return xCol && yCol;
}
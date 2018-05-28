function ObstacleCollection(ctx) {
  this.ctx = ctx;

  this.obstacles = [];

  this.drawCounter = 0;
}

ObstacleCollection.prototype.draw = function() {
  this.drawCounter++;

  this.generateObstacle();

  this.obstacles.forEach(function(o) {
    o.draw();
  });

  this.cleanObstacles();
};

ObstacleCollection.prototype.move = function() {
  this.obstacles.forEach(function(o) {
    o.move();
  }); 
};

ObstacleCollection.prototype.isCollisions = function(m) { //recibe el player 
  return this.obstacles.some(function(o) {
    var xCol = (o.x <= (m.x + m.w) && m.x <= (o.x + o.w));
    var yCol = ((m.y + m.h) >= o.y);

    return xCol && yCol;
  });
};

ObstacleCollection.prototype.generateObstacle = function() {
  var max = 100,
      min = 50;

  var random = Math.floor(Math.random() * (max - min + 1) + min);

  if (this.drawCounter % random === 0) {
    this.drawCounter = 0;

    this.obstacles.push(
      new Obstacle(this.ctx)
    );
  }
};

ObstacleCollection.prototype.cleanObstacles = function() {
  this.obstacles = this.obstacles.filter(function(o) {
    return o.x + o.w > 0;
  });
};

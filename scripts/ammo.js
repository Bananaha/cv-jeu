// Contructeur de munitions
function Ammo (x, y, sens, config) {
  this.context = config.ctx;
  this.radius = 10;
  this.originX = x;
  this.x = this.originX;
  this.y = y
  this.speed = config.speed / 100;
  // Défini si la forme s'affiche
  this.life = 1;
  this.creationDate = Date.now();
  
  var image = config.parent === 'player' ? gameImages.shotCircle : gameImages.shotBoss;
  
  this.render = function () {
    // Definir le changement de position Y à partir de la génération de l'objet - postion initiale - durée * vitesse
    this.renderDate = Date.now();
    this.x = this.originX - (sens * (this.renderDate - this.creationDate)) * this.speed;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    if (showDebug) {
      this.context.strokeStyle = '#FFFFFF';
      this.context.stroke();
    }
    this.context.closePath();
    if (config.parent === 'player') {
      this.context.drawImage(gameImages.shotRainbow.src, this.x - gameImages.shotRainbow.width, this.y - (image.height - gameImages.shotRainbow.height) / 2 - 2);
      this.context.drawImage(gameImages.shotCircle.src, this.x - image.width / 2 + 3, this.y - image.height / 2 + 3);
      
      if (this.x > config.canvasWidth + image.width / 2 + gameImages.shotRainbow.width) {
        this.life = 0;
      }
    } else {
      this.context.drawImage(gameImages.shotBoss.src, this.x + (this.radius * 1.5) - (image.width / 2) + 4, this.y - image.height / 2 + 3);
      
      if (this.x < - image.width) {
        this.life = 0;
      }
    }
  };
  
  this.removeLife = function () {
    this.life -= 1;
  };
};
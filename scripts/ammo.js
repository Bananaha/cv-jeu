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
  
  var imageSize = {
    width: getImageSize(image).width,
    height: getImageSize(image).height
  };
  
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
      this.context.drawImage(gameImages.shotRainbow, this.x - getImageSize(gameImages.shotRainbow).width, this.y - (imageSize.height - getImageSize(gameImages.shotRainbow).height) / 2 - 2);
      this.context.drawImage(gameImages.shotCircle, this.x - imageSize.width / 2 + 3, this.y - imageSize.height / 2 + 3);
      
      if (this.x > config.canvasWidth + imageSize.width / 2 + getImageSize(gameImages.shotRainbow).width) {
        this.life = 0;
      }
    } else {
      this.context.drawImage(gameImages.shotBoss, this.x + (this.radius * 1.5) - (imageSize.width / 2) + 4, this.y - imageSize.height / 2 + 3);
      
      if (this.x < - imageSize.width) {
        this.life = 0;
      }
    }
  };
  
  this.removeLife = function () {
    this.life -= 1;
  };
};

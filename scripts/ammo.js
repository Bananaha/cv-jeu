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
  this.render = function () {
    // Definir le changement de position Y à partir de la génération de l'objet - postion initiale - durée * vitesse
    this.renderDate = Date.now();
    this.x = this.originX - (sens * (this.renderDate - this.creationDate)) * this.speed;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.context.closePath();
    if (config.parent === 'player') {
      this.context.drawImage(gameImages.shotCircle, this.x - getImageSize(gameImages.shotCircle).width / 2, this.y - getImageSize(gameImages.shotCircle).height / 2);
      this.context.drawImage(gameImages.shotRainbow, this.x - getImageSize(gameImages.shotCircle).width / 2 - getImageSize(gameImages.shotRainbow).width, this.y - ((getImageSize(gameImages.shotCircle).height - getImageSize(gameImages.shotRainbow).height) / 2) - 5);
    } else {
      this.context.drawImage(gameImages.shotBoss, this.x + (this.radius * 1.5) - (getImageSize(gameImages.shotBoss).width / 2), this.y - getImageSize(gameImages.shotBoss).height / 2);
    }
  };
  this.removeLife = function () {
    this.life -= 1;
  };
};

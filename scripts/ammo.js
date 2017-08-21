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
    this.context.fillStyle = colors.ammo;
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.context.fill();
    this.context.closePath();
  };
  this.removeLife = function () {
    this.life -= 1;
  };
};
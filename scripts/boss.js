// Contructeur des boss
var Boss = function (config) {
  var shotDate;
  this.context = config.ctx;
  this.radius = 300;
  this.originX = config.canvasWidth + this.radius;
  this.x = this.originX;
  this.y = config.canvasHeight / 2;
  this.speed = config.SPEED / 200;
  // Défini si la forme s'affiche
  this.life = 10;
  this.creationDate = Date.now();
  this.rank = config.rank;

  this.render = function () {
    // Definir le changement de position Y à partir de la génération de l'objet - postion initiale - durée * vitesse
    this.renderDate = Date.now();
    if (this.x > config.BOSS_MAXY) {
      this.x = this.originX - (this.renderDate - this.creationDate) * this.speed;
    } else {
      this.x = config.BOSS_MAXY;
    }
    // Définir les paramètres de l'objet
    this.context.beginPath();
    this.context.fillStyle = colors.ennemy;
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.context.fill();
    this.context.closePath();

    checkForShot.apply(this);
  };

  function checkForShot () {
    // le boss tire dès qu'il atteint sa position finale
    if (this.x === config.BOSS_MAXY) {
      shotDate = config.launchAmmo(config.allAmmos.boss, this.x - this.radius, config.random(0, this.radius * 2), 1, shotDate, config.shotSpeed);
    }
  }
  this.removeLife = function () {
    this.life -= 1;
    config.newScore.score += 100;
    if (this.life === 0) {
      config.onDead(this.rank);
    }
  };
};

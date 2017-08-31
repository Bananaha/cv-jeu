// Contructeur des boss
var Boss = function (config) {
  var shotDate;
  var BOSS_IMAGE = [
    gameImages.bossBlue,
    gameImages.bossPink,
    gameImages.bossYellow, 
    gameImages.bossBrown
    ];
  var bossImage = BOSS_IMAGE[config.gameStage - 1];
  this.context = config.ctx;
  this.radius = 200;
  this.originX = config.canvasWidth + this.radius;
  this.x = this.originX;
  this.y = config.canvasHeight / 2;
  this.speed = config.speed / 200;
  // Défini si la forme s'affiche
  this.life = 10;
  this.creationDate = Date.now();
  this.rank = config.rank;

  this.render = function () {
    // Definir le changement de position Y à partir de la génération de l'objet - postion initiale - durée * vitesse
    this.renderDate = Date.now();
    this.ammoPos = random((config.canvasHeight - (this.radius * 2)) / 2, config.canvasHeight - (config.canvasHeight - (this.radius * 2)) / 2)
    if (this.x > config.BOSS_MAXY) {
      this.x = this.originX - (this.renderDate - this.creationDate) * this.speed;
    } else {
      this.x = config.BOSS_MAXY;
    }
    // Définir les paramètres de l'objet
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.drawImage(bossImage, this.x - getImageSize(bossImage).width / 2, this.y - getImageSize(bossImage).height / 2);
    
    checkForShot.apply(this);
  };

  function checkForShot () {
    // le boss tire dès qu'il atteint sa position finale
    if (this.x === config.BOSS_MAXY) {
      shotDate = config.launchAmmo(config.allAmmos.boss, this.x - this.radius, this.ammoPos, 1, shotDate, config.shotSpeed, 'boss');
    }
  }
  console.log(config.random((config.canvasHeight - (this.radius * 2)) / 2, config.canvasHeight - (config.canvasHeight - (this.radius * 2)) / 2))
  this.removeLife = function () {
    this.life -= 1;
    config.newScore.score += 100;
    if (this.life === 0) {
      config.onDead(this.rank);
    }
  };
};

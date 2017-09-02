// Contructeur des boss
var Boss = function (config) {
  var shotDate;
  var BOSS_IMAGE = [
    gameImages.bossBlue,
    gameImages.bossPink,
    gameImages.bossYellow, 
    gameImages.bossBrown
  ];
  var bossImage = BOSS_IMAGE[config.rank - 1];
  
  this.context = config.ctx;
  this.radius = 200;
  this.originX = config.canvasWidth + bossImage.width;
  this.x = this.originX;
  this.y = config.canvasHeight / 2;
  this.speed = config.speed / 200;
  // Défini si la forme s'affiche
  this.life = 1;
  
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
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//    if (showDebug) {
//     this.context.lineWidth = 5;
//      this.context.strokeStyle = '#003300';
//     this.context.stroke();
//    }
    this.context.closePath();
    this.context.drawImage(bossImage.src, this.x - bossImage
    .width / 2, this.y - bossImage.height / 2);
  //  if (showDebug) {
  //    this.context.lineWidth = 2;
  //    this.context.strokeStyle = '#FF0000';
  //    this.context.stroke();
  //    this.context.beginPath();
  //    this.context.moveTo(0, this.y - this.radius);
  //    this.context.lineTo(1000, this.y - this.radius);
  //    this.context.stroke();     
  //    this.context.beginPath();
  //    this.context.moveTo(0, this.y + this.radius);
  //    this.context.lineTo(1000, this.y + this.radius);
  //    this.context.stroke();
  //  }
    checkForShot.apply(this);
  };
  
  function checkForShot () {
    // le boss tire dès qu'il atteint sa position finale
    if (this.x === config.BOSS_MAXY) {
      var ammoY = random(this.y - this.radius, this.y + this.radius);
      shotDate = config.launchAmmo(config.allAmmos.boss, this.x - this.radius, ammoY, 1, shotDate, config.shotSpeed, 'boss');
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

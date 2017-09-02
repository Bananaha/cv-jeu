// Contructeur d'ennemis
function Ennemy (speedCoeff, config) {
  
  var ENNEMY_IMAGE = [
    gameImages.ennemyBlue,
    gameImages.ennemyPink,
    gameImages.ennemyYellow, 
    gameImages.ennemyBrown
    ];

  var ennemyImage = ENNEMY_IMAGE[config.gameStage - 1];

  this.context = config.ctx;
  this.radius = 50;
  // Position x aléatoire dans le canvas
  this.originX = -this.radius;
  this.x = this.originX;
  this.y = random(this.radius, config.canvasHeight);
  this.speed = config.speed / (200 / speedCoeff);
  // Défini si la forme s'affiche
  this.life = 1;
  this.creationDate = Date.now();

  this.render = function () {
    // Definir le changement de position Y à partir de la génération de l'objet - postion initiale - durée * vitesse
    this.renderDate = Date.now();
    this.x = config.canvasWidth - (this.renderDate - this.creationDate) * this.speed;
    // Définir les paramètres de l'objet
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//    if (showDebug) {
//      this.context.lineWidth = 5;
//      this.context.strokeStyle = '#FFFFFF';
//      this.context.stroke();
//    }
    var x = this.x - ennemyImage.width / 2;
    var y =  this.y - ennemyImage.height / 2 - 8;
    this.context.drawImage(ennemyImage.src, x, y);
    this.context.closePath();
    
    if (this.x < -ennemyImage.width) {
      this.life = 0;
    }
  };
  
  this.removeLife = function (collidedElement) {
    this.life -= 1;
    if (collidedElement && collidedElement.constructor !== Player) {
      config.newScore.score += 100;
    }
  };
};

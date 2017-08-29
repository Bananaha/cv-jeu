// Contructeur d'ennemis
function Ennemy (speedCoeff, config) {
  var ennemyImage;
  switch (config.gameStage) {
    case 1:
      ennemyImage = gameImages.ennemyBlue;
      break;
    case 2:
      ennemyImage = gameImages.ennemyPink;
      break;
    case 3:
      ennemyImage = gameImages.ennemyYellow;
      break;
    case 4:
      ennemyImage = gameImages.ennemyBrown;
      break;
  }
  this.context = config.ctx;
  this.radius = 50;
  // Position x aléatoire dans le canvas
  this.originX = -this.radius;
  this.x = this.originX;
  this.y = config.random(this.radius, config.canvasHeight);
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
    this.context.drawImage(ennemyImage, this.x - getImageSize(image).width / 2, this.y - getImageSize(image).height / 2);
    this.context.closePath();
  };
  this.removeLife = function (collidedElement) {
    this.life -= 1;
    if (collidedElement.constructor !== Player) {
      config.newScore.score += 100;
    }
  };
};

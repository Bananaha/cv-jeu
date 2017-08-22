// Contructeur d'ennemis
function Ennemy (speedCoeff, config) {
  var image = new Image();
  switch (config.gameStage) {
    case 1:
      image.src = game.getImage().ennemyBlue;
      break;
    case 2:
      image.src = game.getImage().ennemyPink;
      break;
    case 3:
      image.src = game.getImage().ennemyYellow;
      break;
    case 4:
      image.src = game.getImage().ennemyBrown;
      break;
  }
  this.context = config.ctx;
  this.radius = 50;
  // Position x aléatoire dans le canvas
  this.originX = -this.radius;
  this.x = this.originX;
  this.y = config.random(this.radius, config.canvasHeight);
  this.speed = config.SPEED / (200 / speedCoeff);
  // Défini si la forme s'affiche
  this.life = 1;
  this.creationDate = Date.now();

  this.render = function () {
    // Definir le changement de position Y à partir de la génération de l'objet - postion initiale - durée * vitesse
    this.renderDate = Date.now();
    this.x = config.canvasWidth - (this.renderDate - this.creationDate) * this.speed;
    // Définir les paramètres de l'objet
    this.context.beginPath();
    this.context.fillStyle = colors.ennemy;
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.context.fill();
    this.context.closePath();
    this.context.beginPath();
    this.context.drawImage(image, this.x - getImageSize(image).width / 2, this.y - getImageSize(image).height / 2);
    console.log('ennemy', getImageSize(image).height);
  };
  this.removeLife = function (collidedElement) {
    this.life -= 1;
    if (collidedElement.constructor !== Player) {
      config.newScore.score += 100;
    }
  };
};

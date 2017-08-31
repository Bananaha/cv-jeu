//  Constructeur du joueur
function Player (config) {
  var shotDate;
  var RAINBOWCOLORS = [
    '#e36759',
    '#f2a942',
    '#f8cb4e',
    '#87b974',
    '#59aaf2',
    '#6a5dbd',
    '#9350b6'
  ];
  //  Défini la position initiale du joueur
  this.radius = 50;
  this.x = this.radius * 2;
  this.y = config.canvasHeight / 2;

  var rainbowWidth = this.x + 5;
  var rainbowParticulesWidth = 2;
  var rainbowParticulesHeight = 12;
  var rainbowParticules = [];
  for (var i = 0; i < rainbowWidth; i += rainbowParticulesWidth) {
    rainbowParticules.push(this.y);
  }
  // Défini si la forme s'affiche
  this.life = 3;
  
  this.render = function () {
    config.context.beginPath();
    config.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    if (showDebug) {
      config.context.lineWidth = 5;
      config.context.strokeStyle = '#FF0000';
      config.context.stroke();
    }
    config.context.closePath();
    // combien de rectangles sont générés entre la licorne et la bordure
    // en déduire la largeur de chacun
    // créer un tableau qui stock la position y de chacun des rectangles et qui est initialisé par la position y de la licorne
    // a chaque render, prendre la position y de la licorne la mettre en fin de tableau et supprimer le 1er élément

    rainbowParticules.push(this.y);
    rainbowParticules.shift();

    for (var colorIndex = 0; colorIndex < RAINBOWCOLORS.length; colorIndex++) {
      for (var yIndex = 0; yIndex < rainbowParticules.length; yIndex++) {
        config.context.beginPath();
        config.context.fillStyle = RAINBOWCOLORS[colorIndex];
        // y de rect = y de sa colonne + hauteur de couleur * index de couleur
        config.context.fillRect(rainbowParticulesWidth * yIndex, rainbowParticules[yIndex] + colorIndex * (rainbowParticulesHeight - 1) - 35, rainbowParticulesWidth, rainbowParticulesHeight);
        config.context.fill();
        config.context.closePath();
      }
    }
    config.context.drawImage(gameImages.unicorn, this.x - getImageSize(gameImages.unicorn).width / 2, this.y - getImageSize(gameImages.unicorn).height / 2);

    checkEvents.apply(this);
  };

  // Vitesse de déplacement
  this.speed = config.speed;
  // Gestion des déplacements latéraux
  function goUp () {
    var yMin = this.radius + 10;
    this.y = this.y <= yMin ? yMin : this.y - this.speed;
  }

  function goDown () {
    var yMax = config.canvasHeight - this.radius - 10;
    this.y = this.y >= yMax ? yMax : this.y + this.speed;
  }

  function checkEvents () {
    if (pressedKeys.ArrowUp) {
      goUp.apply(this);
    }
    if (pressedKeys.ArrowDown) {
      goDown.apply(this);
    }
    if (pressedKeys.Shift) {
      shotDate = config.launchAmmo(config.allAmmos.player, this.x, this.y, -1, shotDate, 500, 'player');
    }
  };

  this.removeLife = function () {
    this.life -= 1;
  };
};

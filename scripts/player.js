//  Constructeur du joueur
function Player (config) {
  console.log('in player');
  var shotDate;
  var yPosSprite = [
    0,
    80,
    160,
    240,
    320,
    400,
    480,
    560
  ];
  var index = 0;
  
  var RAINBOWCOLORS = [
    '#e36759',
    '#f2a942',
    '#f8cb4e',
    '#87b974',
    '#59aaf2',
    '#6a5dbd',
    '#9350b6'
  ];
  
  var UNICORN_Y = [0, 160, 320, 480, 640, 800, 960, 1120];
  //  Défini la position initiale du joueur
  this.radius = 40;
  this.x = this.radius * 2.5;
  this.y = config.canvasHeight / 2;

  var rainbowWidth = this.x + 5;
  var rainbowParticulesWidth = 2;
  var rainbowParticulesHeight = 5;
  var rainbowParticules = [];
  for (var i = 0; i < rainbowWidth; i += rainbowParticulesWidth) {
    rainbowParticules.push(this.y + 30);
  }
  var lastRenderDate = Date.now();
  // Défini si la forme s'affiche
  this.life = 3;
  
  this.render = function () {
    var renderDate = Date.now();
    config.context.beginPath();
    config.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    if (showDebug) {
      config.context.lineWidth = 5;
      config.context.strokeStyle = '#FF0000';
      config.context.stroke();
    }
    config.context.closePath();

    rainbowParticules.push(this.y + 30);
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
    
    if(renderDate - lastRenderDate > 50) {
      
      lastRenderDate = renderDate;
      if (index < yPosSprite.length - 1) {
        
        index++;
        
      } else {
        
        index = 0;
        
      }
    }
        
    config.context.drawImage(
      gameImages.unicornSprite.src, 
      0, 
      yPosSprite[index], 
      160, 
      80, 
      this.x - 90, 
      this.y - 40, 
      160, 
      80)

    checkEvents.apply(this);
  };

  // Vitesse de déplacement
  this.speed = config.speed;
  // Gestion des déplacements latéraux
  function goUp () {
    var yMin = this.radius + 10;
    this.y = this.y <= yMin ? yMin : this.y - this.speed;
    console.log(this.y);
  }

  function goDown () {
    console.log('go down')
    var yMax = config.canvasHeight - this.radius - 10;
    this.y = this.y >= yMax ? yMax : this.y + this.speed;
    console.log(this.y);
  }

  function checkEvents () {
    if (pressedKeys.ArrowUp || pressedKeys.Up || pressedKeys[38]) {
      console.log('up');
      goUp.apply(this);
    }
    if (pressedKeys.ArrowDown || pressedKeys.Down || pressedKeys[40]) {
      console.log('down');
      goDown.apply(this);
    }
    if (pressedKeys[" "] || pressedKeys.Spacebar || pressedKeys[32]) {
      console.log('spacebar');
      shotDate = config.launchAmmo(config.allAmmos.player, this.x, this.y, -1, shotDate, 500, 'player');
    }
  };

  this.removeLife = function () {
    this.life -= 1;
  };
};


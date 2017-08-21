//  Constructeur du joueur
function Player (config) {
  var shotDate;
  //  Défini la position initiale du joueur
  this.radius = 40;
  this.x = this.radius * 2;
  this.y = config.canvasHeight / 2;
  this.context = config.ctx;

  // Défini si la forme s'affiche
  this.life = 1;
  this.render = function () {
    this.context.beginPath();
    this.context.fillStyle = colors.primary;
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.context.fill();
    this.context.closePath();
    checkEvents.apply(this);
  };
  // Vitesse de déplacement
  this.speed = config.speed;
  // Gestion des déplacements latéraux
  function goUp () {
    if (this.y <= 0 + this.radius) {
      return;
    }
    this.y -= this.speed;
  }

  function goDown () {
    if (this.y >= config.canvasHeight - this.radius) {
      return;
    }
    this.y += this.speed;
  }

  function checkEvents () {
    if (pressedKeys.ArrowUp) {
      goUp.apply(this);
    }
    if (pressedKeys.ArrowDown) {
      goDown.apply(this);
    }
    if (pressedKeys.Shift) {
      shotDate = config.launchAmmo(config.allAmmos.player, this.x, this.y, -1, shotDate, 500);
    }
  };
  this.removeLife = function () {
    this.life -= 1;
  };
};
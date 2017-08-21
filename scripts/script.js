var colors = {
  primary: '#f9dc19',
  transparency: 'rgba(255, 255, 255, 0.58)',
  ammo: '#e74444',
  ennemy: '#23a3db',
  text: '#505050'
};
var pressedKeys = {};
//Event listeners sur les touches du clavier et souris
window.addEventListener('keydown', function(event){
  event.preventDefault();
  pressedKeys[event.key] = true;
});
window.addEventListener('keyup', function(event){
  event.preventDefault();
  pressedKeys[event.key] = false;
});

var game = new Game();

//Boutons de la modal
var restartButton = document.getElementById('restart');
var partsUnlockedButton = document.getElementById('parts-unlocked');
var showCvButton = document.getElementById('show-cv');
var contactButton = document.getElementById('contact');


//Génère une position X aléatoire
function random (min, max) {
  return Math.random() * ((max - min) - min) + min;
}

//Créer une modal
function showEndMessage (config) {
  var textMessage = {
    win: 'Awesome ! Vous avez réussi',
    lose: 'Oh non....il reste tant à découvrir !'
  };
  var modalContainer = document.getElementById('modal-container');
  modalContainer.style.width = config.canvasWidth + 'px';
  modalContainer.style.height = config.canvasHeight + 'px';
  var scoreParagraph = document.getElementById('score');
  var messageParagraph = document.getElementById('message');

  scoreParagraph.innerHTML = 'Score: ' + config.newScore.score;
  messageParagraph.innerHTML = textMessage[config.textKey];
  modalContainer.className = 'show';
};

partsUnlockedButton.addEventListener('click', function(event) {
  event.preventDefault();
  var cvPartsContainer = document.getElementById('rub-win');
  cvPartsContainer.style.width = game.getSize().canvasWidth + 'px';
  console.log(game.getSize().canvasWidth);
  cvPartsContainer.style.height = game.getSize().canvasHeight + 'px';
  cvPartsContainer.className = 'show';
});

// Relance une partie
restartButton.addEventListener('click', function(event) {
  event.preventDefault();
  game.start();
});

game.start();

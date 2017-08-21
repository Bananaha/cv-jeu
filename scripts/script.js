var colors = {
  primary: '#f9dc19',
  transparency: 'rgba(255, 255, 255, 0.58)',
  ammo: '#e74444',
  ennemy: '#23a3db',
  text: '#505050'
};
var pressedKeys = {};

var game = new Game();

// Boutons des modals
var openingModal = document.getElementById('opening-modal');
var startGameButton = document.getElementById('start-game-button');
var skipGameButton = document.getElementById('skip-game-button');
var endMessageModalContainer = document.getElementById('end-message-modal-container');
var restartButton = document.getElementById('restart');
var cvPartsUnlockedButton = document.getElementById('cv-parts-unlocked');
var showCvButton = document.getElementById('show-cv');
var contactButton = document.getElementById('contact');

// Event listeners sur les touches du clavier et souris
window.addEventListener('keydown', function (event) {
  event.preventDefault();
  pressedKeys[event.key] = true;
});

window.addEventListener('keyup', function (event) {
  event.preventDefault();
  pressedKeys[event.key] = false;
});

cvPartsUnlockedButton.addEventListener('click', function (event) {
  event.preventDefault();
  var cvPartsContainer = document.getElementById('rub-win');
  cvPartsContainer.style.width = game.getSize().canvasWidth + 'px';
  cvPartsContainer.style.height = game.getSize().canvasHeight + 'px';
  cvPartsContainer.className = 'show';
});

window.addEventListener('load', function () {
  openingModal.style.width = game.getSize().canvasWidth + 'px';
  openingModal.style.height = game.getSize().canvasHeight + 'px';
});

startGameButton.addEventListener('click', function () {
  translateY(startGameButton);
  translateY(skipGameButton);
  delayedHide(openingModal);
});

skipGameButton.addEventListener('click', function (event) {
  event.preventDefault();
  translateY(startGameButton);
  translateY(skipGameButton);
});

// Relance une partie
restartButton.addEventListener('click', function (event) {
  event.preventDefault();
  var endMessageModal = document.getElementById('end-message-modal');
  translateY(endMessageModal);
  delayedHide(endMessageModalContainer);
  game.start();
});

// Génère une position X aléatoire
function random (min, max) {
  return Math.random() * ((max - min) - min) + min;
};

function translateY (element) {
  element.style.transform = ' translateY(' + game.getSize().canvasHeight + 'px)';
}
// Créer une modal
function showEndMessage (config) {
  var textMessage = {
    win: 'Awesome ! Vous avez réussi',
    lose: 'Oh non....il reste tant à découvrir !'
  };
  var scoreParagraph = document.getElementById('score');
  var messageParagraph = document.getElementById('message');
  endMessageModalContainer.style.width = config.canvasWidth + 'px';
  endMessageModalContainer.style.height = config.canvasHeight + 'px';
  scoreParagraph.innerHTML = 'Score: ' + config.newScore.score;
  messageParagraph.innerHTML = textMessage[config.textKey];
  endMessageModalContainer.className = 'show';
};

function delayedHide (element) {
  setTimeout(function () {
    element.className = 'hide';
    game.start()
  }, 1000);
};

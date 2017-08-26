var game;
var colors = {
  // primary: '#f9dc19',
  primary: 'rgba(255, 255, 255, 0)',
  transparency: 'rgba(255, 255, 255, 0.58)',
  ammo: '#e74444',
  // ammo: 'rgba(255, 255, 255, 0)',
  // ennemy: '#23a3db',
  boss: '#ddf525',
  ennemy: 'rgba(255, 255, 255, 0)',
  text: '#505050'
};
var pressedKeys = {};
var partsUnlocked = [];

var IMG = {
  ennemyBlue: './assets/ennemy-blue.png',
  ennemyBrown: './assets/ennemy-brown.png',
  ennemyPink: './assets/ennemy-pink.png',
  ennemyYellow: './assets/ennemy-yellow.png',
  forestBack: './assets/forest-back.png',
  forestFront: './assets/forest-front.png',
  heartFull: './assets/heart-full.png',
  heartEmpty: './assets/heart-empty.png',
  hillFront: './assets/hill-front.png',
  hillBack: './assets/hill-back.png',
  mountainBack: './assets/mountain-back.png',
  mountainFront: './assets/mountain-front.png',
  mountainMiddle: './assets/mountain-middle.png',
  shotCircle: './assets/shot-circle.png',
  shotRainbow: './assets/shot-rainbow.png',
  unicorn: './assets/unicorn.png',
  unicornRainbow: './assets/unicorn-rainbow.png',
  restart: './assets/return.png',
  information: './assets/information.png'
};
var gameImages = {};

var imagesCount = Object.keys(IMG).length;
var loadedImagesCount = 0;

for (var key in IMG) {
  var image = new Image();
  image.src = IMG[key];
  gameImages[key] = image;
  image.onload = function () {
    loadedImagesCount++;
    if (loadedImagesCount === imagesCount) {
      game = new Game();
      openingModal.style.width = game.getSize().canvasWidth + 'px';
      openingModal.style.height = game.getSize().canvasHeight + 'px';
    }
  }
}

var skillsPart = document.getElementById('rub-skills');
var degreesPart = document.getElementById('rub-degrees');
var experiencesPart = document.getElementById('rub-experiences');
var likesPart = document.getElementById('rub-likes');
// Modals
var openingModal = document.getElementById('opening-modal');
var endMessageModalContainer = document.getElementById('end-message-modal-container');
var endMessageModal = document.getElementById('end-message-modal');
// Boutons des modals
var startGameButton = document.getElementById('start-game-button');
var skipGameButton = document.getElementById('skip-game-button');
var restartButton = document.getElementById('restart');
var seePartsUnlocked = document.getElementById('parts-unlocked');
var rightArrow = document.getElementById('gallery-right-arrow');
var leftArrow = document.getElementById('gallery-left-arrow')
var showCv = document.getElementById('show-cv');
var contact = document.getElementById('contact');

// Event listeners sur les touches du clavier
window.addEventListener('keydown', function (event) {
  event.preventDefault();
  pressedKeys[event.key] = true;
});

window.addEventListener('keyup', function (event) {
  event.preventDefault();
  pressedKeys[event.key] = false;
});

seePartsUnlocked.addEventListener('click', function (event) {
  event.preventDefault();
  hideEndModal();
  var gallery = document.getElementById('gallery');
  gallery.style.width = game.getSize().canvasWidth + 'px';
  gallery.style.height = game.getSize().canvasHeight + 'px';
  gallery.className = 'show';

  if (partsUnlocked.length === 0) {
    // AJOUTER UN MESSAGE !!!!!!!!!!!!!!!!!!!!!!!
    console.log('coucou');
  } else {
    partsUnlocked[0].className = 'show';
    console.log('toto');
  }
  if(partsUnlocked.length > 1) {
    rightArrow.classList.add('show');
    rightArrow.classList.remove('hide');
  }
});

rightArrow.addEventListener('click', function () {
  if()
});
startGameButton.addEventListener('click', function () {
  translateY(startGameButton);
  translateY(skipGameButton);
  setTimeout(function () {
    openingModal.className = 'hide';
    removeAttr(startGameButton, 'style');
    removeAttr(skipGameButton, 'style');
    game.start()
  }, 1000);
});

skipGameButton.addEventListener('click', function (event) {
  event.preventDefault();
  translateY(startGameButton);
  translateY(skipGameButton);
});

// Relance une partie
restartButton.addEventListener('click', function (event) {
  event.preventDefault();
  hideEndModal();
});

// Génère une position X aléatoire
function random (min, max) {
  return Math.random() * ((max - min) - min) + min;
};

function translateY (element) {
  element.style.transform = ' translateY(' + game.getSize().canvasHeight + 'px)';
};

function removeAttr (element, attribute) {
  element.removeAttribute(attribute);
};

function getImageSize (element) {
  return {
    width: element.naturalWidth,
    height: element.naturalHeight
  }
};

// Créer une modal
function showEndModal (config) {
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

function hideEndModal () {
  translateY(endMessageModal);
  setTimeout(function () {
    endMessageModalContainer.className = 'hide';
    removeAttr(endMessageModal, 'style');
    game.start();
  }, 1000);
}

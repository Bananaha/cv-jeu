var game;
var colors = {
  ammo: '#e74444',
  boss: '#ddf525',
  text: '#505050'
};
var pressedKeys = {};
var partsUnlocked = [];
var index = 0;
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
var textMessage = {
  lvl0: 'Oh non...il reste tant à découvrir, rejouer!',
  lvl1: 'Bravo, vous avez débloqué les compétences! Rejouer pour débloquer d\'avantage !',
  lvl2: 'Woooh, vous avez débloqué les compétences et les diplômes, vous êtes sur la bonne voie. Rejouer !',
  lvl3: 'Finger in the nose ! Compétences, Diplômes et Expériences..plus qu\'un seul niveau.',
  lvl4: 'C\'est gagné, c\'est gagné, you did it yeah!'
};
var skillsPart = document.getElementById('rub-skills');
var degreesPart = document.getElementById('rub-degrees');
var experiencesPart = document.getElementById('rub-experiences');
var likesPart = document.getElementById('rub-likes');
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
var endingModalContainer = document.getElementById('ending-modal-container');
var endingModal = document.getElementById('ending-modal');
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
  translateY(endingModal);
  setTimeout(function () {
    endingModalContainer.className = 'hide';
    removeAttr(endingModal, 'style');
    var gallery = document.getElementById('gallery');
    gallery.style.width = game.getSize().canvasWidth + 'px';
    gallery.style.height = game.getSize().canvasHeight + 'px';
    gallery.className = 'flex';
  }, 1000);

  if (partsUnlocked.length === 0) {
    // AJOUTER UN MESSAGE !!!!!!!!!!!!!!!!!!!!!!!
    console.log('coucou');
  } else {
    partsUnlocked[index].className = 'show';
    console.log(index);
  }
  if (partsUnlocked.length > 1) {
    rightArrow.classList.add('show');
    rightArrow.classList.remove('hide');
  }
});

rightArrow.addEventListener('click', function () {
  partsUnlocked[index].className = 'hide';
  if (index < partsUnlocked.length - 1) {
    index++;
  } else {
    index = 0;
  }
  console.log(index);
  partsUnlocked[index].className = 'show';
  if (index > 0) {
    leftArrow.classList.add('show');
    leftArrow.classList.remove('hide');
  }
});

leftArrow.addEventListener('click', function () {
  partsUnlocked[index].className = 'hide';
  if (index >= 1) {
    index--;
  } else {
    index = partsUnlocked.length - 1;
  }
  console.log(index);
  partsUnlocked[index].className = 'show';
  if (index > 0) {
    leftArrow.classList.add('show');
    leftArrow.classList.remove('hide');
  }
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
  translateY(endingModal);
  setTimeout(function () {
    endingModalContainer.className = 'hide';
    removeAttr(endingModal, 'style');
    game.start();
  }, 1000);
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
  var scoreParagraph = document.getElementById('score');
  var messageParagraph = document.getElementById('message');
  endingModalContainer.style.width = config.canvasWidth + 'px';
  endingModalContainer.style.height = config.canvasHeight + 'px';
  scoreParagraph.innerHTML = 'Score: ' + config.newScore.score;
  messageParagraph.innerHTML = config.text;
  endingModalContainer.className = 'flex';
};

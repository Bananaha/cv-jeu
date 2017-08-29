var game;
var colors = {
  ammo: '#e74444',
  boss: '#ddf525',
  text: '#505050'
};
var pressedKeys = {};
var partsUnlocked = [];
var index = 0;
var textMessage = {
  lvl0: 'Oh non...il reste tant à découvrir, rejouez!',
  lvl1: 'Bravo, vous avez débloqué les compétences! Rejouez pour débloquer d\'avantage !',
  lvl2: 'Woooh, vous avez débloqué les compétences et les diplômes, vous êtes sur la bonne voie. Rejouez !',
  lvl3: 'Finger in the nose ! Compétences, Diplômes et Expériences..plus qu\'un seul niveau.',
  lvl4: 'C\'est gagné, c\'est gagné, you did it yeah!'
};

var IMG = {
  bossBlue: './assets/boss-blue.png',
  bossBrown: './assets/boss-brown.png',
  bossPink: './assets/boss-pink.png',
  bossYellow: './assets/boss-yellow.png',
  cloud1: './assets/cloud1.png',
  cloud2: './assets/cloud2.png',
  cloud3: './assets/cloud3.png',
  cloud4: './assets/cloud4.png',
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
  shotBoss: './assets/shot-boss.png',
  shotCircle: './assets/shot-circle.png',
  shotRainbow: './assets/shot-rainbow.png',
  star: './assets/star.png',
  unicorn: './assets/unicorn.png',
  unicornRainbow: './assets/unicorn-rainbow.png'
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

var openingModal = document.getElementById('opening-modal');
var startGameButton = document.getElementById('start-game-button');
var skipGameButton = document.getElementById('skip-game-button');

var endingModalContainer = document.getElementById('ending-modal-container');
var endingModal = document.getElementById('ending-modal');
var restartInEnding = document.getElementById('restart-in-ending');
var seePartsUnlocked = document.getElementById('parts-unlocked');

var inGameMessage = document.getElementById('in-game-message');

var gallery = document.getElementById('gallery');
var rightArrow = document.getElementById('gallery-right-arrow');
var leftArrow = document.getElementById('gallery-left-arrow')
var restartInGallery = document.getElementById('restart-in-gallery');

var skillsPart = document.getElementById('rub-skills');
var degreesPart = document.getElementById('rub-degrees');
var experiencesPart = document.getElementById('rub-experiences');
var likesPart = document.getElementById('rub-likes');
var partIndex = document.getElementById('part-index');

// Event listeners sur les touches du clavier
window.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Shift') {
    event.preventDefault();
  }
  pressedKeys[event.key] = true;
});

window.addEventListener('keyup', function (event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Shift') {
    event.preventDefault();
  }
  pressedKeys[event.key] = false;
});

seePartsUnlocked.addEventListener('click', function (event) {
  event.preventDefault();
  setTimeout(function () {
    endingModalContainer.className = 'hide';
    removeAttr(endingModal, 'style');
    gallery.style.width = game.getSize().canvasWidth + 'px';
    gallery.style.height = game.getSize().canvasHeight + 'px';
    gallery.className = 'flex';
  }, 1000);

  partsUnlocked[index].className = 'show';

  if (partsUnlocked.length > 1) {
    rightArrow.classList.add('show');
    rightArrow.classList.remove('hide');
  }
  partIndex.innerHTML = index + 1 + " / " + partsUnlocked.length;
});

rightArrow.addEventListener('click', function () {
  partsUnlocked[index].className = 'hide';
  if (index < partsUnlocked.length - 1) {
    index++;
  } else {
    index = 0;
  }
  partsUnlocked[index].className = 'show';
  if (index > 0) {
    leftArrow.classList.add('show');
    leftArrow.classList.remove('hide');
  }
  partIndex.innerHTML = index + 1 + " / " + partsUnlocked.length;
});

leftArrow.addEventListener('click', function () {
  partsUnlocked[index].className = 'hide';
  if (index >= 1) {
    index--;
  } else {
    index = partsUnlocked.length - 1;
  }
  partsUnlocked[index].className = 'show';
  if (index > 0) {
    leftArrow.classList.add('show');
    leftArrow.classList.remove('hide');
  }
  partIndex.innerHTML = index + 1 + " / " + partsUnlocked.length;
});

startGameButton.addEventListener('click', function () {
    openingModal.className = 'hide';
    removeAttr(startGameButton, 'style');
    removeAttr(skipGameButton, 'style');
    game.start()
});

skipGameButton.addEventListener('click', function (event) {
  event.preventDefault();
});

// Relance une partie
// depuis la modal de fin de jeu
restartInEnding.addEventListener('click', function (event) {
  event.preventDefault();
  endingModalContainer.className = 'hide';
  removeAttr(endingModal, 'style');
  game.start();
});
// depuis l'écran des parties du cv remportées
restartInGallery.addEventListener('click', function (event) {
  event.preventDefault();
  gallery.className = 'hide';
  removeAttr(gallery, 'style');
  game.start();
});


// Génère une position X aléatoire
function random (min, max) {
  return Math.random() * ((max - min) - min) + min;
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

// Affiche la modal de fin de partie
function showEndModal (config) {
  var scoreParagraph = document.getElementById('score');
  var messageParagraph = document.getElementById('message');
  endingModalContainer.style.width = config.canvasWidth + 'px';
  endingModalContainer.style.height = config.canvasHeight + 'px';
  scoreParagraph.innerHTML = [
    '<span class="score-label">Score:</span>',
    '<span class="score-value">',
    config.newScore.score,
    '</span>'
  ].join('');
  messageParagraph.innerHTML = config.text;
  endingModalContainer.className = 'flex';
  if (partsUnlocked.length === 0) {
    seePartsUnlocked.className = 'hide'
  } else {
    seePartsUnlocked.className = 'show'
  }
};

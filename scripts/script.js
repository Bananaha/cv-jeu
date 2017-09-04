var game;

var pressedKeys = {};
var partsUnlocked = [];
var index = 0;

var textMessage = {
  lvl0: {
    endMessage: 'Oh non...il reste tant à découvrir, rejouez!'
  },
  lvl1: {
    notificationText: 'Volet compétences débloqué',
    endMessage: 'Bravo, vous avez débloqué les compétences! Rejouez pour débloquer d\'avantage !'
  },
  lvl2: {
    notificationText: 'Volet diplômes débloqué',
    endMessage: 'Woooh, vous avez débloqué les compétences et les diplômes, vous êtes sur la bonne voie. Rejouez !'
  },
  lvl3: {
    notificationText: 'Volet expériences débloqué',
    endMessage: 'Fingers in the nose ! Compétences, Diplômes et Expériences..plus qu\'un seul niveau.'
  },
  lvl4: {
    notificationText: 'Volet intérêts débloqué',
    endMessage: 'C\'est gagné, c\'est gagné, you did it yeah!'
  }
};
var result = textMessage.lvl0.endMessage;

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
  unicornRainbow: './assets/unicorn-rainbow.png',
  unicornSprite: './assets/unicorn-sprite.png'
};


// forcer le boolean / hasRequestAnimationFrame = true
var hasRequestAnimationFrame = !!window.requestAnimationFrame;

var requestAnimation = hasRequestAnimationFrame ? window.requestAnimationFrame : function timeout(callback) {
  setTimeout(callback, 25);
};

var openingModal = document.getElementById('opening-modal');
var startGameButton = document.getElementById('start-game-button');
var skipGameButton = document.getElementById('skip-game-button');

var endingModalContainer = document.getElementById('ending-modal-container');
var endingModal = document.getElementById('ending-modal');
var restartInEnding = document.getElementById('restart-in-ending');
var seeUnlockedParts = document.getElementById('parts-unlocked');

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

var gameImages = {};
var imagesCount = Object.keys(IMG).length;
var loadedImagesCount = 0;

// lancement du jeu dès que l'ensemble des images sont chargées
for (var key in IMG) {
  var image = new Image();
  image.src = IMG[key];
  image.onload = onImageLoad(key, image);
}

function onImageLoad(key, image) {

  return function() {
    loadedImagesCount++;
    var imageSize = getImageSize(image);
    gameImages[key] = {
      src: image,
      height: imageSize.height,
      width: imageSize.width

    };

    if (loadedImagesCount === imagesCount) {

      var loader = document.getElementById('rainbow-container');
      
      loader.style.display = 'none';
      loader.className = 'hide';
      openingModal.className = 'show';

      game = new Game();
      openingModal.style.width = game.getSize().canvasWidth + 'px';
      openingModal.style.height = game.getSize().canvasHeight + 'px';

    }
  }
}

// Event listeners sur les touches du clavier

window.addEventListener("keydown", function (event) {

  if (event.key !== undefined) {

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === ' ' || event.key === 'Up' || event.key === 'Down') { 
      event.preventDefault();
    }
    pressedKeys[event.key] = true;
  
  } else if (event.keyCode !== undefined) {

    if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 32) { 
      event.preventDefault();
    }
    pressedKeys[event.keyCode] = true;

  }
}, true);



window.addEventListener('keyup', function (event) {
  
  if (event.key !== undefined) {
    
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === ' ' || event.key === 'Up' || event.key === 'Down') { 
      event.preventDefault();
    }
    pressedKeys[event.key] = false;

  } else if (event.keyCode !== undefined) {
    
    if (event.keyCode === '38' || event.keyCode === '40' || event.keyCode === '32') { 
      event.preventDefault();
    }
    pressedKeys[event.keyCode] = false;

  }
}, true);

// Bouton permettant de consulter les parties du cv
seeUnlockedParts.addEventListener('click', function (event) {
  
  event.preventDefault();
  
  endingModalContainer.className = 'hide';
  endingModal.removeAttribute('style');
  
  gallery.style.width = game.getSize().canvasWidth + 'px';
  gallery.style.height = game.getSize().canvasHeight + 'px';
  gallery.className = 'show';

  partsUnlocked[index].className = 'show';
  partIndex.innerHTML = [
    '<span class="gallery-current-page">',
    index + 1,
    '</span>',
    '<span class="gallery-pages-count">/',
    partsUnlocked.length,
    '</span>'
  ].join('');

  if (partsUnlocked.length > 1) {

    changeClassName(rightArrow, 'show');

  } else {

    changeClassName(rightArrow, 'hide');

  }
}, false);


// Flèche de navigation de la galerie
rightArrow.addEventListener('click', function () {

  partsUnlocked[index].className = 'hide';
  
  if (index < partsUnlocked.length - 1) {

    index++;
  } else {

    index = 0;
  }
  
  partsUnlocked[index].className = 'show';
  
  if (index > 0) {

    changeClassName(leftArrow, 'show');

  } else {

    changeClassName(leftArrow, 'hide');    

  }
  
  partIndex.innerHTML = index + 1 + " / " + partsUnlocked.length;
  
}, false);

function changeClassName (element, addedClass) {
  var stringToArray = element.className.split(' ');
  stringToArray.splice(stringToArray.length - 1, 1, 'addedClass');
  var arrayToString = stringToArray.join(' ');
  element.className = arrayToString;
}

leftArrow.addEventListener('click', function () {
  
  partsUnlocked[index].className = 'hide';
  
  if (index >= 1) {
    index--;
  } else {
    index = partsUnlocked.length - 1;
  }
  
  partsUnlocked[index].className = 'show';
  
  partIndex.innerHTML = index + 1 + " / " + partsUnlocked.length;
  
}, false);

startGameButton.addEventListener('click', function () {
  
    openingModal.className = 'hide';
    
    startGameButton.removeAttribute('style');
    skipGameButton.removeAttribute('style');
    startGameButton.blur();
    game.start();

}, false);

// Relance une partie
// depuis la modal de fin de jeu
restartInEnding.addEventListener('click', function (event) {
  
  event.preventDefault();
  
  endingModalContainer.className = 'hide';
  endingModal.removeAttribute('style');
  
  game.start();
  
}, false);

// depuis l'écran des parties du cv remportées
restartInGallery.addEventListener('click', function (event) {
  
  event.preventDefault();
  
  gallery.className = 'hide';
  gallery.removeAttribute('show');
  
  game.start();

}, false);

// Génère une position X aléatoire
function random (min, max) {
  return Math.random() * (max - min) + min;
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
    seeUnlockedParts.className = 'hide';
  } else {
    seeUnlockedParts.className = 'show';
  }
}

function showNotification (message) {
  inGameMessage.className = 'show';
  inGameMessage.innerHTML = message;
  
  setTimeout(function () {
    inGameMessage.className = 'hide';
  }, 3000);
};


// Browser detection scr : https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
function get_browser() {
  var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []; 
    return {
      name:'IE',
      version: (tem[1] || '')
      
    };
  }
  
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR|Edge\/(\d+)/)
    if (tem!=null) {
      return {
        name:'Opera', 
        version: tem[1]
      };
    }
  }
  M = M[2] ? [M[1] , M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1,1,tem[1]);
  }
  return {
    name: M[0],
    version: M[1]
  };
}

var browser = get_browser();

if(browser.name === 'Firefox' && browser.version < 38 || browser.name === 'Chrome' && browser.version < 29) {
  document.getElementsByTagName('html')[0].className = 'old-browsers';
}

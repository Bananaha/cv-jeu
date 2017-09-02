function Background (config) {
  
  var creationDate = Date.now();
  var pinkBackgroundHeight = 165;
  var pinkGradientBackgroundHeight = 433;
  
  this.context = config.context;

  var PARAMS_BY_IMAGE = {
    mountainBack: {
      velocity: 0.01
    },
    mountainMiddle: {
      velocity: 0.014
    },
    cloud1: {
      velocity: 0.02,
      yOffset: 250,
      xOffset: 100,
      spaceBetween: 850
    },
    mountainFront: {
      velocity: 0.03
    },
    forestBack: {
      velocity: 0.05,
      yOffset: 20
    },
    forestFront: {
      velocity: 0.07,
      yOffset: -10
    },
    hillBack: {
      velocity: 0.09,
      yOffset: 10
    },
    hillFront: {
      velocity: 0.1
    },
    cloud2: {
      velocity: 0.031,
      yOffset: 400,
      xOffset: 600,
      spaceBetween: 900
    },
    cloud3: {
      velocity: 0.029,
      yOffset: 500,
      xOffset: 300,
      spaceBetween: 650
    },
    cloud4: {
      velocity: 0.03,
      yOffset: 600,
      xOffset: 700,
      spaceBetween: 800
    }
  };

  var gradientBlue = this.context.createLinearGradient(0, 0, 0, config.canvasHeight);
  gradientBlue.addColorStop(0, '#5189ba');
  gradientBlue.addColorStop(1, '#3c3c3c')

  var gradientPink = this.context.createLinearGradient(0, config.canvasHeight - pinkBackgroundHeight, 0, config.canvasHeight - pinkBackgroundHeight - pinkGradientBackgroundHeight);
  gradientPink.addColorStop(0, '#8950ad');
  gradientPink.addColorStop(1, 'rgba(137, 80, 173, 0)')

  var backgroundImages = {};
  for (var key in PARAMS_BY_IMAGE) {
    var realWidth = gameImages[key].width + (PARAMS_BY_IMAGE[key].spaceBetween || 0);
    
    backgroundImages[key] = {
      image: gameImages[key].src,
      height: gameImages[key].height,
      width: gameImages[key].width,
      x: 0,
      occurrence: Math.ceil(config.canvasWidth / realWidth) + 1,
      velocity: PARAMS_BY_IMAGE[key].velocity,
      yOffset: PARAMS_BY_IMAGE[key].yOffset || 0,
      xOffset: PARAMS_BY_IMAGE[key].xOffset || 0,
      realWidth: realWidth,
      crossCounter: 0
    }
  }
  
  var randomElements = [];
  
  for (var i = 0; i < 10; i++) {
    
    var star = {
      image: gameImages.star.src,
      x: random(0, config.canvasWidth - gameImages.star.width),
      y: random(gameImages.star.height, config.canvasHeight - backgroundImages.forestBack.height)
    };
    
    for (var j = 0; j < 3; j++) {
      var bubble = {
        x: random(0, config.canvasWidth - gameImages.star.width),
        y: random(gameImages.star.height, config.canvasHeight - backgroundImages.forestBack.height),
        draw: function () {
          config.context.beginPath();
          config.context.fillStyle = 'rgba(255, 255, 255, 0.05)';
          config.context.arc(this.x, this.y, 3, 0, Math.PI * 2, true)
          config.context.fill();
          config.context.closePath();
        }
      };
      randomElements.push(star, bubble);
    }
  }

  function repeatImage (asset, date) {
    for (var i = 0; i < asset.occurrence; i++ ) {
      
      var x = asset.x + asset.xOffset + asset.realWidth * i;
      config.context.drawImage(asset.image, x, config.canvasHeight - asset.height - asset.yOffset);
    }

    asset.x = date * -asset.velocity + asset.crossCounter * asset.realWidth;

    if(asset.x <= -asset.realWidth) {
      asset.crossCounter++;
    }
  }
    
  this.render = function (renderDate) {
    // Background colors(sky)
    
    this.context.fillStyle = gradientBlue;
    this.context.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

    this.context.fillStyle = '#8950ad';
    this.context.fillRect(0, config.canvasHeight - pinkBackgroundHeight, config.canvasWidth, pinkBackgroundHeight);

    this.context.fillStyle = gradientPink;
    this.context.fillRect(0, config.canvasHeight - pinkBackgroundHeight - pinkGradientBackgroundHeight, config.canvasWidth, pinkGradientBackgroundHeight);
    
    // Random element
    randomElements.forEach(function (element) {
      if(!element.draw) {
        config.context.drawImage(element.image, element.x, element.y);
      } else {
        element.draw();
      }
    })
    
    
    // Affichage des assets du background
    var spentTime = renderDate - creationDate;
    
    for (key in PARAMS_BY_IMAGE) {
      repeatImage(backgroundImages[key], spentTime);
    }
    
  };
};

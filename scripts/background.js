function Background (config) {
  var pinkBackgroundHeight = 165;
  var pinkGradientBackgroundHeight = 433;
  this.context = config.context;
  var velocity = 2;

  var PARAMS_BY_IMAGE = {
    mountainBack: {
      velocity: 0.1,
    },
    mountainMiddle: {
      velocity: 0.14,
    },
    cloud1: {
      velocity: 0.2,
      yOffset: 250,
      xOffset: 100,
      spaceBetween: 850
    },
    mountainFront: {
      velocity: 0.3,
    },
    forestBack: {
      velocity: 0.5,
      yOffset: 20
    },
    forestFront: {
      velocity: 0.7,
      yOffset: -10
    },
    hillBack: {
      velocity: 0.9,
      yOffset: 10
    },
    hillFront: {
      velocity: 1,
    },
    cloud2: {
      velocity: 0.31,
      yOffset: 400,
      xOffset: 600,
      spaceBetween: 900
    },
    cloud3: {
      velocity: 0.29,
      yOffset: 500,
      xOffset: 300,
      spaceBetween: 650
    },
    cloud4: {
      velocity: 0.3,
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
    var imageSize = getImageSize(gameImages[key]);
    var realWidth = imageSize.width + (PARAMS_BY_IMAGE[key].spaceBetween || 0);
    backgroundImages[key] = {
      image: gameImages[key],
      height: imageSize.height,
      width: imageSize.width,
      x: 0,
      occurrence: Math.ceil(config.canvasWidth / realWidth) + 1,
      velocity: PARAMS_BY_IMAGE[key].velocity,
      yOffset: PARAMS_BY_IMAGE[key].yOffset || 0,
      xOffset: PARAMS_BY_IMAGE[key].xOffset || 0,
      realWidth: realWidth
    }
  }

  this.render = function () {
    // Background colors(sky)
    this.context.fillStyle = gradientBlue;
    this.context.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

    this.context.fillStyle = '#8950ad';
    this.context.fillRect(0, config.canvasHeight - pinkBackgroundHeight, config.canvasWidth, pinkBackgroundHeight);

    this.context.fillStyle = gradientPink;
    this.context.fillRect(0, config.canvasHeight - pinkBackgroundHeight - pinkGradientBackgroundHeight, config.canvasWidth, pinkGradientBackgroundHeight);

    // Background assets et parallax
    function repeatImage (asset) {
      for (var i = 0; i < asset.occurrence; i++ ) {
        var x = asset.x + asset.xOffset + asset.realWidth * i;
        config.context.drawImage(asset.image, x, config.canvasHeight - asset.height - asset.yOffset);
      }

      asset.x -= asset.velocity;

      if(asset.x + asset.xOffset <= - asset.realWidth) {
        asset.x = 0;
      }
    }

    for (key in PARAMS_BY_IMAGE) {
      repeatImage(backgroundImages[key]);
    }
    
    //function createCloud () {
    //  var renderDate = Date.now();
     // var x = config.canvasWidth - (this.renderDate - this.creationDate) * this.speed;
    // }
    // Definir le changement de position Y à partir de la génération de l'objet - postion initiale - durée * vitesse
    

    // var y = random(config.canvasHeight / 3, 50);
    // Définir les paramètres de l'objet
    
    // this.context.drawImage(ennemyImage, this.x - getImageSize(image).width / 2, this.y - getImageSize(image).height / 2);
  //};
  };
};

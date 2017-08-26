function Background (config) {
  var pinkBackgroundHeight = 165;
  var pinkGradientBackgroundHeight = 433;
  this.context = config.context;
  var velocity = 2;

  var PARAMS_BY_IMAGE = {
    mountainBack: {
      velocity: 0.1,
      yOffset: 0
    },
    mountainMiddle: {
      velocity: 0.14,
      yOffset: 0
    },
    mountainFront: {
      velocity: 0.3,
      yOffset: 0
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
      yOffset: 0
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
    backgroundImages[key] = {
      image: gameImages[key],
      height: imageSize.height,
      width: imageSize.width,
      x: 0,
      occurrence: Math.ceil(config.canvasWidth / imageSize.width) + 1,
      velocity: PARAMS_BY_IMAGE[key].velocity,
      yOffset: PARAMS_BY_IMAGE[key].yOffset
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
        var x = asset.x + asset.width * i;
        config.context.drawImage(asset.image, x, config.canvasHeight - asset.height - asset.yOffset);
      }

      asset.x -= asset.velocity;

      if(asset.x <= -asset.width) {
        asset.x = 0;
      }
    }

    for (key in PARAMS_BY_IMAGE) {
      repeatImage(backgroundImages[key]);
    }
  };
};

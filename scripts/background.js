function Background (config) {
  var pinkBackgroundHeight = 165;
  var pinkGradientBackgroundHeight = 433;
  this.context = config.context;

  var gradientBlue = this.context.createLinearGradient(0, 0, 0, config.canvasHeight);
  gradientBlue.addColorStop(0, 'rgb(81, 137, 186)');
  gradientBlue.addColorStop(1, 'rgb(60, 60, 60)')

  var gradientPink = this.context.createLinearGradient(0, config.canvasHeight - pinkBackgroundHeight, 0, config.canvasHeight - pinkBackgroundHeight - pinkGradientBackgroundHeight);
  gradientPink.addColorStop(0, 'rgb(137, 80, 173)');
  gradientPink.addColorStop(1, 'rgba(137, 80, 173, 0)')

  var mountainBack = new Image();
  mountainBack.src = config.assets.mountainBack;
  var mountainBackHeight = getImageSize(mountainBack).height

  var mountainMiddle = new Image();
  mountainMiddle.src = config.assets.mountainMiddle;
  var mountainMiddleHeight = getImageSize(mountainMiddle).height;

  var mountainFront = new Image();
  mountainFront.src = config.assets.mountainFront;
  var mountainFrontHeight = getImageSize(mountainFront).height;

  var forestBack = new Image();
  forestBack.src = config.assets.forestBack;
  var forestBackHeight = getImageSize(forestBack).height;

  var forestFront = new Image();
  forestFront.src = config.assets.forestFront;
  var forestFrontHeight = getImageSize(forestFront).height;

  var hillBack = new Image();
  hillBack.src = config.assets.hillBack;
  var hillBackHeight = getImageSize(hillBack).height;

  var hillFront = new Image();
  hillFront.src = config.assets.hillFront;
  var hillFrontHeight = getImageSize(hillFront).height;

  this.render = function () {
    // Background colors(sky)
    this.context.fillStyle = gradientBlue;
    this.context.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

    this.context.fillStyle = 'rgb(137, 80, 173)';
    this.context.fillRect(0, config.canvasHeight - pinkBackgroundHeight, config.canvasWidth, pinkBackgroundHeight);

    this.context.fillStyle = gradientPink;
    this.context.fillRect(0, config.canvasHeight - pinkBackgroundHeight - pinkGradientBackgroundHeight, config.canvasWidth, pinkGradientBackgroundHeight);
    // Background assets
    createAssetsPattern(this.context, mountainBack, mountainBackHeight);
    createAssetsPattern(this.context, mountainMiddle, mountainMiddleHeight);
    createAssetsPattern(this.context, mountainFront, mountainFrontHeight);
    createAssetsPattern(this.context, forestBack, forestBackHeight);
    createAssetsPattern(this.context, forestFront, forestFrontHeight);
    createAssetsPattern(this.context, hillBack, hillBackHeight);
    createAssetsPattern(this.context, hillFront, hillFrontHeight);
  };
  function createAssetsPattern (context, asset, assetHeight) {
    var pattern = context.createPattern(asset, 'repeat-x');
    context.save();
    context.translate(0, config.canvasHeight - assetHeight)
    context.fillStyle = pattern;
    context.fillRect(0, 0, config.canvasWidth, assetHeight);
    context.restore();
  }
};

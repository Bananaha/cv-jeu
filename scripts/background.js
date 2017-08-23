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

  var mountainMiddle = new Image();
  mountainMiddle.src = config.assets.mountainMiddle;

  var mountainFront = new Image();
  mountainFront.src = config.assets.mountainFront;

  var forestBack = new Image();
  forestBack.src = config.assets.forestBack;

  var forestFront = new Image();
  forestFront.src = config.assets.forestFront;

  var hillBack = new Image();
  hillBack.src = config.assets.hillBack;

  var hillFront = new Image();
  hillFront.src = config.assets.hillFront;

  this.render = function () {
    // Background colors(sky)
    this.context.fillStyle = gradientBlue;
    this.context.fillRect(0, 0, config.canvasWidth, config.canvasHeight);
    this.context.fillStyle = 'rgb(137, 80, 173)';
    this.context.fillRect(0, config.canvasHeight - pinkBackgroundHeight, config.canvasWidth, pinkBackgroundHeight);
    this.context.fillStyle = gradientPink;
    this.context.fillRect(0, config.canvasHeight - pinkBackgroundHeight - pinkGradientBackgroundHeight, config.canvasWidth, pinkGradientBackgroundHeight);
    // Background assets
    // context.drawImage(mountainMiddle, 0, config.canvasHeight - getImageSize(mountainMiddle).height);
    createAssetsPattern(this.context, config, mountainMiddle);
    this.context.drawImage(mountainFront, 0, config.canvasHeight - getImageSize(mountainFront).height);
    this.context.drawImage(mountainBack, 0, config.canvasHeight - getImageSize(mountainBack).height);
    this.context.drawImage(forestBack, 0, config.canvasHeight - getImageSize(forestBack).height);
    this.context.drawImage(forestFront, 0, config.canvasHeight - getImageSize(forestFront).height);
    this.context.drawImage(hillBack, 0, config.canvasHeight - getImageSize(hillBack).height);
    createAssetsPattern(this.context, config, hillFront);
    // this.context.drawImage(hillFront, 0, config.canvasHeight - getImageSize(hillFront).height);
  }
};

function createAssetsPattern (context, config, asset) {
  var pattern = context.createPattern(asset, 'repeat');
  context.save();
  context.translate(0, config.canvasHeight - getImageSize(asset).height)
  context.fillStyle = pattern;
  context.fillRect(0, 0, config.canvasWidth, 200);
  context.restore();
  console.log(config.canvasWidth);
}

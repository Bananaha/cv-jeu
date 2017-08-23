function Background (config) {
  this.context = config.context;

  var gradientBlue = this.context.createLinearGradient(0, 0, 0, config.canvasHeight);
  gradientBlue.addColorStop(0, 'rgb(81, 137, 186)');
  gradientBlue.addColorStop(1, 'rgb(60, 60, 60)')
  this.context.fillStyle = gradientBlue;
  this.context.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

  this.context.fillStyle = 'rgb(137, 80, 173)';
  this.context.fillRect(0, config.canvasHeight - 165, config.canvasWidth, 165);

  var gradientPink = this.context.createLinearGradient(0, config.canvasHeight - 165, 0, config.canvasHeight - 165 - 433);
  gradientPink.addColorStop(0, 'rgb(137, 80, 173)');
  gradientPink.addColorStop(1, 'rgba(137, 80, 173, 0)')
  this.context.fillStyle = gradientPink;
  this.context.fillRect(0, config.canvasHeight - 165 - 433, config.canvasWidth, 433);

  var mountainBack = new Image();
  mountainBack.src = config.mountainBack;
  this.context.drawImage(mountainBack, 0, config.canvasHeight - getImageSize(mountainBack).height);

  var mountainMiddle = new Image();
  mountainMiddle.src = config.mountainMiddle;
  this.context.drawImage(mountainMiddle, 0, config.canvasHeight - getImageSize(mountainMiddle).height);

  var mountainFront = new Image();
  mountainFront.src = config.mountainFront;
  this.context.drawImage(mountainFront, 0, config.canvasHeight - getImageSize(mountainFront).height);

  var forestBack = new Image();
  forestBack.src = config.forestBack;
  this.context.drawImage(forestBack, 0, config.canvasHeight - getImageSize(forestBack).height);

  var forestFront = new Image();
  forestFront.src = config.forestFront;
  this.context.drawImage(forestFront, 0, config.canvasHeight - getImageSize(forestFront).height);

  var hillBack = new Image();
  hillBack.src = config.hillBack;
  this.context.drawImage(hillBack, 0, config.canvasHeight - getImageSize(hillBack).height);

  var hillFront = new Image();
  hillFront.src = config.hillFront;
  this.context.drawImage(hillFront, 0, config.canvasHeight - getImageSize(hillFront).height);
  this.render = function () {
    
  }
};

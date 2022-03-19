export default class Char {
  constructor(ctx, val, x, y, fontSize, color, font, opacity10) {
    this.ctx = ctx;
    this.val = val;
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.fontSize = fontSize;
    this.color = color;
    this.font = font;
    this.opacity10 = opacity10;

    this.fadeSpeed = 100;
    this.startTime = new Date().getTime();
  }

  draw() {
    var hexAlpha = Math.round(this.opacity10).toString(16);
    if (hexAlpha.length == 1) hexAlpha = 0 + hexAlpha;
    this.ctx.fillStyle = this.color + hexAlpha;

    this.ctx.font = this.fontSize + "px " + this.font;
    this.ctx.fillText(this.val, this.x, this.y);
  }

  update() {
    this.draw();

    var endTime = new Date().getTime();
    var timeSpan = (endTime - this.startTime) / 1000;
    this.startTime = endTime;

    this.changeOpacity(timeSpan);
  }

  changeOpacity(timeSpan) {
    if (this.opacity10 == 255) this.fadeSpeed = -1 * Math.abs(this.fadeSpeed);
    else if (this.opacity10 == 0) this.fadeSpeed = Math.abs(this.fadeSpeed);

    this.opacity10 += this.fadeSpeed * timeSpan;

    if (this.opacity10 < 0) this.opacity10 = 0;
    else if (this.opacity10 > 255) this.opacity10 = 255;
  }
}

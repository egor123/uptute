<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  data() {
    return {
      // adjustable parameters
      chars: [
        "0",
        "1",
        "2",
        "3",
        "∞",
        "a",
        "b",
        "c",
        "+",
        "-",
        "≈",
        "√",
        "∫",
        "%",
        "≥",
        "α",
        "β",
        "x",
        "y",
        "π",
      ],
      charsNumberMult: [2, 1.5, 1, 0.75, 0.25],
      perNPixels: 100000,
      font: "Comfortaa",
      fontSize: [20, 24, 28, 34, 40],
      fontColour: ["#eee", "#ddd", "#ccc", "#bbb", "#afafaf"],
      coef: [0.2, 0.3, 0.45, 0.5, 0.7],

      // ---------------------
    };
  },
  props: ["fadeTimeout"],
  mounted() {
    this.setup();
    this.resized();

    setTimeout(() => {
      window.addEventListener("resize", this.resized);
      document.addEventListener("mousemove", this.mousemove);
    }, 0);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resized);
    document.removeEventListener("mousemove", this.mousemove);
  },
  methods: {
    setup() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");

      this.mouseX = window.innerWidth / 2;
      this.mouseY = window.innerHeight / 2;
    },
    resized() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      var area = this.canvas.width * this.canvas.height;

      this.charsNumber = [0, 0, 0, 0, 0];

      this.charsNumberMult.forEach((mult, id) => {
        this.charsNumber[id] = (mult * area) / this.perNPixels;
      });

      this.clearCanvas();

      this.renderChars();
    },
    renderChars() {
      this.getChars();

      for (var i = 0; i < this.charsNumber.length; i++) {
        this.setFont(i);
        this.chosenChars[i].forEach((char, id) => {
          var rndX = this.rndBtw(0, this.canvas.width);
          var rndY = this.rndBtw(0, this.canvas.height);

          this.ctx.fillText(char.val, rndX, rndY);

          this.chosenChars[i][id].x = rndX;
          this.chosenChars[i][id].y = rndY;
        });
      }
    },
    moveLayer() {
      this.clearCanvas();
      this.ctx.globalAlpha = this.alpha;

      for (var i = 0; i < this.charsNumber.length; i++) {
        this.setFont(i);

        this.chosenChars[i].forEach((char) => {
          this.ctx.fillText(
            char.val,
            char.x + (this.mouseX - this.canvas.width / 2) * this.coef[i],
            char.y + (this.mouseY - this.canvas.height / 2) * this.coef[i]
          );
        });
      }
    },
    setFont(i) {
      this.ctx.fillStyle = this.fontColour[i];
      this.ctx.font = this.fontSize[i] + "px " + this.font;
    },
    clearCanvas() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "#efefef";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.stroke();
    },
    getChars() {
      this.chosenChars = [[], [], [], [], []];
      for (var l = 0; l < this.charsNumber.length; l++) {
        for (var i = 0; i < this.charsNumber[l]; i++) {
          this.chosenChars[l].push({
            val: this.chars[this.rndBtw(0, this.chars.length - 1)],
          });
        }
      }
    },
    rndBtw(start, end) {
      return Math.floor(Math.random() * (end - start + 1) + start);
    },
    mousemove(event) {
      this.mouseX = event.x;
      this.mouseY = event.y;
      if (!this.fadeInProcess) this.moveLayer();
    },
    mouseEnter() {
      this.fadeInProcess = true;
      setTimeout(() => {
        this.moveLayer();
        this.fadeInProcess = false;
      }, this.fadeTimeout);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

canvas {
  position: absolute;
  background: var(--v-background-base);
  z-index: -1;
}
</style>

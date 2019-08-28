<template>
  <div class="canvasBox" ref="canvasBox">
    <!-- <vue-p5
      @preload="preload"
      @setup="setup"
      @draw="draw"
      @keypressed="keyPressed"
      @mousemoved="mouseMoved"
      @mousedragged="mouseDragged"
    />-->
    <vue-p5 @setup="setup" @draw="draw" />
  </div>
</template>

<script>
import VueP5 from "vue-p5";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default {
  components: {
    "vue-p5": VueP5
  },
  data() {
    return {
      // Meta stuff
      // sk: null,
      margin: 20,

      // Configurable parameters
      rotSym: this.$store.state.parameters.rotSym,
      explode: this.$store.state.parameters.explode,
      singletons: this.$store.state.parameters.singletons,
      drawInner: this.$store.state.parameters.drawInner,
      alternateInner: this.$store.state.parameters.alternateInner,
      drawColor: this.$store.state.parameters.drawColor,
      xInset: this.$store.state.parameters.xInset,
      yInset: this.$store.state.parameters.yInset,
      easing: this.$store.state.parameters.easing,
      dMaxRot: this.$store.state.parameters.dMaxRot,
      minSize: this.$store.state.parameters.minSize,
      maxSize: this.$store.state.parameters.maxSize,
      turnDistance: this.$store.state.parameters.turnDistance,

      // initial values
      x: 0,
      y: 0,
      rot: 0,
      size: 50,

      red: 255,
      blue: 255,
      green: 255,

      initialX: 0,
      initialY: 0,

      legCount: 0,

      targetX: 0,
      targetY: 0,
      targetRot: 0,
      targetSize: 50,
      targetRed: 255,
      targetBlue: 255,
      targetGreen: 255
    };
  },
  computed: {
    canvasWidth() {
      return this.$refs.canvasBox.clientWidth - this.margin;
    },
    canvasHeight() {
      return this.$refs.canvasBox.clientHeight - this.margin;
    }
  },
  mounted: function() {
    window.addEventListener("resize", this.handleResize);
  },
  destroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      console.log("resizing");
      // this.setup(this.sk);
    },
    setup(sk) {
      // this.sk = sk;
      sk.createCanvas(this.canvasWidth, this.canvasHeight);
      sk.frameRate(60);
    },
    draw(sk) {
      const width = this.canvasWidth;
      const height = this.canvasHeight;

      let distanceToTarget = sk.dist(
        this.x,
        this.y,
        this.targetX,
        this.targetY
      );

      if (distanceToTarget < this.turnDistance) {
        this.legCount++;

        if (this.singletons) {
          sk.background(0);
        }
        if (this.explode) {
          this.x = width / 2;
          this.y = height / 2;
        }
        this.initialX = this.x;
        this.initialY = this.y;
        this.targetX = sk.random(this.xInset, width - this.xInset);
        this.targetY = sk.random(this.yInset, height - this.yInset);
        this.targetRot = sk.random(
          this.rot - this.dMaxRot,
          this.rot + this.dMaxRot
        );
        this.targetSize = sk.random(this.minSize, this.maxSize);
        if (this.drawColor) {
          this.targetRed = sk.random(0, 255);
          this.targetGreen = sk.random(0, 255);
          this.targetBlue = sk.random(0, 255);
        }
        distanceToTarget = sk.dist(this.x, this.y, this.targetX, this.targetY);
      }

      const overallDistance = sk.dist(
        this.initialX,
        this.initialY,
        this.targetX,
        this.targetY
      );
      const progressPercent = 1 - distanceToTarget / overallDistance;

      const dx = this.targetX - this.x;
      this.x += dx * this.easing;

      const dy = this.targetY - this.y;
      this.y += dy * this.easing;

      const dRot = this.targetRot - this.rot;
      this.rot += dRot * this.easing;

      const dSize = this.targetSize - this.size;
      this.size += dSize * this.easing;

      const dRed = this.targetRed - this.red;
      this.red += dRed * this.easing;
      const dGreen = this.targetGreen - this.green;
      this.green += dGreen * this.easing;
      const dBlue = this.targetBlue - this.blue;
      this.blue += dBlue * this.easing;

      const centerX = width / 2;
      const centerY = height / 2;

      const sliceDegrees = 360 / this.rotSym;

      for (let i = 0; i < this.rotSym; i++) {
        const deltaRot = sliceDegrees * i;
        const p = this.getRotatedPoint(
          centerX - this.x,
          centerY - this.y,
          deltaRot + 180
        );

        const angle = (Math.atan2(p.y, p.x) / Math.PI) * 180;

        if (this.drawColor) {
          sk.fill(this.red, this.green, this.blue);
        } else {
          const lightColor = i % 2 == 0 ? 200 : 255;

          if (this.drawInner) {
            sk.fill(this.legCount % 2 == 1 ? lightColor : 0);
          } else {
            sk.fill(i % 2 == 0 ? 200 : 255);
          }
        }

        this.drawTriangle(
          sk,
          centerX + p.x,
          centerY + p.y,
          angle + this.rot,
          this.size
        );

        if (this.drawInner) {
          sk.fill(this.legCount % 2 == 1 ? 0 : 255);
          const innerSize = this.legCount % 2 == 1
            ? sk.constrain(
                (progressPercent + 0.1) * this.targetSize,
                0,
                this.targetSize
              )
            : sk.constrain(
                (1 - progressPercent + 0.1) * this.targetSize,
                0,
                this.targetSize
              );
          this.drawTriangle(
            sk,
            centerX + p.x,
            centerY + p.y,
            angle + this.rot,
            innerSize
          );
        }
      }
    },
    drawTriangle(sk, x, y, angle, size) {
      const rad1 = (angle * Math.PI) / 180;
      const rad2 = rad1 + (2 * Math.PI) / 3;
      const rad3 = rad1 + (4 * Math.PI) / 3;
      sk.triangle(
        x + Math.cos(rad1) * size,
        y + Math.sin(rad1) * size,
        x + Math.cos(rad2) * size,
        y + Math.sin(rad2) * size,
        x + Math.cos(rad3) * size,
        y + Math.sin(rad3) * size
      );
    },

    getRotatedPoint(x, y, angle) {
      const r = (angle * Math.PI) / 180;
      const rotatedX = x * Math.cos(r) - y * Math.sin(r);
      const rotatedY = x * Math.sin(r) + y * Math.cos(r);
      return new Point(rotatedX, rotatedY);
    }
  }
};
</script>

<style>
.canvasBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
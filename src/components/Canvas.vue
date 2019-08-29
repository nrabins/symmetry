<template>
  <v-flex class="canvasBox" ref="canvasBox">
    <!-- <vue-p5
      @preload="preload"
      @setup="setup"
      @draw="draw"
      @keypressed="keyPressed"
      @mousemoved="mouseMoved"
      @mousedragged="mouseDragged"
    />-->
    <vue-p5 @setup="setup" @draw="draw" />
  </v-flex>
</template>

<script>
import VueP5 from "vue-p5";

import { mapState } from "vuex";

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
      // parameters.rotSym: this.$store.state.parameters.parameters.rotSym,
      // parameters.explode: this.$store.state.parameters.parameters.explode,
      // parameters.singletons: this.$store.state.parameters.parameters.singletons,
      // parameters.drawInner: this.$store.state.parameters.parameters.drawInner,
      // parameters.alternateInner: this.$store.state.parameters.parameters.alternateInner,
      // parameters.drawColor: this.$store.state.parameters.parameters.drawColor,
      // parameters.xInset: this.$store.state.parameters.parameters.xInset,
      // parameters.yInset: this.$store.state.parameters.parameters.yInset,
      // parameters.easing: this.$store.state.parameters.parameters.easing,
      // parameters.dMaxRot: this.$store.state.parameters.parameters.dMaxRot,
      // parameters.minSize: this.$store.state.parameters.parameters.minSize,
      // parameters.maxSize: this.$store.state.parameters.parameters.maxSize,
      // parameters.turnDistance: this.$store.state.parameters.parameters.turnDistance,

      // initial values
      x: null,
      y: null,
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
    ...mapState(["parameters"]),
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
      this.sk.resizeCanvas(this.canvasWidth, this.canvasHeight);
      // this.setup(this.sk);
    },
    setup(sk) {
      // this.sk = sk;
      sk.createCanvas(this.canvasWidth, 600);
      sk.frameRate(60);
      sk.background("black");
      this.x = this.targetX = this.canvasWidth / 2;
      this.y = this.targetY = this.canvasHeight / 2;
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

      if (distanceToTarget < this.parameters.turnDistance) {
        this.legCount++;

        if (this.parameters.singletons) {
          sk.background(0);
        }
        if (this.parameters.explode) {
          this.x = width / 2;
          this.y = height / 2;
        }
        this.initialX = this.x;
        this.initialY = this.y;
        this.targetX = sk.random(
          this.parameters.xInset,
          width - this.parameters.xInset
        );
        this.targetY = sk.random(
          this.parameters.yInset,
          height - this.parameters.yInset
        );
        this.targetRot = sk.random(
          this.rot - this.parameters.dMaxRot,
          this.rot + this.parameters.dMaxRot
        );
        this.targetSize = sk.random(
          this.parameters.minSize,
          this.parameters.maxSize
        );
        if (this.parameters.drawColor) {
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
      this.x += dx * this.parameters.easing;

      const dy = this.targetY - this.y;
      this.y += dy * this.parameters.easing;

      const dRot = this.targetRot - this.rot;
      this.rot += dRot * this.parameters.easing;

      const dSize = this.targetSize - this.size;
      this.size += dSize * this.parameters.easing;

      const dRed = this.targetRed - this.red;
      this.red += dRed * this.parameters.easing;
      const dGreen = this.targetGreen - this.green;
      this.green += dGreen * this.parameters.easing;
      const dBlue = this.targetBlue - this.blue;
      this.blue += dBlue * this.parameters.easing;

      const centerX = width / 2;
      const centerY = height / 2;

      const sliceDegrees = 360 / this.parameters.rotSym;

      for (let i = 0; i < this.parameters.rotSym; i++) {
        const deltaRot = sliceDegrees * i;
        const p = this.getRotatedPoint(
          centerX - this.x,
          centerY - this.y,
          deltaRot + 180
        );

        const angle = (Math.atan2(p.y, p.x) / Math.PI) * 180;

        if (this.parameters.drawColor) {
          sk.fill(this.red, this.green, this.blue);
        } else {
          const lightColor = i % 2 == 0 ? 200 : 255;

          if (this.parameters.drawInner) {
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

        if (this.parameters.drawInner) {
          sk.fill(this.legCount % 2 == 1 ? 0 : 255);
          const innerSize =
            this.legCount % 2 == 1
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
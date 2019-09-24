let p5;

let parameters = {
  rotSym: 10,
  explode: false,
  singletons: false,
  drawInner: false,
  alternateInner: true,
  drawColor: false,
  xInset: 100,
  yInset: 100,
  easing: .04,
  dMaxRot: 540,
  minSize: 20,
  maxSize: 60,
  turnDistance: 15
}

const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0)';

export function setParameters(newParameters) {
  parameters = newParameters;
}

export function clearCanvas() {
  p5.clear();
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export function main(_p5) {
  p5 = _p5;

  const getParentDimensions = function () {
    const container = p5.canvas.parentElement;
    return {
      width: container.clientWidth,
      height: container.clientHeight
    }
  }

  const sizeCanvas = function () {
    const dimensions = getParentDimensions();
    p5.resizeCanvas(dimensions.width, dimensions.height, true);
    p5.background(BACKGROUND_COLOR);
  }

  let x = null;
  let y = null;
  let rot = 0;
  let size = 50;

  let red = 255;
  let blue = 255;
  let green = 255;

  let initialX = 0;
  let initialY = 0;

  let legCount = 0;

  let targetX = 0;
  let targetY = 0;
  let targetRot = 0;
  let targetSize = 50;
  let targetRed = 255;
  let targetBlue = 255;
  let targetGreen = 25;

  p5.setup = () => {
    const canvas = p5.createCanvas(0, 0);
    canvas.parent("p5Canvas");
    sizeCanvas();

    p5.frameRate(120);
    p5.background(BACKGROUND_COLOR);
    x = targetX = p5.width / 2;
    y = targetY = p5.height / 2;
  };

  p5.draw = () => {
    let distanceToTarget = p5.dist(
      x,
      y,
      targetX,
      targetY
    );

    if (distanceToTarget < parameters.turnDistance) {
      legCount++;

      if (parameters.singletons) {
        p5.background(BACKGROUND_COLOR);
      }
      if (parameters.explode) {
        x = p5.width / 2;
        y = p5.height / 2;
      }
      initialX = x;
      initialY = y;
      targetX = p5.random(
        parameters.xInset,
        p5.width - parameters.xInset
      );
      targetY = p5.random(
        parameters.yInset,
        p5.height - parameters.yInset
      );
      targetRot = p5.random(
        rot - parameters.dMaxRot,
        rot + parameters.dMaxRot
      );
      targetSize = p5.random(
        parameters.minSize,
        parameters.maxSize
      );
      if (parameters.drawColor) {
        targetRed = p5.random(0, 255);
        targetGreen = p5.random(0, 255);
        targetBlue = p5.random(0, 255);
      }
      distanceToTarget = p5.dist(x, y, targetX, targetY);
    }

    const overallDistance = p5.dist(
      initialX,
      initialY,
      targetX,
      targetY
    );
    const progressPercent = 1 - distanceToTarget / overallDistance;

    const dx = targetX - x;
    x += dx * parameters.easing;

    const dy = targetY - y;
    y += dy * parameters.easing;

    const dRot = targetRot - rot;
    rot += dRot * parameters.easing;

    const dSize = targetSize - size;
    size += dSize * parameters.easing;

    const dRed = targetRed - red;
    red += dRed * parameters.easing;
    const dGreen = targetGreen - green;
    green += dGreen * parameters.easing;
    const dBlue = targetBlue - blue;
    blue += dBlue * parameters.easing;

    const centerX = p5.width / 2;
    const centerY = p5.height / 2;

    const sliceDegrees = 360 / parameters.rotSym;

    for (let i = 0; i < parameters.rotSym; i++) {
      const deltaRot = sliceDegrees * i;
      const p = getRotatedPoint(
        centerX - x,
        centerY - y,
        deltaRot + 180
      );

      const angle = (Math.atan2(p.y, p.x) / Math.PI) * 180;

      if (parameters.drawColor) {
        p5.fill(red, green, blue);
      } else {
        const lightColor = i % 2 == 0 ? 200 : 255;

        if (parameters.drawInner) {
          p5.fill(legCount % 2 == 1 ? lightColor : 0);
        } else {
          p5.fill(i % 2 == 0 ? 200 : 255);
        }
      }

      drawTriangle(
        centerX + p.x,
        centerY + p.y,
        angle + rot,
        size
      );

      if (parameters.drawInner) {
        p5.fill(legCount % 2 == 1 ? 0 : 255);
        const innerSize =
          legCount % 2 == 1
            ? p5.constrain(
              (progressPercent + 0.1) * targetSize,
              0,
              targetSize
            )
            : p5.constrain(
              (1 - progressPercent + 0.1) * targetSize,
              0,
              targetSize
            );
        drawTriangle(
          centerX + p.x,
          centerY + p.y,
          angle + rot,
          innerSize
        );
      }
    }
  };

  function drawTriangle(x, y, angle, size) {
    const rad1 = (angle * Math.PI) / 180;
    const rad2 = rad1 + (2 * Math.PI) / 3;
    const rad3 = rad1 + (4 * Math.PI) / 3;
    p5.triangle(
      x + Math.cos(rad1) * size,
      y + Math.sin(rad1) * size,
      x + Math.cos(rad2) * size,
      y + Math.sin(rad2) * size,
      x + Math.cos(rad3) * size,
      y + Math.sin(rad3) * size
    );
  }

  function getRotatedPoint(x, y, angle) {
    const r = (angle * Math.PI) / 180;
    const rotatedX = x * Math.cos(r) - y * Math.sin(r);
    const rotatedY = x * Math.sin(r) + y * Math.cos(r);
    return new Point(rotatedX, rotatedY);
  }

  p5.windowResized = sizeCanvas;
}
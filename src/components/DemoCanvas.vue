<template>
  <div id="p5Canvas" ref="canvas" />
</template>

<script>

export default {
  mounted() {
    const triangles = require('@/js/Triangles.js');

    // NOTE: Use p5 as an instance mode
    const P5 = require("p5");
    new P5(triangles.main);
  },
};
</script>

<style>
#p5Canvas {
  height: 100%;
}
</style>
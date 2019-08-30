<template>
  <div id="p5Canvas" ref="canvas" />
</template>

<script>
import { main } from '@/js/Triangles'

export default {
  mounted() {
    const P5 = require("p5");
    new P5(main);
  },
};
</script>

<style>
#p5Canvas {
  height: 100%;
}
</style>
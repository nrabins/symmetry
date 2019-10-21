<template>
  <div id="p5Canvas" ref="canvas" />
</template>

<script>
import { main, setParameters } from '@/js/Triangles'

import { mapState } from 'vuex';

export default {
  mounted() {
    const P5 = require("p5");
    new P5(main);
  },
  computed: {
    ...mapState(['parameters']),
  },
  watch: {
    parameters: function (newParameters) {
      setParameters(newParameters);
    }
  }
};
</script>

<style>
#p5Canvas {
  background-color:pink;
}
</style>
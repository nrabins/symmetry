<template>
  <div class="main-container">
    <v-canvas class="tile"/>
    <dat-gui/>
  </div>
</template>

<script>
// import Controls from "@/components/Controls";
import Canvas from "@/components/Canvas";
import DatGui from '@/components/DatGui';

import * as dat from 'dat.gui';

export default {
  components: {
    // "v-canvas": Canvas,
    // "v-controls": Controls,
    "v-canvas": Canvas,
    "dat-gui": DatGui,
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

body {
  background-color: rgb(53, 53, 53);
}

.main-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tile {
  height: 500px;
  width: 500px;

  box-shadow: 5px 5px black;
}
</style>
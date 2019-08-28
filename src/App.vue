<template>
  <div id="app">
    <v-controls />
    <v-canvas id="canvas"/>
  </div>
</template>

<script>
import Controls from '@/components/Controls';
import Canvas from '@/components/Canvas'

export default {
  name: 'app',
  components: {
    "v-controls": Controls,
    "v-canvas": Canvas,
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background-color: black;
}

#canvas {
  flex-grow: 1;
}
</style>

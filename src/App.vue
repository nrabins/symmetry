<template>
  <v-canvas />
</template>

<script>
// import Controls from "@/components/Controls";
import Canvas from "@/components/Canvas";

export default {
  components: {
    // "v-canvas": Canvas,
    // "v-controls": Controls,
    "v-canvas": Canvas
  }
};
</script>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
}

body {
  background-color: rgb(53, 53, 53);
}
</style>
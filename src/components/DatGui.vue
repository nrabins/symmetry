<template>
  <div></div>
</template>

<script>
import * as dat from "dat.gui";

import { mapState } from "vuex";

export default {
  data() {
    return {
      parameters: {}
    }
  },
  methods: {
    sendParams() {
      this.$store.commit("SET_PARAMETERS", this.parameters);
    }
  },
  created() {
    this.parameters = this.$store.state.parameters;
  },
  mounted() {
    console.log("setting up dat.gui");
    // set up dat.gui

    console.log(this.parameters);

    const gui = new dat.GUI();
    gui.add(this.parameters, "drawColor").onChange(this.sendParams);
    gui.add(this.parameters, 'rotSym').onChange(this.sendParams);
    gui.add(this.parameters, 'explode').onChange(this.sendParams);
    gui.add(this.parameters, 'singletons').onChange(this.sendParams);
    gui.add(this.parameters, 'drawInner').onChange(this.sendParams);
    gui.add(this.parameters, 'alternateInner').onChange(this.sendParams);
    gui.add(this.parameters, 'xInset').onChange(this.sendParams);
    gui.add(this.parameters, 'yInset').onChange(this.sendParams);
    gui.add(this.parameters, 'easing').onChange(this.sendParams);
    gui.add(this.parameters, 'dMaxRot').onChange(this.sendParams);
    gui.add(this.parameters, 'minSize').onChange(this.sendParams);
    gui.add(this.parameters, 'maxSize').onChange(this.sendParams);
    gui.add(this.parameters, 'turnDistance').onChange(this.sendParams);
  }
};
</script>
<template>
  <!-- <v-layout wrap>
    <v-flex>
      <v-btn block outlined @click="clear">Clear</v-btn>
    </v-flex>
    <v-flex xs12>
      <v-text-field type="number" v-model="parameters.rotSym" @change="update" label="# Triangles" />
    </v-flex>
    <v-flex xs12>
      <v-checkbox v-model="parameters.drawColor" @change="update" label="Use Color" />
    </v-flex>
  </v-layout> -->
  <div>
    Controls
  </div>
</template>

<script>
import { clearCanvas } from "@/js/Triangles";

import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      parameters: state => state.parameters
    })
  },
  methods: {
    update() {
      this.$store.commit("SET_PARAMETERS", this.parameters);
    },
    clear() {
      clearCanvas();
    }
  }
};
</script>
<template>
  <v-checkbox v-model="parameters.drawColor" @change="updateColor" label="Use Color"/>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      parameters: state => state.parameters
    })
  },
  methods: {
    updateColor(val) {
      let newParameters = {...this.parameters};
      newParameters.drawColor = val;
      this.$store.commit('SET_PARAMETERS', newParameters);
    }
  }  
}
</script>

<style>
.controls {
  background-color: rgb(209, 209, 209);
}
</style>
<template>
  <div class="controls">
    <input placeholder="Color" :value="parameters.color" @input="updateColor"/>
    Controls over here
  </div>
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
    updateColor(e) {
      let newParameters = {...this.parameters};
      newParameters.color = e.target.value;
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
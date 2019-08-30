<template>
  <v-layout>
    <v-checkbox v-model="parameters.drawColor" @change="updateColor" label="Use Color"/>
  </v-layout>
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
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parameters: {
      rotSym: 10,
      explode: false,
      singletons: false,
      drawInner: false,
      alternateInner: true,
      drawColor: true,
      xInset: 100,
      yInset: 100,
      easing: .01,
      dMaxRot: 540,
      minSize: 20,
      maxSize: 60,
      turnDistance: 15
    }
  },
  mutations: {
    SET_PARAMETERS(state, parameters) {
      state.parameters = parameters;
    }
  },
})

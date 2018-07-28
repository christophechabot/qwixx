import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initNumberBoxesArray = (isGoingUp) => {
  return [
    ...Array.from(new Array(11), (val, index) => ({ 
      number: isGoingUp ? (index + 2) : (12 - index),
      checked: false
    })),
    {
      number: 0,
      checked: false
    }
  ];
}

export default new Vuex.Store({
  state: {
    boxes: {
      red: initNumberBoxesArray(true),
      yellow: initNumberBoxesArray(true),
      green: initNumberBoxesArray(false),
      blue: initNumberBoxesArray(false)
    },
    misses: [false, false, false, false]
  },
  mutations: {
    tickNumberBox(state, payload) {
      Vue.set(
        state.boxes[payload.color],
        payload.index,
        Object.assign({}, state.boxes[payload.color][payload.index], { checked: true })
      );
    },
    tickMiss(state, index) {
      Vue.set(
        state.misses,
        index,
        true
      )
    },
    emptySheet(state) {
      state.boxes = {
        red: initNumberBoxesArray(true),
        yellow: initNumberBoxesArray(true),
        green: initNumberBoxesArray(false),
        blue: initNumberBoxesArray(false)
      };
      state.misses = [false, false, false, false];
    }
  },
  actions: {
    tickNumberBox(context, payload) {
      context.commit('tickNumberBox', payload);
    },
    tickMiss(context, index) {
      context.commit('tickMiss', index);
    },
    resetSheet(context) {
      context.commit('emptySheet', { reset: true });
    },
    emptySheet(context) {
      context.commit('emptySheet');
    }
  },
  getters: {
    numberBoxes: (state) => (color) => state.boxes[color],
    misses: (state) => state.misses
  }
})

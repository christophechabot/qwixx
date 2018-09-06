import Vue from 'vue'
import Vuex from 'vuex'

import { TYPE_NORMAL, TYPE_RAINBOW, TYPE_SHUFFLE } from './constants';

Vue.use(Vuex);

const initNormalRow = (color, isGoingUp) => {
  return [
    ...Array.from(new Array(11), (val, index) => ({ 
      number: isGoingUp ? (index + 2) : (12 - index),
      ticked: false,
      color
    })),
    {
      number: 0,
      ticked: false,
      color
    }
  ];
};

const initShuffledRow = (color) => {
  const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11 , 12];
  for (let k=0; k<100; k++) {
    const i = Math.floor(Math.random() * 11);
    const j = Math.floor(Math.random() * 11);
    const temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }
  return [
    ...Array.from(new Array(11), (val, index) => ({ 
      number: numbers[index],
      ticked: false,
      color
    })),
    {
      number: 0,
      ticked: false,
      color
    }
  ];
};

const initBoxes = (type) => {
  if (type === TYPE_NORMAL) {
    return {
      red: initNormalRow('red', true),
      yellow: initNormalRow('yellow', true),
      green: initNormalRow('green', false),
      blue: initNormalRow('blue', false) 
    }
  } else if (type === TYPE_RAINBOW) {
    return {
      red: [
        { number: 2, ticked: false, color: 'yellow' },
        { number: 3, ticked: false, color: 'yellow' },
        { number: 4, ticked: false, color: 'yellow' },
        { number: 5, ticked: false, color: 'blue' },
        { number: 6, ticked: false, color: 'blue' },
        { number: 7, ticked: false, color: 'blue' },
        { number: 8, ticked: false, color: 'green' },
        { number: 9, ticked: false, color: 'green' },
        { number: 10, ticked: false, color: 'green' },
        { number: 11, ticked: false, color: 'red' },
        { number: 12, ticked: false, color: 'red' },
        { number: 0, ticked: false, color: 'red' }
      ],
      yellow: [
        { number: 2, ticked: false, color: 'red' },
        { number: 3, ticked: false, color: 'red' },
        { number: 4, ticked: false, color: 'green' },
        { number: 5, ticked: false, color: 'green' },
        { number: 6, ticked: false, color: 'green' },
        { number: 7, ticked: false, color: 'green' },
        { number: 8, ticked: false, color: 'blue' },
        { number: 9, ticked: false, color: 'blue' },
        { number: 10, ticked: false, color: 'yellow' },
        { number: 11, ticked: false, color: 'yellow' },
        { number: 12, ticked: false, color: 'yellow' },
        { number: 0, ticked: false, color: 'yellow' }
      ],
      green: [
        { number: 12, ticked: false, color: 'blue' },
        { number: 11, ticked: false, color: 'blue' },
        { number: 10, ticked: false, color: 'blue' },
        { number: 9, ticked: false, color: 'yellow' },
        { number: 8, ticked: false, color: 'yellow' },
        { number: 7, ticked: false, color: 'yellow' },
        { number: 6, ticked: false, color: 'red' },
        { number: 5, ticked: false, color: 'red' },
        { number: 4, ticked: false, color: 'red' },
        { number: 3, ticked: false, color: 'green' },
        { number: 2, ticked: false, color: 'green' },
        { number: 0, ticked: false, color: 'green' }
      ],
      blue: [
        { number: 12, ticked: false, color: 'green' },
        { number: 11, ticked: false, color: 'green' },
        { number: 10, ticked: false, color: 'red' },
        { number: 9, ticked: false, color: 'red' },
        { number: 8, ticked: false, color: 'red' },
        { number: 7, ticked: false, color: 'red' },
        { number: 6, ticked: false, color: 'yellow' },
        { number: 5, ticked: false, color: 'yellow' },
        { number: 4, ticked: false, color: 'blue' },
        { number: 3, ticked: false, color: 'blue' },
        { number: 2, ticked: false, color: 'blue' },
        { number: 0, ticked: false, color: 'blue' }
      ]
    };
  } else if (type === TYPE_SHUFFLE) {
    return {
      red: initShuffledRow('red'),
      yellow: initShuffledRow('yellow'),
      green: initShuffledRow('green'),
      blue: initShuffledRow('blue') 
    }
  }
};



export default new Vuex.Store({
  state: {
    boxes: {
      red: [],
      yellow: [],
      green: [],
      blue: []
    },
    misses: null,
    type: null
  },
  mutations: {
    tickNumberBox(state, payload) {
      Vue.set(
        state.boxes[payload.color],
        payload.index,
        Object.assign({}, state.boxes[payload.color][payload.index], { ticked: true })
      );
    },
    tickMiss(state, index) {
      Vue.set(
        state.misses,
        index,
        true
      )
    },
    emptySheet(state, options = {}) {
      const type = options.type || TYPE_NORMAL;
      state.boxes = initBoxes(type);
      state.misses = [false, false, false, false];
      state.type = type;
    }
  },
  actions: {
    tickNumberBox(context, payload) {
      context.commit('tickNumberBox', payload);
    },
    tickMiss(context, index) {
      context.commit('tickMiss', index);
    },
    resetSheet(context, type) {
      context.commit('emptySheet', { reset: true, type });
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

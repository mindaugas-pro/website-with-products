import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    subtotalBasePrice: null,
    subtotalTotalPrice: null
  },
  mutations: {
    SET_SUBTOTAL_BASE_PRICE (state, value) {
      state.subtotalBasePrice = value
    },
    SET_SUBTOTAL_TOTAL_PRICE (state, value) {
      state.subtotalTotalPrice = value
    }
  },
  getters: {
    getSubtotalBasePrice: state => {
      return state.subtotalBasePrice
    },
    getSubtotalTotalPrice: state => {
      return state.subtotalTotalPrice
    }
  },
  actions: {},
  modules: {
  }
})

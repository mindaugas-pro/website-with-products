import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productEdit: {},
    productEditIndex: null
  },
  mutations: {
    SET_PRODUCT_EDIT (state, value) {
      state.productEdit.code = value.code
      state.productEdit.name = value.name
      state.productEdit.basePrice = value.basePrice
      state.productEdit.totalPrice = value.totalPrice
    },
    SET_PRODUCT_EDIT_EMPTY (state) {
      state.productEdit = {}
    },
    SET_PRODUCT_EDIT_INDEX (state, value) {
      state.productEditIndex = value
    }
  },
  getters: {
    getProductEdit: state => {
      return state.productEdit
    },
    getProductEditIndex: state => {
      return state.productEditIndex
    }
  },
  actions: {
  },
  modules: {
  }
})

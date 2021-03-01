import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectFoods: []
  },
  mutations: {
    addFoods(state, foods) {
      state.selectFoods.push(foods)
    },
    removeFoods(state, foodID) {
      const findIndex = state.selectFoods.findIndex(item => item.foodID === foodID)
      state.selectFoods.splice(findIndex, 1)
    },
    changeFoods(state, { foodID, count }) {
      let food = state.selectFoods.find(item => item.foodID === foodID)
      food.count = count
    }
  },
  actions: {
  },
  modules: {
  }
})

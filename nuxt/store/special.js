// Vuex State
export const state = () => {
  return {
    categoryList: [],
    hotList: []
  }
}

// Vuex Mutations
export const mutations = {
  setCategoryList (state, list) {
    state.categoryList = list
  },

  setHotList (state, list) {
    state.hotList = list
  }
}

// Vuex Actions
export const actions = {
  async getCategoryList (context) {
    const { data } = await this.$axios.get('topic/classification')
    context.commit('setCategoryList', data.result || [])
  },

  async getHotList (context) {
    const { data } = await this.$axios.get('topic/hot')
    context.commit('setHotList', data.result || [])
  }
}

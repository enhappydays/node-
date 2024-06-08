import Vue from 'vue'
import Vuex from 'vuex'
import { fetchItem } from '../api/item'

Vue.use(Vuex)

// 创建一个工厂方法, 返回一个新的 Vuex Store 实例
export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    mutations: {
      setItem(state, { id, item }) {
        // 给对象动态新增属性, vue2 监听不到, 需要 Vue.set
        Vue.set(state.items, id, item)
      }
    },
    actions: {
      async fetchItem ({ commit }, id) {
        const item = await fetchItem(id)
        // 将获取到的数据存入当前的 store 的 state 中
        commit('setItem', { id, item })
      }
    }
  })
}
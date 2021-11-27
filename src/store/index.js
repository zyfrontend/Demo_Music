import Vue from 'vue'
import Vuex from 'vuex'


// 模块化
import discover from './module/discover'
import player from './module/player'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    discover,
    player
  }
})

export default store
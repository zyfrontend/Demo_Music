import Vue from 'vue'
import Vuex from 'vuex'


// 模块化
import discover from './module/discover'
import player from './module/player'
import login from './module/login'
import daily from './module/daily'
import collect from './module/collect'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    discover,
    player,
    login,
    daily,
    collect
  }
})

export default store
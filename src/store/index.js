import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
  cartList: []
}

//2.创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//3.导出和挂载
export default store
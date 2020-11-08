import Vue from 'vue'
import Vuex,{StoreOptions} from 'vuex'
import userInfo from '@/store/userInfo';
import {RootState} from '@/store/store';

Vue.use(Vuex)

const store: StoreOptions<RootState> ={
  state: {
    version: '1.0.0', // a simple property
    coder: 'Posden',
  },
  mutations: {
  },
  actions: {
    abc(){

    }
  },
  modules: {
    userInfo:userInfo,
  }
}

export default new Vuex.Store<RootState>(store)


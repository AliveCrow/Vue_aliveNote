import Vue from 'vue'
import Vuex,{StoreOptions} from 'vuex'
import userInfo from '@/store/userInfo';
import {RootState} from '@/store/store';
import notesStore from '@/store/notesStore';

Vue.use(Vuex)

const store: StoreOptions<RootState> ={
  state: {
    version: '1.0.0', // a simple property
  },
  mutations: {
  },
  actions: {

  },
  getters:{},
  modules: {
    userInfo,
    notesStore,
  }
}

export default new Vuex.Store<RootState>(store)


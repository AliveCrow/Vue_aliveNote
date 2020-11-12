import {notesStoreState, RootState} from '@/store/store';
import {ActionTree, GetterTree, Mutation, MutationTree} from 'vuex';
import Vue from 'vue';


const state: notesStoreState = {
    notes: []
};
const mutations: MutationTree<notesStoreState> = {
    setNotes(state,obj){
        state.notes = obj
    }


};
const actions: ActionTree<notesStoreState, RootState> = {
     async getNotes(context) {
         try {
             let res = await Vue.axios.get('/labels')
             return new Promise((resolve, reject) => {
                 if (res.data.stateCode === 0) {
                     context.commit('setNotes',res.data.res)
                     resolve(res.data)
                 } else {
                     reject(res)
                 }
             })
         }catch (error){
             Vue.$toast.error(error.msg)
             return error
         }

    }
};
const getters: GetterTree<notesStoreState, RootState> = {};

const notesStore = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default notesStore;
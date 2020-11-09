import {notesStoreState, RootState} from '@/store/store';
import {ActionTree, GetterTree, Mutation, MutationTree} from 'vuex';
import Vue from 'vue';


const state: notesStoreState = {
    notes: []
};
const mutations: MutationTree<notesStoreState> = {


};
const actions: ActionTree<notesStoreState, RootState> = {
    async getNotes(context) {
        try {
            let res = await Vue.axios.get('/label');
            if (res.data.stateCode === 0) {
                return res.data.res
            }
        } catch (err) {
            Vue.$toast.error(err.msg)
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
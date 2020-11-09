import {userInfoState, RootState} from '@/store/store';
import {MutationTree, GetterTree, StoreOptions, Module, ActionTree} from 'vuex';
import Vue from 'vue';


const state: userInfoState = {
    login: {
        username: '',
        password: ''
    },
    userInfo: {
        id: 0,
        username: '',
        nickname: '',
        email: '',
        avatar: ''
    }
};
export const mutations: MutationTree<userInfoState> = {
    getLoginInfo(state, loginInfo) {
        state.login = loginInfo;
    },
    setUserInfo(state, userInfo) {
        state.userInfo = {
            id: userInfo.id,
            username: userInfo.username,
            nickname: userInfo.nickname,
            email: userInfo.email,
            avatar: userInfo.avatar
        };
    }

};
export const actions: ActionTree<userInfoState, RootState> = {
    async login(context) {
        try{
            let res = await Vue.axios.post('/login', context.state.login);
            if (res.data.stateCode === -1) {
                Vue.$toast.error(res.data.msg);
                return false
            } else {
                Vue.$toast.success('登录成功');
                localStorage.setItem('jwt_token', res.data.token);
                localStorage.setItem('AliveUserId', res.data.id);
                return true
            }
        }catch(err){
            Vue.$toast.warning('接口错误');
        }

    }
};
export const getters: GetterTree<userInfoState, RootState> = {};


const userInfo: Module<userInfoState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default userInfo;
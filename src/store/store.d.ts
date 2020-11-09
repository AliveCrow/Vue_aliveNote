import {ActionTree, GetterTree, ModuleTree, Mutation, MutationTree, Plugin} from 'vuex';


export interface RootState { // 定义的接口要跟根store 中 state 一致，上面截图可反映，泛型传递在state上
    version: string;
}


export interface Root {
    state?: RootState,

}
export interface userInfoState<T = any> {
    login: {
        username: string,
        password: string,
    },
    userInfo:{
        id:number,
        username:string,
        nickname:string,
        email:string,
        avatar:string
    }
}
export interface notesStoreState<T =any>{
    notes:[],
    id?:number,
    userId?:number,
    archiveId?:number |null,
    recycleId?:number|null,
    title?:string,
    color?:string,
    content?:string,
    isTop?:boolean|false,
    tags?:[]
}

export type MutationA<S> = (state: stateConfig, payload?: any) => any;

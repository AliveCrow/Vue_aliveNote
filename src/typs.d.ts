import {Vue} from 'vue/types/vue';
import {POSITION} from 'vue-toastification';
import {ToastOptions} from 'vue-toastification/dist/types/src/types';
import {CommonOptions} from 'vue-toastification/src/types/index';


interface GlobalConfig {
    username: Element
}
interface successClassConfig {
    (el: Element, el_msg: HTMLSpanElement): void
}
interface failClassConfig {
    (el: Element, el_msg: HTMLSpanElement, msg: string): void
}
interface user {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    email: string
}
interface  NoteDataType {
    id:number;
    color:string;
    archiveId:number|null;
    userId:number;
    isTop:boolean;
    Tags:[]
}


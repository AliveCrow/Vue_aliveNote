import {Vue} from 'vue/types/vue';




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



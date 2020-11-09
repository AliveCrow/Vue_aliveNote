import Vue, {VNode} from 'vue';
import {AxiosRequestConfig} from 'axios';
import {ComponentOptions} from 'vue/types/options';

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {
        }

        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {
        }

        interface IntrinsicElements {
            [elem: string]: any;
        }
    }

}

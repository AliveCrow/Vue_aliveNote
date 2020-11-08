import Vue, { VNode } from 'vue'
import {AxiosRequestConfig} from 'axios';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

 interface GlobalConfig {
    username:Element
  }

  interface successClassConfig {
    (el:Element,el_msg:HTMLSpanElement) : void
  }
  interface failClassConfig {
    (el:Element,el_msg:HTMLSpanElement,msg:string) : void
  }
  interface refsConfig {
    username:string;
  }
 type user={
    id:number;
    username:string;
    nickname:string;
    avatar:string;
    email:string
}




}

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45ad64a9"],{"0498":function(e,t,i){},"59ff":function(e,t,i){"use strict";i("0498")},b3e3:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"Rec_app"}},[i("section",{staticStyle:{display:"flex","justify-content":"center","align-items":"center","margin-bottom":"40px"}},[i("h2",[e._v("回收站中的内容将会在7天后删除")]),i("span",{staticClass:"clear ",on:{click:e.clear}},[e._v("清空回收站")])]),i("Waterfalls",{attrs:{"list-arr":e.recList}})],1)},s=[],r=i("ddb5"),a=i("bedc"),c=i("ce1e"),o=i("ce9d"),l=(i("8d1b"),i("6249"),i("fd63")),u=i("e4a1"),f=i("bc85"),d=function(e){Object(c["a"])(i,e);var t=Object(o["a"])(i);function i(){var e;return Object(r["a"])(this,i),e=t.apply(this,arguments),e.recList=[],e}return Object(a["a"])(i,[{key:"init",value:function(){var e=this;this.axios.get("/labels/deleted").then((function(t){e.recList=t.data.res}))}},{key:"beforeCreate",value:function(){var e=this;this.axios.delete("/recycle/expire").then((function(t){0!==t.data.res&&e.$toast.info("已更新"),e.init()}))}},{key:"created",value:function(){this.init()}},{key:"mounted",value:function(){this.$EventBus.$on("deleteNoteFover",this.deleteNoteFover),this.$EventBus.$on("restoreNote",this.restoreNote)}},{key:"deleteNoteFover",value:function(e){this.recList.splice(this.recList.findIndex((function(t){return t.id===e.id})),1)}},{key:"restoreNote",value:function(e){this.recList.splice(this.recList.findIndex((function(t){return t.id===e.id})),1)}},{key:"beforeDestroy",value:function(){this.$EventBus.$off("deleteNoteFover"),this.$EventBus.$off("restoreNote")}},{key:"clear",value:function(){var e=this;this.axios.delete("/recycle/all").then((function(t){e.$toast.error("清空成功"),e.init()}))}}]),i}(u["e"]);d=Object(l["a"])([Object(u["a"])({components:{Waterfalls:f["a"]}})],d);var v=d,h=v,b=(i("59ff"),i("cba8")),p=Object(b["a"])(h,n,s,!1,null,"a577a5d4",null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-45ad64a9.6070826e.js.map
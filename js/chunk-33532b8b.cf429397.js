(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33532b8b"],{"8f32":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container-box__right"},[i("InputCard",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:t.close,expression:"close"}],attrs:{isShow:t.isShow},on:{"update:isShow":function(e){t.isShow=e},"update:is-show":function(e){t.isShow=e},submit:t.updateList}}),i("div",{staticClass:"magic_box"},[i("div",{staticClass:"top_note list"},[i("div",{staticStyle:{"text-align":"left","font-size":"1.1rem","padding-bottom":"10px"}},[t._v("置顶的notes ")]),i("div",{directives:[{name:"show",rawName:"v-show",value:0===t.topList.length,expression:"topList.length===0"}]},[t._v("没有置顶的notes目前")]),i("Waterfalls",{attrs:{listArr:t.topList},on:{"update:isTop":!0,asyncListArr:t.changeNote}})],1),i("div",{staticClass:"list"},[i("div",{staticStyle:{"text-align":"left","font-size":"1.1rem","padding-bottom":"10px"}},[t._v("notes")]),i("div",{directives:[{name:"show",rawName:"v-show",value:0===t.list.length,expression:"list.length===0"}]},[t._v("没有notes目前")]),i("Waterfalls",{attrs:{listArr:t.list},on:{"update:isTop":!1,asyncListArr:t.changeNote}})],1)]),i("sweet-modal",{ref:"modal",on:{close:t.save},scopedSlots:t._u([{key:"title",fn:function(){return[i("span",{ref:"title",staticStyle:{padding:"10px",border:"none",outline:"none"},attrs:{contenteditable:""},domProps:{innerHTML:t._s(t.clickedNoteData.title)}})]},proxy:!0}])},[i("div",{staticClass:" NoteCard_app_content",staticStyle:{"overflow-y":"auto!important","max-height":"60vh"}},[i("div",{ref:"input_2",staticClass:"input_2",staticStyle:{"text-align":"left",padding:"8px 8px 0",border:"none",outline:"none","letter-spacing":"1px"},attrs:{id:"two",contenteditable:""},domProps:{innerHTML:t._s(t.clickedNoteData.content)}})]),i("div",{staticClass:"showTag",staticStyle:{"flex-wrap":"wrap!important","margin-top":"20px"}},t._l(t.clickedNoteData.Tags,(function(e,s){return i("div",{key:s,staticClass:"showTag_foreach"},[t._v(" "+t._s(e.name)+" ")])})),0),i("BottomFunc",{staticStyle:{opacity:"1",position:"relative","margin-bottom":"-20px"},attrs:{note:t.clickedNoteData},on:{"update:note":function(e){t.clickedNoteData=e}}})],1)],1)},o=[],a=i("ddb5"),n=i("bedc"),c=i("ce1e"),l=i("ce9d"),r=(i("28fd"),i("a9b6"),i("6249"),i("8d1b"),i("fd63")),u=i("e4a1"),d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"box__right_input",staticClass:"container-box__right_input"},[i("div",{staticClass:"input_box"},[i("label",{attrs:{for:"one"}},[i("input",{ref:"input_title",staticClass:"input_1",attrs:{type:"text",id:"one",placeholder:"标题"},on:{focus:function(e){t.show=!0}}})]),i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"to_top",on:{click:function(e){t.isTop=!t.isTop}}},[t.isTop?i("eva-icon",{staticClass:"icons  ",attrs:{name:"toggle-right"}}):i("eva-icon",{staticClass:"icons",attrs:{name:"toggle-left-outline"}})],1),i("blockquote",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[i("div",{ref:"input_2",staticClass:"input_2",attrs:{id:"two",contenteditable:"true"}}),i("div",{staticClass:"showTag"},t._l(t.selectedTags,(function(e){return i("div",{key:e.id,staticClass:"showTag_foreach"},[t._v(" "+t._s(e.name)+" ")])})),0),i("div",{staticClass:"input_box__fun"},[i("div",[i("blockquote",{staticStyle:{display:"inline",position:"relative"},on:{click:function(e){t.cardShow=!t.cardShow}}},[i("eva-icon",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:t.closeCard,expression:"closeCard"}],staticClass:"icons add_color",attrs:{name:"color-palette-outline"}}),i("Card",{attrs:{height:"104px",width:"138px",isShow:t.cardShow,animationName:"fade","class-name":"colorSelect"},scopedSlots:t._u([{key:"content",fn:function(){return[i("ul",{staticClass:"color_box"},t._l(t.colorArr,(function(e,s){return i("li",{key:s,style:{"background-color":e},on:{click:function(i){return t.selectColor(e)}}})})),0)]},proxy:!0}])})],1),i("blockquote",{staticStyle:{display:"inline"},on:{click:t.goArchive}},[i("eva-icon",{staticClass:"icons archive",attrs:{name:"archive-outline"}})],1),i("blockquote",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:t.closeTagCard,expression:"closeTagCard"}],staticStyle:{display:"inline",position:"relative"}},[i("eva-icon",{staticClass:"icons tags",attrs:{name:"bookmark-outline"},on:{click:function(e){t.cardTagShow=!t.cardTagShow}}}),i("Card",{attrs:{height:"200px",isShow:t.cardTagShow,animationName:"fade","class-name":"tagsSelect"},scopedSlots:t._u([{key:"content",fn:function(){return[i("ul",{staticClass:"tags_box"},t._l(t.allTags,(function(e,s){return i("li",{key:e.id,on:{click:function(i){return t.selectTag(e)}}},[t.selectedTags.includes(e)?i("eva-icon",{staticStyle:{"line-height":"12px"},attrs:{name:"checkmark-square-2-outline",height:"18px"}}):i("eva-icon",{staticStyle:{"line-height":"12px"},attrs:{name:"square-outline",height:"18px"}}),i("p",[t._v(t._s(e.name))])],1)})),0)]},proxy:!0}])})],1)]),i("button",{on:{click:t.submit}},[t._v("关闭")])])])])])},h=[],p=i("ae8d"),f=i("16fd"),v=i("3753"),b=function(t){Object(c["a"])(i,t);var e=Object(l["a"])(i);function i(){var t;return Object(a["a"])(this,i),t=e.apply(this,arguments),t.selectedTags=[],t.selected=null,t.isTop=!1,t}return Object(n["a"])(i,[{key:"submit",value:function(t){this.show=!1;var e=this.$refs.input_title.value,i=this.$refs.input_2.innerHTML;""===e&&""===i&&(this.$refs.input_title.value="空白记事");var s={title:this.$refs.input_title.value,content:this.$refs.input_2.innerHTML,isTop:this.isTop,color:this.selectedColor,tags:this.selectedTags};return this.reset(),s}},{key:"created",value:function(){var t=this;this.$nextTick((function(){t.$refs.input_2.setAttribute("data-placeholder","添加记事..."),t.$refs.input_2.addEventListener("input",(function(t){var e=t.target.textContent;0!==e.length?this.removeAttribute("data-placeholder"):this.setAttribute("data-placeholder","添加记事...")}))}))}},{key:"selectTag",value:function(t){var e=this.selectedTags.indexOf(t);-1!==e?this.selectedTags.splice(e,1):this.selectedTags.push(t)}},{key:"selectColor",value:function(t){this.$refs.box__right_input.style.backgroundColor=t,this.$refs.input_title.style.backgroundColor=t,this.selectedColor=t}},{key:"reset",value:function(){this.$refs.box__right_input.style.backgroundColor="#fff",this.$refs.input_title.style.backgroundColor="#fff",this.$refs.input_title.value="",this.$refs.input_2.textContent="",this.$refs.input_2.setAttribute("data-placeholder","添加记事..."),this.isTop=!1,this.selectedTags=[]}},{key:"goArchive",value:function(){var t=this;this.show=!1,this.axios.get("/users").then((function(e){var i={title:t.$refs.input_title.value,content:t.$refs.input_2.textContent,isTop:t.isTop,color:t.selectedColor,archiveId:parseInt(e.data.userInfo.Archive.id),tags:[{id:1,name:"哈哈哈"}]};t.axios.post("/labels",i).then((function(e){0===e.data.stateCode&&(t.$toast.success("已归档",{position:"bottom-left"}),t.reset())}))})).catch((function(t){console.log(t)}))}}]),i}(Object(v["c"])(f["a"]));Object(r["a"])([Object(u["d"])("isShow",{type:Boolean})],b.prototype,"show",void 0),Object(r["a"])([Object(u["b"])("submit")],b.prototype,"submit",null),b=Object(r["a"])([Object(u["a"])({components:{Card:p["a"]}})],b);var g=b,y=g,_=(i("c83b"),i("cba8")),k=Object(_["a"])(y,d,h,!1,null,"10476775",null),m=k.exports,w=i("0630"),$=i("a349"),x=i("bc85"),C=i("9ca1"),T=Object($["b"])("notesStore"),N=function(t){Object(c["a"])(i,t);var e=Object(l["a"])(i);function i(){var t;return Object(a["a"])(this,i),t=e.apply(this,arguments),t.list=[],t.topList=[],t.allList=[],t.option={getSortData:{id:"id"},sortBy:"id"},t.selected=null,t.isShow=!1,t.noteData={},t.clickedNoteData={title:"",content:"",color:"",archiveId:null,userId:-1,isTop:!1,Tags:[]},t}return Object(n["a"])(i,[{key:"created",value:function(){this.init()}},{key:"mounted",value:function(){this.$EventBus.$on("clickNoteCard",this.setNoteData),this.$EventBus.$on("colorValue",this.setBgc),this.$EventBus.$on("setArchiveModal",this.closeModal),this.$EventBus.$on("deleteNoteModal",this.closeModal),this.$EventBus.$on("whichUpdate",this.reRender)}},{key:"beforeDestroy",value:function(){this.$EventBus.$off("clickNoteCard",this.setNoteData),this.$EventBus.$off("colorValue",this.setBgc),this.$EventBus.$off("setArchiveModal",this.closeModal),this.$EventBus.$off("deleteNoteModal",this.closeModal),this.$EventBus.$off("whichUpdate",this.reRender)}},{key:"close",value:function(){this.isShow=!1}},{key:"init",value:function(){var t=this;this.getNotes().then((function(e){t.allList=e.res,t.topList=t.allList.filter((function(t){return t.isTop&&null===t.archiveId})),t.list=t.allList.filter((function(t){return!t.isTop&&null===t.archiveId}))}))}},{key:"save",value:function(){var t=this;this.clickedNoteData.title===this.$refs.title.innerHTML&&this.clickedNoteData.content===this.$refs.input_2.innerHTML||this.$nextTick((function(){t.axios.patch("labels/".concat(t.clickedNoteData.id),{title:t.$refs.title.innerHTML,content:t.$refs.input_2.innerHTML}).then((function(e){t.$router.push("/transit"),t.clickedNoteData=e.data.labelInfo})).catch((function(e){t.$toast.error(e.msg)}))}))}},{key:"isTopfilter",value:function(t,e){var i=this.topList.findIndex((function(t){return t.id===e.id}));"restoreArchive"===t||"restore"===t?("/archive"===this.$route.fullPath&&(e.archiveId?e.archiveId=null:e.archiveId=e.userId,e.isTop=!1),this.topList.push(e)):this.topList.splice(i,1)}},{key:"notTopfilter",value:function(t,e){var i=this.list.findIndex((function(t){return t.id===e.id}));"restoreArchive"!==t&&"restore"!==t?(this.leaveItem=e,this.list.splice(i,1)):this.list.push(e)}},{key:"reRender",value:function(t){var e=t[0],i=t[1];i.isTop?this.isTopfilter(e,i):this.notTopfilter(e,i)}},{key:"setNoteData",value:function(t){this.clickedNoteData=t,this.$refs.modal.open(),this.$refs.modal.$el.childNodes[0].style.overflow="visible",this.$refs.modal.$el.childNodes[0].style.borderRadius="10px",this.$refs.modal.$el.childNodes[0].style.backgroundColor="".concat(t.color)}},{key:"setBgc",value:function(t){this.$refs.modal.$el.childNodes[0].style.backgroundColor="".concat(t)}},{key:"closeModal",value:function(){this.$refs.modal.close()}},{key:"updateList",value:function(t){var e=this;this.axios.post("/labels",t).then((function(t){0===t.data.stateCode&&(e.$toast.success("添加成功",{position:"bottom-left"}),e.init())}))}},{key:"changeNote",value:function(t){t.isTop?this.topList.push(t):this.list.push(t)}}]),i}(u["e"]);Object(r["a"])([T.Action("getNotes")],N.prototype,"getNotes",void 0),Object(r["a"])([T.State("notes")],N.prototype,"notes",void 0),N=Object(r["a"])([Object(u["a"])({components:{BottomFunc:C["a"],Waterfalls:x["a"],NoteCard:w["a"],Card:p["a"],InputCard:m}})],N);var S=N,L=S,O=(i("d863"),Object(_["a"])(L,s,o,!1,null,"248450f7",null));e["default"]=O.exports},a43b:function(t,e,i){},bf70:function(t,e,i){},c83b:function(t,e,i){"use strict";i("a43b")},d863:function(t,e,i){"use strict";i("bf70")}}]);
//# sourceMappingURL=chunk-33532b8b.cf429397.js.map
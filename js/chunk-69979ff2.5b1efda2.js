(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69979ff2"],{"41ea":function(s,t,e){},a55b:function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("div",{staticClass:"form_box g_border"},[s._m(0),e("form",{staticClass:"form",attrs:{method:"post"},on:{submit:s.submit}},[e("label",{staticClass:"form_box__label",attrs:{for:"username"}},[e("input",{ref:"username",staticClass:"form_box__input g_border placeholder__move",attrs:{id:"username",type:"text",placeholder:"请输入用户名",autocomplete:"none"}}),e("span",{ref:"username_msg",staticClass:"tip g_error",staticStyle:{display:"none"}})]),e("label",{staticClass:"form_box__label",attrs:{for:"password"}},[e("input",{ref:"password",staticClass:"form_box__input g_border",attrs:{id:"password",type:"password",placeholder:"请输入密码"}}),e("span",{ref:"password_msg",staticClass:"tip g_error",staticStyle:{display:"none"}})]),e("router-link",{staticClass:"form_box__forget__password g_font_weight",attrs:{to:{name:"forgotPassword",path:"/forgotPassword"}}},[s._v("忘记密码? ")]),e("div",{staticClass:"form_box__submit"},[e("router-link",{staticClass:"register g_font_weight",attrs:{to:{name:"Register",path:"/register"}}},[s._v("注册账号 ")]),e("label",{attrs:{for:"submit"}},[e("input",{ref:"submit",staticClass:"form_box__submit_btn g_font_weight",attrs:{id:"submit",type:"submit",value:"登录"}})])],1)],1)])])},r=[function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"form_box__title"},[e("h2",[s._v("登录")]),e("span",[s._v("使用您的用户名登录")])])}],o=e("ddb5"),i=e("bedc"),n=e("ce1e"),l=e("ce9d"),c=(e("3fab"),e("ed02"),e("fd63")),u=e("e4a1"),f=e("a349"),b=Object(f["b"])("userInfo"),_=function(s){Object(n["a"])(e,s);var t=Object(l["a"])(e);function e(){var s;return Object(o["a"])(this,e),s=t.apply(this,arguments),s.canClick=!0,s.loginObj={username:"",password:""},s.successClass=function(s,t){s.classList.remove("g_error"),s.classList.add("g_success"),t.style.display="none",t.innerText=""},s.failClass=function(s,t,e){s.classList.remove("g_success"),s.classList.add("g_error"),t.style.display="inline-block",t.innerText=e},s}return Object(i["a"])(e,[{key:"created",value:function(){}},{key:"submit",value:function(s){var t=this;s.preventDefault(),this.loginObj.username=s.target.username.value,this.loginObj.password=s.target.password.value,""!==this.loginObj.username?""!==this.loginObj.password?(this.successClass(this.$refs.password,this.$refs.password_msg),this.successClass(this.$refs.username,this.$refs.username_msg),this.canClick&&(this.$refs.submit.style.cursor="not-allowed",this.$refs.submit.style.backgroundColor="rgba(25, 93, 229,.6)",this.canClick=!1,this.getLoginInfo({username:this.loginObj.username,password:this.loginObj.password}),this.login().then((function(s){t.$nextTick((function(){t.canClick=!0,t.$refs.submit.style.cursor="default",t.$refs.submit.style.backgroundColor="rgba(25, 93, 229,1)",s&&t.$router.replace("/notes")}))})).catch((function(s){throw s})))):this.failClass(this.$refs.password,this.$refs.password_msg,"请输入密码"):this.failClass(this.$refs.username,this.$refs.username_msg,"请输入用户名")}}]),e}(u["e"]);Object(c["a"])([b.State((function(s){return s}))],_.prototype,"userInfo",void 0),Object(c["a"])([b.Mutation("getLoginInfo")],_.prototype,"getLoginInfo",void 0),Object(c["a"])([b.Action("login")],_.prototype,"login",void 0),_=Object(c["a"])([u["a"]],_);var d=_,p=d,m=(e("f1e4"),e("cba8")),g=Object(m["a"])(p,a,r,!1,null,"c7c5e834",null);t["default"]=g.exports},f1e4:function(s,t,e){"use strict";e("41ea")}}]);
//# sourceMappingURL=chunk-69979ff2.5b1efda2.js.map
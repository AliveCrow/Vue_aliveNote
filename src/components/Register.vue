<template>
  <div>
    <div class="form_box g_border">
      <div class="form_box__title">
        <h2>注册账号</h2>
      </div>
      <form method="post" class="form" @submit="register" ref="form">
        <div style="display: flex;width: 100%;margin-bottom: 30px">
          <blockquote style="padding-right: 30px;width: 100%">
            <label for="username" class="form_box__label">
              <input id="username"
                     name="username"
                     type="text"
                     class="form_box__input g_border placeholder__move"
                     placeholder="用户名"
                     ref="username"
                     v-model.trim="registerObj.username"
              >
            </label>
            <span class="tip  g_error" ref="username_msg" style="display: none"></span>
          </blockquote>
          <blockquote style="width:100%;">
            <label for="nickname" class="form_box__label">
              <input id="nickname"
                     name="nickname"
                     type="text"
                     class="form_box__input g_border"
                     placeholder="昵称"
                     ref="nickname"
                     v-model.trim="registerObj.nickname"
              >
            </label>
            <span class="tip  g_error" ref="nickname_msg" style="display: none"></span>
          </blockquote>
        </div>
        <label for="email" class="form_box__label">
          <input id="email"
                 name="email"
                 type="text"
                 class="form_box__input g_border"
                 placeholder="邮箱(选填,找回密码使用)"
                 autocomplete="none"
                 ref="email"
                 v-model.trim="registerObj.email"
          >
          <span class="tip  g_error" ref="email_msg" style="display: none"></span>
        </label>
        <div style="display: flex;width: 100%">
          <blockquote style="padding-right: 30px;width: 100%">
            <label for="password" class="form_box__label">
              <input id="password"
                     name="password"
                     type="password"
                     class="form_box__input g_border placeholder__move"
                     placeholder="密码"
                     autocomplete="none"
                     ref="password"
                     v-model.trim="registerObj.password"

              >
              <span class="tip g_error" ref="password_msg" style="display: none"></span>

            </label>
          </blockquote>
          <blockquote style="width:100%;">
            <label for="password_confirm" class="form_box__label">
              <input id="password_confirm"
                     name="password_confirm"
                     type="password"
                     class="form_box__input g_border"
                     placeholder="确认"
                     autocomplete="none"
                     ref="password_confirm"
                     v-model.trim="registerObj.password_confirm"

              >
              <span class="tip g_error" ref="password_confirm_msg" style="display: none"></span>
            </label>
          </blockquote>
        </div>
        <div class="form_box__submit">
          <router-link :to="{name:'Login',path:'/login'}" class="register g_font_weight">登录现有账户</router-link>
          <label for="submit">
            <input ref="register" id="submit" type="submit" value="注册" class="form_box__submit_btn g_font_weight">
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {failClassConfig, successClassConfig} from '@/typs';

@Component
export default class Register extends Vue {
  public $refs!:{
    register:HTMLInputElement;
    form:HTMLFormElement;
    username_msg:HTMLSpanElement;
    nickname_msg: HTMLSpanElement;
    email_msg: HTMLSpanElement;
    password_msg:HTMLSpanElement;
    password_confirm_msg: HTMLSpanElement;
  }
  canClick:boolean = true;
  registerObj: {
    username: string,
    nickname: string,
    email: string,
    password: string,
    password_confirm: string
  } = {
    username: '',
    nickname: '',
    email: '',
    password: '',
    password_confirm: ''
  };


  created() {
  }

  register(e: any) {
    e.preventDefault();
    // debugger
    this.$refs.register.style.cursor = 'not-allowed';
    this.$refs.register.style.backgroundColor = 'rgba(25, 93, 229,.6)';
    this.$nextTick(() => {
      this.rule().then(() => {
        if(this.canClick) {
          this.canClick = false;
          this.axios.post('/register', this.registerObj).then(res => {
            setTimeout(()=>{
              this.canClick = true;
              this.$refs.register.style.cursor = 'default';
              this.$refs.register.style.backgroundColor = 'rgba(25, 93, 229,1)';
            },700)
            console.log(res);
            if (res.data.stateCode === -1) {
              this.$toast.error(res.data.msg);
              return;
            }
            this.$toast.success('注册成功');
            setTimeout(() => {
              this.$router.push({path: 'login'});
            }, 1000);
          });
        }
      }).catch(() => {
        setTimeout(()=>{
          this.canClick = true;
          this.$refs.register.style.cursor = 'default';
          this.$refs.register.style.backgroundColor = 'rgba(25, 93, 229,1)';
        },700)
        this.$toast.error('请查看表单提示,重新填写');
      });
    });
    // }


  }

  successClass: successClassConfig = (el, el_msg) => {
    el.classList.remove('g_error');
    el.classList.add('g_success');
    el_msg.style.display = 'none';
    el_msg.innerText = '';
  };
  failClass: failClassConfig = (el, el_msg, msg) => {
    el.classList.remove('g_success');
    el.classList.add('g_error');
    el_msg.style.display = 'inline-block';
    el_msg.innerText = msg;
  };

  rule() {
    return new Promise((resolve, reject) => {
      if (this.verificationUsername(this.registerObj.username) && this.verificationNickname(this.registerObj.nickname) && this.verificationPassword(this.registerObj.password) && this.passwordIsSame(this.registerObj.password, this.registerObj.password_confirm)) {
        resolve();
      } else {
        reject();
      }
    });
  }

  verificationUsername(username: string) {
    const rule = /^[0-9A-Za-z]{4,24}$/;
    if (rule.test(username)) {
      this.successClass(this.$refs.form[0], this.$refs.username_msg);
      return true;
    } else {
      this.failClass(this.$refs.form[0], this.$refs.username_msg, '用户名是你的登录账户,只能使用字母(a-Z)和数字(0-9),最短4位');
      return false;
    }
  }

  verificationNickname(nickname: string) {
    if (nickname !== '') {
      this.successClass(this.$refs.form[1], this.$refs.nickname_msg);
      return true;
    } else {
      this.failClass(this.$refs.form[1], this.$refs.nickname_msg, '请输入昵称');
      return false;
    }
  }

  verificationEmail(email: string) {
    const rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (rule.test(email)) {
      this.successClass(this.$refs.form[2], this.$refs.email_msg);
      return true;
    } else {
      this.failClass(this.$refs.form[2], this.$refs.email_msg, '邮箱错误');
      return false;
    }
  }

  verificationPassword(password: string) {
    if (password.length >= 8 && password.length < 24 && /^[^\s]*$/.test(password)) {
      this.successClass(this.$refs.form[3], this.$refs.password_msg);
      return true;
    } else {
      this.failClass(this.$refs.form[3], this.$refs.password_msg as HTMLSpanElement, '至少8位字符串,至多24位,不能有空格');
      return false;
    }
  }

  passwordIsSame(password1: string, password2: string) {
    if (password1 === password2) {
      this.successClass(this.$refs.form[4], this.$refs.password_confirm_msg as HTMLSpanElement);
      return true;
    } else {
      this.failClass(this.$refs.form[4], this.$refs.password_confirm_msg as HTMLSpanElement, '这两个密码不一致，请重试。');
      return false;
    }
  }

}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/form";

.form_box {
  width: 800px;
}


</style>
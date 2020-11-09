<template>
  <div>
    <div class="form_box g_border">
      <div class="form_box__title">
        <h2>登录</h2>
        <span>使用您的用户名登录</span>
      </div>
      <form method="post" class="form" @submit="submit">
        <label for="username" class="form_box__label">
          <input
              id="username"
              type="text"
              class="form_box__input g_border placeholder__move"
              placeholder="请输入用户名"
              autocomplete="none"
              ref="username"
          />
          <span
              class="tip g_error"
              ref="username_msg"
              style="display: none"
          ></span>
        </label>
        <label for="password" class="form_box__label">
          <input
              id="password"
              type="password"
              class="form_box__input g_border"
              placeholder="请输入密码"
              ref="password"
          />
          <span
              class="tip g_error"
              ref="password_msg"
              style="display: none"
          ></span>
        </label>
        <router-link
            :to="{ name: 'forgotPassword', path: '/forgotPassword' }"
            class="form_box__forget__password g_font_weight"
        >忘记密码?
        </router-link
        >
        <div class="form_box__submit">
          <!--          //todo 防抖节流-->
          <router-link
              :to="{ name: 'Register', path: '/register' }"
              class="register g_font_weight"
          >注册账号
          </router-link
          >
          <label for="submit">
            <input
                ref="submit"
                id="submit"
                type="submit"
                value="登录"
                class="form_box__submit_btn g_font_weight"
            />
          </label>
        </div>

        <div
            style="margin-top: 30px; display: flex; justify-content: space-around"
        >
          <a>QQ</a>
          <a>GitHub</a>
          <a>微信</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Action, Mutation, namespace} from 'vuex-class';
import {failClassConfig, successClassConfig, user} from '@/typs';

const UserInfoStore = namespace('userInfo');


@Component
export default class Login extends Vue {
  public $refs!: {
    username: HTMLInputElement;
    username_msg: HTMLSpanElement;
    password: HTMLInputElement;
    password_msg: HTMLSpanElement;
    form: HTMLFormElement;
    nickname_msg: HTMLSpanElement;
    email_msg: HTMLSpanElement;
    password_confirm_msg: HTMLSpanElement;
    submit: HTMLButtonElement;
  };
  canClick: boolean = true;

  @UserInfoStore.State(state => state) userInfo!: user;
  @UserInfoStore.Mutation('getLoginInfo') getLoginInfo!: Function;
  @UserInfoStore.Action('login') login!: Function;

  created() {
  }

  loginObj: { username: string; password: string } = {
    username: '',
    password: ''
  };
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

  submit(e: any) {
    e.preventDefault();
    this.loginObj.username = e.target.username.value;
    this.loginObj.password = e.target.password.value;
    if (this.loginObj.username === '') {
      this.failClass(
          this.$refs.username,
          this.$refs.username_msg,
          '请输入用户名'
      );
      return;
    } else {
      if (this.loginObj.password === '') {
        this.failClass(
            this.$refs.password,
            this.$refs.password_msg,
            '请输入密码'
        );
        return;
      }
      this.successClass(this.$refs.password, this.$refs.password_msg);
      this.successClass(this.$refs.username, this.$refs.username_msg);
      if (this.canClick) {
        this.$refs.submit.style.cursor = 'not-allowed';
        this.$refs.submit.style.backgroundColor = 'rgba(25, 93, 229,.6)';
        this.canClick = false;
        this.getLoginInfo({
          username: this.loginObj.username,
          password: this.loginObj.password
        });
        this.login().then((res: boolean) => {
          this.$nextTick(() => {
            this.canClick = true;
            this.$refs.submit.style.cursor = 'default';
            this.$refs.submit.style.backgroundColor = 'rgba(25, 93, 229,1)';
            if (res) {
              this.$router.push('/');
            }
          });
        }).catch((error:any) => {
          console.log('error');
        });
      }
    }

  }
}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/form";

.form_box {
  width: 450px;
}
</style>
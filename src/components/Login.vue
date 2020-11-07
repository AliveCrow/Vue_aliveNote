<template>
<!--  <Container keyNum.num="1">-->
    <!--    <div id="login_app">-->
    <!--      <div class="form_box g_border">-->
  <div>
    <div class="form_box__title">
      <h2>登录</h2>
      <span>使用您的用户名登录</span>
    </div>
    <form method="post" class="form">
      <label for="username" class="form_box__label">
        <input id="username"
               type="text"
               class="form_box__input g_border placeholder__move"
               placeholder="请输入用户名"
        >
      </label>
      <label for="password" class="form_box__label">
        <input id="password"
               type="password"
               class="form_box__input g_border"
               placeholder="请输入密码"
        >
      </label>
      <a class="form_box__forget__password g_font_weight">忘记密码?</a>
      <div class="form_box__submit">
        <router-link :to="{name:'Register',path:'/register'}" class="register g_font_weight">注册账号</router-link>
        <label for="submit">
          <input id="submit" type="submit" value="登录" class="form_box__submit_btn">
        </label>
      </div>

      <div style="margin-top: 30px;display: flex;justify-content:space-around;">
        <a>QQ</a>
        <a>GitHub</a>
        <a>微信</a>
      </div>
    </form>
  </div>

    <!--      </div>-->
    <!--    </div>-->
<!--  </Container>-->
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Container from '@/components/Container.vue';

@Component({
  components: {Container}
})
export default class Login extends Vue {

}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";


.form_box__title {
  margin-bottom: 30px;

  h2 {
    font-weight: 400;
  }

  span {
    display: inline-block;
    margin-top: 10px;
  }
}
.form {
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    height: 54px;
    outline: none;
    border-radius: 5px;
  }

  .form_box__label {
    margin-bottom: 30px;

    .form_box__input {
      padding: 13px;
      font-size: 1.3rem;

      &::placeholder {
        font-size: 1rem;
      }

      &:focus {
        border: 2px solid $inputBorderColor;
        padding: 12px 14px;

        &::placeholder {
          opacity: 0;
        }
      }
    }
  }

  .form_box__forget__password {
    margin-top: -15px;
    color: $inputBorderColor;
    text-align: left;
    cursor: pointer;
  }

  .form_box__submit {
    margin-top: 40px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    color: $inputBorderColor;
    height: 40px;

    .register {
      //width: ;
      flex-basis: 100px;
      display: block;
      text-decoration: none;
      color: $inputBorderColor;
    }

    .form_box__submit_btn {
      cursor: pointer;
      margin: 0;
      width: 70px;
      height: 40px;
      border: none;
      display: inline-block;
      text-align: center !important;
      background-color: $inputBorderColor;
      color: #fff;
    }
  }
}


</style>
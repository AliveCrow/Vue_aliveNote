<template>
  <div id='ForgotPassword_app'>
    <div class="form_box g_border">
      <div class="form_box__title">
        <h2>找回密码</h2>
      </div>
      <form method="post" class="form" @submit="submit">
        <label for="email" class="form_box__label">
          <input id="email"
                 type="email"
                 class="form_box__input g_border placeholder__move"
                 placeholder="请输入邮箱"
                 autocomplete="none"
                 ref="email"
                 name="email"

          >
          <span class="tip  g_error" ref="username_msg"  style="display: none"></span>
        </label>
          <label for="submit" >
            <input id="submit"
                   type="submit"
                   value="发送重置邮件"
                   class="form_box__submit_btn g_font_weight"
                   style="background-color:rgb(25, 93, 229);color: #fff;border:none;"
            >
          </label>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class ForgotPassword extends Vue {

  submit(e){
    e.preventDefault()
    const resetEmail = {
      'resetEmail': e.target.email.value
    }
    this.axios.post('/send',resetEmail).then(res=>{
      if(res.data.success){
        this.$toast.success(res.data.msg.title)
      }else {
        this.$toast.error(res.data.msg)
      }

    })
  }

}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/form";

.form_box{
  width: 500px;
  height: 350px;
}
</style>
<template>
  <div id='UserInfo_app' class="g_border" >
    <section class="left ">
      <img src="http://qiniu.dreamsakula.top/images/20201109014022.jpg" alt="" height="220px">
    </section>
    <section class="right ">
      <label >
        <span>用户名:</span>
        <input type="text" class="g_border">
      </label>
      <label >
        <span>昵称:</span>
        <input type="text" class="g_border">
      </label>
      <label >
        <input type="text" class="g_border">
      </label>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class UserInfo extends Vue {

}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";
#UserInfo_app{
  margin-top: 50px;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;

  .left{
    img{
      border-radius: 50%;
    }
  }
  .right{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    input{
      width: 300px;
      height: 40px;
      border: 2px solid $defaultFontColor;
      border-radius: 5px;
      outline: none;
      padding: 0 10px;
      transition: all .2s linear .02s;
      &:focus{
        border: 2px solid $inputBorderColor;
        box-shadow: 0 0 4px rgba($inputBorderColor,.6);
      }
    }
  }
}

</style>
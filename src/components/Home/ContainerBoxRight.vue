<template>
  <div class="container-box__right">
    <div class="container-box__right_input">
      <label v-show="false">
        <input type="text" class="input_3" placeholder="标题">
      </label>
      <div class="input_box">
        <label for="one">
          <input type="text" id="one" class="input_1" placeholder="标题">
        </label>
        <div class="to_top">
          <eva-icon name="toggle-left-outline" class="icons  "></eva-icon>
          <eva-icon name="toggle-right" class="icons  "></eva-icon>
        </div>
        <label for="two">
          <input type="text" id="two" class="input_2" placeholder="添加记事">
        </label>
        <div class="input_box__fun">
          <div>
            <eva-icon name="color-palette-outline" class="icons " ></eva-icon>
            <eva-icon name="archive-outline" class="icons"></eva-icon>
            <eva-icon name="bookmark-outline" class="icons"></eva-icon>
          </div>
          <button>关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Container from '@/views/Container.vue';

@Component
export default class ContainerBoxRight extends Vue {

}
</script>
<style scoped lang='scss'>
@import "../../assets/scss/var";

.container-box__right{
  height: 100%;
  width: 90%;
  .container-box__right_input{
    border-radius: 8px;
    overflow: hidden;
    width: 500px;
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    transform: translateX(-120px);
    box-shadow: 0 0 6px rgba($defaultFontColor,.4);

    .input_box{
      position: relative;
      display: flex;
      flex-direction: column;
      input{
        width: 100%;
        padding: 10px 50px 10px 10px;
        height: 50px;
        border: none;
        outline: none;
        &::placeholder{
          font-weight: 500;
        }
      }
      .to_top{
        height: 35px;
        padding: 5px;
        position: absolute;
        right: 0;
        cursor: pointer;
        &:hover{
          fill:$info;
        }
        &:active{
          fill:$info;
        }
      }

      .input_box__fun{
        display: flex;
        margin: 10px;
        align-items: center;
        justify-content: space-between;
        .icons{
          height: 36px;
          width: 36px;
          margin: 0 10px;
          padding: 5px;
          border-radius: 50%;
          &:hover{
            background-color:rgba(#efefef,.9);
          }
        }
        button{
          border: none;
          padding: 5px 15px;
          background-color: #fff;
          cursor: pointer;
          margin-right: 10px;
          &:hover{
            background-color:rgba(#efefef,.9);
          }
        }
      }
    }

  }




}
</style>
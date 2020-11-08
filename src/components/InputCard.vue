<template>
  <div class="container-box__right_input">
    <div class="input_box">
      <label for="one">
        <input type="text" id="one" class="input_1" placeholder="标题">
      </label>
      <div class="to_top" v-show="false">
        <eva-icon name="toggle-left-outline" class="icons  "></eva-icon>
        <eva-icon name="toggle-right" class="icons  "></eva-icon>
      </div>
      <blockquote v-show="false">
        <label for="two">
          <input type="text" id="two" class="input_2" placeholder="添加记事">
        </label>
        <div class="input_box__fun">
          <div>
            <eva-icon name="color-palette-outline" class="icons add_color" ></eva-icon>
            <eva-icon name="archive-outline" class="icons archive"></eva-icon>
            <eva-icon name="bookmark-outline" class="icons tags"></eva-icon>
          </div>
          <button>关闭</button>
        </div>
      </blockquote>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class InputCard extends Vue {

}
</script>
<style scoped lang='scss'>
@import "../assets/scss/var";

.container-box__right_input{
  width: 500px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  transform: translateX(-120px);
  border-radius: 10px;
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
      border-radius: 10px;
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
        position: relative;
        &:before{
          content: '';
          opacity: 0;
          transition: opacity .25s ease .4s;

        };
        &:hover{
          background-color:rgba(#efefef,.9);
          &:before {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: .1rem;
            width: 50px;
            border-radius: 3px;
            padding: 3px;
            height: 20px;
            line-height: 20px;
            color: #fff;
            background-color: rgba($defaultFontColor, .8);
            opacity: 1;
          }
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
      .add_color{
        &:hover {
          &:before {
            content: '改变颜色';
          }
        }
      }
      .archive{
        &:hover {
          &:before {
            content: '归档';
          }
        }
      }
      .tags{
        &:hover {
          &:before {
            content: '添加标签';
          }
        }
      }
    }
  }

}

</style>
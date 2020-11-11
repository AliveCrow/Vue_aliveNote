<template>
  <div id='TagsManage_app'>
    <div class="add_tag">
      <label >
        <input type="text" class="tag_name">
      </label>
      <button>添加</button>
    </div>
    <div class="tag_box">
      <div class="tag">
        <span>Html</span>
      </div>
      <div class="tag">
        <span>Html</span>
      </div>
      <div class="tag">
        <span>Html</span>
      </div>
      <div class="tag">
        <span>Html</span>
      </div>
      <div class="tag">
        <span>Html</span>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class TagsManage extends Vue {

}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";

#TagsManage_app{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 20px;
  .add_tag{
    box-shadow: 0 1px .5px rgba(#000,.1);
    height: 60px;
    display: flex;
    align-items: center;
    input,button{
      height: 30px;
      margin: 10px;
    }
    input{
      transition: all .15s linear .05s;
      padding:0 8px;
      border: 1px solid $defaultBorderColor;
      outline: none;
      border-radius: 3px;
      &:focus{
        box-shadow: 0 0 4px rgba(#000,.2);
        background-color: #fff;
      }
    }
    button{
      line-height: 15px;
      padding:5px 25px;
      outline: none;
      border: none;
      background-color: $searchBgcColor;
      transition: all .15s linear .05s;
      &:hover{
        background-color: $success;
        color:#fff
      }
    }
  }
  .tag_box{
    display:flex;
    flex-wrap: wrap;
    .tag{
      margin: 20px 15px;
      border: 1px solid rgba($defaultBorderColor,1);
      border-radius: 20px;
      cursor: pointer;
      transition: all .25s ease ,.5s;
      padding:8px 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .icons{
        line-height: 9px;
        transition: all .1s ease ,.5s;
      }
      &:hover{
        transform: scale(1.05);
        box-shadow: 0 0 8px rgba($info,.7);
        background-color: rgba($info, 1);
        color: #fff;
        .icons{
          fill: #fff;
          display: block;
          &:hover{
            fill: $error;
            transform: scale(1.2) rotate(180deg);
          }
        }
      }
    }
  }

}
</style>
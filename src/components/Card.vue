<template>
  <div id='Card_app' :class="className" v-show="showCard" >
    <slot name="title" class="title"></slot>
    <slot name="content" class="content"></slot>
  </div>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue} from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop(String) className:string|'';
  @PropSync('isShow',{type:Boolean}) showCard!:boolean;



}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";
#Card_app {
  position: absolute;
  height: 400px;
  width: 350px;
  background-color: #fff;
  z-index: 10;
  top: 65px;
  border: 1px solid #0003;
  box-shadow: 0 0 6px rgba($defaultFontColor,.3);
  border-radius: 5px;
  right: 10px;
}
</style>
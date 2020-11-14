<template>
  <div id='ArchiveTip_app'>
    <span>{{content}}</span>
    <button  @click="abc">撤销</button>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Mixins, Prop, Vue} from 'vue-property-decorator';
import {NoteDataType} from '@/typs';
import ModalMixinBottomFunc from '@/mixins/ModalMixinBottomFunc';
import ContainerBoxRight from '@/components/Home/ContainerBoxRight.vue';

@Component
export default class ArchiveTip extends Mixins(ModalMixinBottomFunc) {
  @Prop(String) content: string;


  @Emit('abc')
  abc(){
  }


}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";

#ArchiveTip_app {
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 80px;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    padding: 8px 0;
    &:hover {
      background-color: rgba(#000, .1);
    }
  }
}
</style>
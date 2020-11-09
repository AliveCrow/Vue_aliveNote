<template>
  <div id='ArchiveTip_app'>
    <span>已将记事归档</span>
    <button>撤销</button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class ArchiveTip extends Vue {

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
      background-color: rgba(25, 97, 202, .7);
    }
  }
}
</style>
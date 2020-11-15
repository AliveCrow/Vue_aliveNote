<template>
  <div id='Transit_app'>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';

@Component
export default class Transit extends Vue {

  beforeCreate(){
    this.$router.go(-1)
  }

  @Watch('$route')
  routeChange(to: any, from: any) {
    console.log('233');
  }



}
</script>
<style scoped lang='scss'>

</style>
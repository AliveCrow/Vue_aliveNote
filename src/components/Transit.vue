<template>
  <div id='Transit_app'>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Transit extends Vue {

  beforeCreate(){
    this.$router.push('/notes')
  }

}
</script>
<style scoped lang='scss'>

</style>
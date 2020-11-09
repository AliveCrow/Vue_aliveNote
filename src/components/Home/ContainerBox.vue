<template>
  <div id='ContainerBox_app'>
      <ContainerBoxLeft />
      <ContainerBoxRight />
  </div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator';
import ContainerBoxLeft from '@/components/Home/ContainerBoxLeft.vue';
import ContainerBoxRight from '@/components/Home/ContainerBoxRight.vue';
import Home from '@/views/Home.vue';
@Component({
  components: {ContainerBoxRight, ContainerBoxLeft}
})
export default class ContainerBox extends Vue {
  ContainerBox:string='ContainerBox';

}
</script>
<style scoped lang='scss'>
@import "../../assets/scss/var";
#ContainerBox_app{

}
</style>
<template>
  <div class="container-box__right">
    <InputCard />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import InputCard from '@/components/InputCard.vue';
@Component({
  components: {InputCard}
})
export default class ContainerBoxRight extends Vue {

}
</script>
<style scoped lang='scss'>

.container-box__right{
  height: 100%;
  width: 90%;


}
</style>
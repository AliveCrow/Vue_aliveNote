<template>
  <div id='Archive_app'>
    <Waterfalls :list-arr="archiveList" ></Waterfalls>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Waterfalls from '@/components/Waterfalls.vue';
@Component({
  components: {Waterfalls}
})
export default class Archive extends Vue {

  archiveList:NodeList[] =[];

  init(){
    this.axios.get('/archive').then(res=>{
      this.archiveList = res.data.res[0].Labels
    })
  }

  created(){
    this.init()
  }

}
</script>
<style scoped lang='scss'>

</style>
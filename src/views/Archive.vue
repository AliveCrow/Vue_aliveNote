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
  $EventBus: any;

  init(){
    this.axios.get('/archive').then(res=>{
      this.archiveList = res.data.res[0].Labels
    })
  }
  restoreArchive(e: { id: any; }){
    let index = this.archiveList.findIndex(item=>item.id === e.id)
    this.archiveList.splice(index,1)
  }
  created(){
    this.init()
    this.$EventBus.$on('restoreArchive',this.restoreArchive)
  }

  beforeDestroy(){
    this.$EventBus.$emit('restoreArchive',this.restoreArchive)
  }
}
</script>
<style scoped lang='scss'>
#Archive_app{
  padding-top: 50px;
}

</style>
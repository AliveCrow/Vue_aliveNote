<template>
  <div id='Rec_app'>
    <Waterfalls
        :list-arr="recList"
        @restoreNote="restoreNote"
        @deleteNote="deleteNote"
    ></Waterfalls>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Waterfalls from '@/components/Waterfalls.vue';
import {CommonOptions} from 'vue-toastification/dist/types/src/types';
@Component({
  components: {Waterfalls}
})
export default class Rec extends Vue {

  recList:NodeList[] =[];

  init(){
    this.axios.get('/labels/deleted').then(res=>{
      this.recList = res.data.res
    })
  }

  created(){
    this.init()
  }

  restoreNote(e){
    this.axios.post(`/labels/restore/${e.id}`).then(res=>{
      this.recList.splice(this.recList.findIndex(item=>item.id===e.id),1)
      this.$toast.success(res.data.res,{position:"bottom-left"} as CommonOptions)
    }).catch(error=>{
      this.$toast.error('请求错误')
    })
  }

  deleteNote(e){
    this.axios.delete(`/labels/delete/${e.id}`).then(res=>{
      this.recList.splice(this.recList.findIndex(item=>item.id===e.id),1)
      this.$toast.success(res.data.res,{position:"bottom-left"} as CommonOptions)
    }).catch(error=>{
      this.$toast.error('请求错误')
    })
  }


}
</script>
<style scoped lang='scss'>

</style>
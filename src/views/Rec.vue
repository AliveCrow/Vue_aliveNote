<template>
  <div id='Rec_app'>
    <section style="display: flex;justify-content: center;align-items: center;margin-bottom: 40px">
      <h2 >回收站中的内容将会在7天后删除</h2>
      <span class="clear "  @click="clear">清空回收站</span>
    </section>
    <Waterfalls
        :list-arr="recList"
    ></Waterfalls>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Waterfalls from '@/components/Waterfalls.vue';
import {CommonOptions} from 'vue-toastification/dist/types/src/types';
import {NoteDataType} from '@/typs';
@Component({
  components: {Waterfalls}
})
export default class Rec extends Vue {

  recList:NodeList[] =[];
  $EventBus: any;

  init(){
    this.axios.get('/labels/deleted').then(res=>{
      this.recList = res.data.res
    })
  }

  beforeCreate(){
    // 每次进入都会删除七天之后的
    this.axios.delete('/recycle/expire').then(res=>{
      if(res.data.res!==0){
        this.$toast.info('已更新')
      }
      this.init()
    })
  }
  created(){
    this.init()
  }
  mounted(){
    this.$EventBus.$on('deleteNoteFover',this.deleteNoteFover)
    this.$EventBus.$on('restoreNote',this.restoreNote)

  }
  deleteNoteFover(noteData:NoteDataType){
    this.recList.splice(this.recList.findIndex(item=>item.id===noteData.id),1)
  }
  restoreNote(noteData:NoteDataType){
    this.recList.splice(this.recList.findIndex(item=>item.id===noteData.id),1)
  }
  beforeDestroy(){
    this.$EventBus.$off('deleteNoteFover')
    this.$EventBus.$off('restoreNote')

  }


  clear(){
    this.axios.delete('/recycle/all').then(res=>{
      this.$toast.error('清空成功')
      this.init()
    })
  }

}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";

#Rec_app{
  padding-top: 50px;

  .clear{
    margin-left: 50px;
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    border-color: $error;
    color: $error;
    cursor: pointer;
    &:hover{
      background-color: rgba($error,.2);
    }
  }
}
</style>
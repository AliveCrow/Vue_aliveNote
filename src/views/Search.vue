<template>
  <div id='Search_app'>
      <span v-show="searchList.length === 0 && !load" >找不到相符的搜索结果。</span>
    <eva-icon name="loader-outline" class="icons" v-show="load" height="30px" width="30px"></eva-icon>
      <Waterfalls  :list-arr="searchList" ></Waterfalls>
  </div>
</template>

<script lang="ts">
import {Component, Inject, InjectReactive, Vue, Watch} from 'vue-property-decorator';
import Waterfalls from '@/components/Waterfalls.vue';
import {NoteDataType} from '@/typs';
import any = jasmine.any;
@Component({
  components: {Waterfalls}
})
export default class Search extends Vue {
  $EventBus: any;

  mounted(){
    this.$EventBus.$on('input',this.in)
    this.$EventBus.$on('deleteNoteSearch',this.deleteNoteSearch)

  }
  beforeDestroy(){
    this.$EventBus.$off('input')
    this.$EventBus.$off('deleteNoteSearch',this.deleteNoteSearch)
  }
  searchList:NoteDataType[] = [];

  deleteNoteSearch(note:NoteDataType){
    this.searchList.splice(this.searchList.findIndex(item=>item.id===note.id),1)
  }
  in(e: string){
    this.search(e)
  }

  load:boolean = false;
  search(keyword:string) {
    this.load = true
    this.debounce(()=>{
      if(keyword===''){
        this.searchList = []
        return
      }
      this.axios.get(`/search?keyword=${keyword}`).then(res => {
          //@ts-ignore
          this.load = false
        this.searchList = res.data.res
      })
    },2000)

  }
  //节流
  prev = Date.now()
  throttle(fn:Function,delay:number=1000){
    return  (()=>{
      let now = Date.now()
      if(now-this.prev > delay){
        console.log(this.prev,now-this.prev,delay);
        fn()
        this.prev = Date.now()
      }
    })()
  }

  //防抖
  timeout:any= null
  debounce(fn:Function,delay:number=1000){
   return (()=>{
     if(this.timeout) clearTimeout(this.timeout)
     this.timeout = setTimeout(fn, delay);
   })()
  }



}
</script>
<style scoped lang='scss'>
.fade-enter-active,
.fade-leave-active {
  transition: all .25s ease;
}

.fade-enter,
.fade-leave-to {
  transform: translateY(200px);
  opacity: 0;
}
#Search_app{
  margin: 50px 0 0 50px;
  .icons{
    height: 30px;
    width: 30px;
    animation: rotate-loading 1s linear infinite  ;
    transform-origin: center center;
    opacity: 0;
  }

  @keyframes rotate-loading {
    0%{
      transform: rotate(0deg);
      opacity: 1;
    }
    100%{
      transform: rotate(360deg);
      opacity: 1;
    }
  }

}

</style>
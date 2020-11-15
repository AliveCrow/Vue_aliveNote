<template>
  <div id='Search_app'>
      <span v-show="searchList.length === 0" >找不到相符的搜索结果。</span>
      <waterfalls  :list-arr="searchList" ></waterfalls>
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
  @InjectReactive() readonly keyword!:string// => //searchList: 'searchList',

  searchList:NoteDataType[] = []

  @Watch('keyword')
  in(){
    this.search(this.keyword)
  }

  search(keyword:string) {
    this.debounce(()=>{
      if(keyword===''){
        this.searchList = []
        return
      }
      this.axios.get(`/search?keyword=${keyword}`).then(res => {
        this.searchList = res.data.res
      })
    },1000)

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


}

</style>
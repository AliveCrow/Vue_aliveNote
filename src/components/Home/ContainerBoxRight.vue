<template>
  <div class="container-box__right">
    <InputCard :isShow.sync="isShow" @open="open" v-on-clickaway="close"/>
    <div class="magic_box" >
      <div class="top_note list">
        <div style="text-align: left">置顶的notes</div>
        <isotope :list="topList" class="isoDefault" :options='option' key="1">
          <NoteCard v-for="element in topList" @click="selected=element" :key="element.id" >
            <template v-slot:title>
              {{ element.id }}
            </template>
            <template v-slot:content>
              {{ element.name }}
            </template>
          </NoteCard>
        </isotope>
      </div>
      <div class="list">
        <div style="text-align: left">notes</div>
        <isotope :list="list" id="root_isotope" class="isoDefault" :options='option' key="2">
          <NoteCard v-for="element in list" @click="selected=element" :key="element.id" >
            <template v-slot:title>
              {{ element.id }}
            </template>
            <template v-slot:content>
              {{ element.name }}
            </template>
          </NoteCard>
        </isotope>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import InputCard from '@/components/InputCard.vue';
import Card from '@/components/Card.vue';
import NoteCard from '@/components/NoteCard.vue';
import {Action, namespace} from 'vuex-class';

const notesStore = namespace('notesStore')

@Component({
  components: {NoteCard, Card, InputCard},
})
export default class ContainerBoxRight extends Vue {
  @notesStore.Action('getNotes') getNotes!:Function;
  @notesStore.State('notes') notes!:[];


  option = {
    getSortData: {
      id: 'id'
    },
    sortBy: 'id'
  };
  list:[]=[];
  topList:[]=[];
  selected = null;
  isShow: boolean = false;
  open() {
    this.isShow = true;
  }
  close() {
    this.isShow = false;
  }

  created(){
    this.$nextTick(()=>{
      this.getNotes().then(res=>{
        this.topList = res.filter(item=>item.isTop===true)
        this.list = res.filter(item=>item.isTop===false)
        console.log(this.topList,this.list);
      })
    })
  }


}
</script>
<style scoped lang='scss'>

.item {
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  color: #333;
  word-break: break-all;

}

.isoDefault {
  min-height: 60px;
  width: 100%;
}

#root_isotope {

}


.container-box__right {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .list {
    margin-left: 20px;
    margin-bottom: 40px;

  }
  .magic_box{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

}
</style>
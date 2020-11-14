<template>
  <div class="container-box__right">
    <InputCard :isShow.sync="isShow" v-on-clickaway="close" @submit="updateList"/>
    <div class="magic_box">
      <div class="top_note list">
        <div style="text-align: left;font-size: 1.1rem;padding-bottom: 10px" >置顶的notes</div>
        <Waterfalls @update:isTop="true" :list-arr="topList" @asyncListArr="changeNote" ></Waterfalls>
      </div>
      <div class="list">
        <div style="text-align: left;font-size: 1.1rem;padding-bottom: 10px">notes</div>
        <Waterfalls @update:isTop="false" :list-arr="list" @asyncListArr="changeNote" ></Waterfalls>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {Component, Inject, Mixins, ProvideReactive, Vue, Watch} from 'vue-property-decorator';
import InputCard from '@/components/InputCard.vue';
import Card from '@/components/Card.vue';
import NoteCard from '@/components/NoteCard.vue';
import {Action, namespace} from 'vuex-class';
import HomeMixin from '@/mixins/HomeMixin';
import updateNoteMixin from '@/mixins/updateNoteMixin';
import ArchiveTip from '@/components/ArchiveTip.vue';
import Waterfalls from '@/components/Waterfalls.vue';

const notesStore = namespace('notesStore');

@Component({
  components: {Waterfalls, NoteCard, Card, InputCard}
})
export default class ContainerBoxRight extends Mixins(HomeMixin,updateNoteMixin) {
  @notesStore.Action('getNotes') getNotes!: Function;
  @notesStore.State('notes') notes: any;
  list: NoteCard[] = [];
  topList: NoteCard[] = [];
  allList: [] = [];
  option = {
    getSortData: {
      id: 'id'
    },
    sortBy: 'id'
  };
  selected = null;
  isShow: boolean = false;
  noteData:{}= {

  };
  tags:[]|undefined

  close() {
    this.isShow = false;
  }


  init() {
    this.getNotes().then(result => {
      this.allList = result.res;
      this.topList = this.allList.filter((item: { isTop: boolean; }) => item.isTop && item.archiveId === null);
      this.list = this.allList.filter((item: { isTop: boolean; }) => !item.isTop && item.archiveId === null);
    });
  }


  created() {
    this.init();
  }

  updateList(e) {
    this.axios.post(`/labels`, e).then(res => {
      if (res.data.stateCode === 0) {
        this.$toast.success('添加成功', {
          position: 'bottom-left'
        });
        this.init();
      }
    });
  }

  changeNote(note:NoteCard){
    if(!note.isTop){
      this.list.push(note)
    }else {
      this.topList.push(note)
    }

  }


}
</script>
<style scoped lang='scss'>

.item {
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  color: #333;
  word-break: break-all;
}

.isoDefault {
  min-height: 60px;
  width: 100%;
  &:after{
    content: '';
    display: block;
    clear: both;
  }
}


#root_isotope {

}

.container-box__right {
  height: 100%;
  width: 100%;

  .list {
    margin-left: 20px;
    margin-bottom: 40px;
  }

  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    position: absolute;
  }
}
</style>
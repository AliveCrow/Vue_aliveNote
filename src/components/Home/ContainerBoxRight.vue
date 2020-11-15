<template>
  <div class="container-box__right">
    <InputCard :isShow.sync="isShow" v-on-clickaway="close" @submit="updateList"/>
    <div class="magic_box">
      <div class="top_note list">
        <div style="text-align: left;font-size: 1.1rem;padding-bottom: 10px" >置顶的notes
        </div>
        <Waterfalls @update:isTop="true"
                    :listArr="topList"
                    @asyncListArr="changeNote"
        ></Waterfalls>
      </div>

      <div class="list">
        <div style="text-align: left;font-size: 1.1rem;padding-bottom: 10px" >notes</div>
        <Waterfalls @update:isTop="false"
                    :listArr="list"
                    @asyncListArr="changeNote"
        ></Waterfalls>
      </div>
    </div>

    <sweet-modal ref="modal"  @close="save">
      <template v-slot:title>
              <span contenteditable
                    ref="title"
                    v-html="clickedNoteData.title"
                    style="padding: 10px;border: none;outline: none"
              >
              </span>
      </template>

      <div class=" NoteCard_app_content" style="overflow-y: auto!important;max-height: 60vh">
        <div id="two"
             class="input_2"
             style="text-align: left;padding:8px 8px 0 ;border: none;outline: none;letter-spacing:1px;"
             ref="input_2"
             contenteditable
             v-html="clickedNoteData.content"
        >
        </div>
      </div>
      <div class="showTag" style="flex-wrap: wrap!important;margin-top: 20px">
        <div class="showTag_foreach" v-for="(item,index) in clickedNoteData.Tags" :key="index">
          {{ item.name }}
        </div>
      </div>
      <BottomFunc :note.sync="clickedNoteData"
                  style="opacity: 1;position: relative;margin-bottom: -20px"

      ></BottomFunc>
    </sweet-modal>

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
import {NoteDataType} from '@/typs';
import ModalUpdateContent from '@/mixins/ModalUpdateContent';
import ModalMixinBottomFunc from '@/mixins/ModalMixinBottomFunc';
import {CommonOptions} from 'vue-toastification/dist/types/src/types';
import BottomFunc from '@/components/BottomFunc.vue';

const notesStore = namespace('notesStore');

@Component({
  components: {BottomFunc, Waterfalls, NoteCard, Card, InputCard}
})
export default class ContainerBoxRight extends Mixins(HomeMixin, updateNoteMixin) {
  @notesStore.Action('getNotes') getNotes!: Function;
  @notesStore.State('notes') notes: any;
  list: NoteDataType[] = [];
  topList: NoteDataType[] = [];
  allList: [] = [];
  option = {
    getSortData: {
      id: 'id'
    },
    sortBy: 'id'
  };
  selected = null;
  isShow: boolean = false;
  noteData: {} = {};
  tags: [] | undefined;

  close() {
    this.isShow = false;
  }


  init() {
    this.getNotes().then((result: any) => {
      this.allList = result.res;
      this.topList = this.allList.filter((item: { isTop: boolean | null; archiveId: number | null }) => item.isTop && item.archiveId === null);
      this.list = this.allList.filter((item: { isTop: boolean | null; archiveId: number | null }) => !item.isTop && item.archiveId === null);
    });
  }


  created() {
    this.init();
  }


  mounted() {
    this.$EventBus.$on('clickNoteCard', this.setNoteData);
    this.$EventBus.$on('colorValue',this.setBgc)
    this.$EventBus.$on('setArchiveModal',this.closeModal)
    this.$EventBus.$on('deleteNoteModal',this.closeModal)
    this.$EventBus.$on('whichUpdate',this.reRender)

  }
  beforeDestroy(){
    this.$EventBus.$off('clickNoteCard', this.setNoteData);
    this.$EventBus.$off('colorValue',this.setBgc)
    this.$EventBus.$off('setArchiveModal',this.closeModal)
    this.$EventBus.$off('deleteNoteModal',this.closeModal)
    this.$EventBus.$off('whichUpdate',this.reRender)
  }

  save(){
    if(this.clickedNoteData.title === this.$refs.title.innerHTML && this.clickedNoteData.content === this.$refs.input_2.innerHTML){
      return
    }
    this.$nextTick(() => {
      this.axios.patch(`labels/${this.clickedNoteData.id}`, {
        title: this.$refs.title.innerHTML,
        content: this.$refs.input_2.innerHTML
      }).then(res => {
        this.$router.push('/transit') //重载组件
        this.clickedNoteData = res.data.labelInfo
      }).catch(error => {
        this.$toast.error(error.msg);
      });
    });
  }

  isTopfilter(type,note){
    let a = this.topList.findIndex(item=>item.id===note.id)
    if(type === 'restoreArchive' || type === 'restore'){
      if(this.$route.fullPath === '/archive'){
        // TODO 归档的note自动取消置顶
        if (note.archiveId) {
          note.archiveId = null;
        } else {
          note.archiveId = note.userId;
        }
        note.isTop = false;
      }
      this.topList.push(note)
    } else {
      this.topList.splice(a, 1);
    }
  }
  notTopfilter(type,note){
    let b = this.list.findIndex(item=>item.id===note.id)
     if(type === 'restoreArchive' || type === 'restore'){
      this.list.push(note)
      return
    } else {
      this.leaveItem = note
      this.list.splice(b, 1);
    }
  }
  reRender(e:any) {
    let type = e[0]
    let note = e[1]

    if(note.isTop){
     this.isTopfilter(type,note)
    }else {
      this.notTopfilter(type,note)
    }
  }

  clickedNoteData: NoteDataType = [];

  setNoteData(e) {
    this.clickedNoteData = e;
    this.$refs.modal.open();
    this.$refs.modal.$el.childNodes[0].style.overflow = 'visible';
    this.$refs.modal.$el.childNodes[0].style.borderRadius = '10px';
    this.$refs.modal.$el.childNodes[0].style.backgroundColor = `${e.color}`;
  }
  setBgc(e){
    this.$refs.modal.$el.childNodes[0].style.backgroundColor = `${e}`;
  }
  closeModal(){
    this.$refs.modal.close();
  }
  updateList(e: any) {
    this.axios.post(`/labels`, e).then(res => {
      if (res.data.stateCode === 0) {
        this.$toast.success('添加成功', {
          position: 'bottom-left'
        } as CommonOptions);
        this.init();
      }
    });
  }

  changeNote(note: NoteDataType) {
    if (!note.isTop) {
      this.list.push(note);
    } else {
      this.topList.push(note);
    }
  }


}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";

.NoteCard_app_content {
  word-break: break-all;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(#efefef, 1);
    border-radius: 8px;
  }
}

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

  &:after {
    content: '';
    display: block;
    clear: both;
  }
}

</style>
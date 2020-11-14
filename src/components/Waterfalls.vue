<template>
  <div>
    <isotope :list="asyncListArr" class="isoDefault" :options='option'>
      <NoteCard v-for="element in asyncListArr" :key="element.id"
                :backgroundColor="element.color"
                :noteData="element"
                @dataChange="reRender($event,element)"
                @changeView="changeView($event,element)"
                @getData="getData"
      >
        <template v-slot:title>
          {{ element.title }}
        </template>
        <template v-slot:content>
          <at>
            <div v-html="element.content">
            </div>
          </at>
        </template>
      </NoteCard>
    </isotope>

    <Modal :note="note" @modalRef="modal = $event" @dataChange="reRender"></Modal>

  </div>


</template>

<script lang="ts">
import {Component, Emit, Mixins, Prop, PropSync, Vue, Watch} from 'vue-property-decorator';
import {CommonOptions} from 'vue-toastification/dist/types/src/types';
import {NoteDataType} from '@/typs';
import ArchiveTip from '@/components/ArchiveTip.vue';
import Card from '@/components/Card.vue';
import ModalMixinBottomFunc from '@/mixins/ModalMixinBottomFunc';
import Modal from '@/components/Modal.vue';
import {namespace} from 'vuex-class';

const notesStore = namespace('notesStore');


@Component({
  components: {Modal, Card}
})
export default class Waterfalls extends Mixins(ModalMixinBottomFunc) {
  @notesStore.Action('getNotes') getNotes!: Function;
  @PropSync('listArr', {type: Array}) asyncListArr!: NoteDataType[];
  @PropSync('isTop', {type: Boolean}) asyncIsTop!: Boolean;
  option = { //by updatetime
    getSortData: {
      id: 'id'
    },
    sortBy: 'id'
  };
  modal: any | undefined;
  test_note: NoteDataType | undefined;
  note: NoteDataType = {
    id: -1,
    title: '',
    content: '',
    color: '',
    archiveId: null,
    userId: -1,
    isTop: false,
    Tags: []
  };

  mounted() {
    this.modal.$el.childNodes[0].style.overflow = 'visible';
    this.modal.$el.childNodes[0].style.borderRadius = '10px';
  }

  leaveItem:NoteDataType ={
    id: -1,
    title: '',
    content: '',
    color: '',
    archiveId: null,
    userId: -1,
    isTop: false,
    Tags: []
  };
  reRender(e) {
    this.modal.close();
    let type = e[0]
    let id = e[1]
    let itemIndex = this.asyncListArr.findIndex((item: { id: number }) => item.id === id)
    if (type === 'setColor') {
      return;
    }else if(type === 'restoreArchive' || type === 'restore'){
      this.asyncListArr.push(this.leaveItem)
     return
    }
    else {
      this.leaveItem = this.asyncListArr[itemIndex]
      this.asyncListArr.splice(itemIndex, 1);
    }
    this.$nextTick(() => {
      if (this.asyncIsTop) {
        this.asyncListArr = this.asyncListArr.filter((item: { isTop: boolean; archiveId: number | null }) => item.isTop && item.archiveId === null && item.isTop === this.asyncIsTop);
      } else {
        this.asyncListArr = this.asyncListArr.filter((item: { isTop: boolean; archiveId: number | null }) => !item.isTop && item.archiveId === null && item.isTop === this.asyncIsTop);
      }
    });

  }

  //获取店家note的数据
  getData(e: NoteDataType) {
    this.note = e;
    this.modal.open();
    this.modal.$el.childNodes[0].style.backgroundColor = `${e.color}`;
  }

  //更换是否置顶
  changeView(noteId: number, noteData: NoteDataType) {
    if (noteData.archiveId) {
      noteData.archiveId = null;
      this.$toast.success('已将该归档note取消取消归档并且置顶', {position: 'bottom-left'} as CommonOptions);
    }
    this.axios.patch(`/labels/${noteId}`, {isTop: noteData.isTop, archiveId: noteData.archiveId}).then(res => {
      // this.reRender(noteData.id);
      this.asyncListArr.splice(this.asyncListArr.findIndex((item: { id: number }) => item.id === noteData.id), 1);
      this.emitAsyncListArr(res.data.labelInfo);
    }).catch(error => {
      this.$toast.error('切换失败', {
        timeout: 1000
      });
    });
  }
  @Emit('asyncListArr')
  emitAsyncListArr(note: NoteDataType) {
    return note;
  }

}
</script>
<style scoped lang='scss'>


</style>
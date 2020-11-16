<template>
  <div>
    <isotope :list="asyncListArr" class="isoDefault" :options='option'>
      <NoteCard v-for="element in asyncListArr" :key="element.id"
                :backgroundColor="element.color"
                :noteData="element"
                @changeView="changeView($event,element)"
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
  </div>


</template>

<script lang="ts">
import {Component, Emit, Mixins, Prop, PropSync, Vue, Watch} from 'vue-property-decorator';
import {CommonOptions} from 'vue-toastification/dist/types/src/types';
import {NoteDataType} from '@/typs';
import Card from '@/components/Card.vue';
import {namespace} from 'vuex-class';

const notesStore = namespace('notesStore');


@Component({
  components: { Card}
})
export default class Waterfalls extends Vue {
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


  //获取店家note的数据
  getData(e: NoteDataType) {
    this.note = e;
    this.modal.open();
    // this.modal.$el.childNodes[0].style.backgroundColor = `${e.color}`;
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
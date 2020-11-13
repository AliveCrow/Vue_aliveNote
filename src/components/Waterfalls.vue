<template>
  <isotope :list="asyncListArr" class="isoDefault" :options='option'>
    <NoteCard v-for="element in asyncListArr"
              :backgroundColor="element.color"
              :key="element.id"
              :noteData="element"
              @deleteNote="deleteNote"
              @restoreNote="restoreNote"
              @pickColor="pickColor($event,element)"
              @set-archive="setArchive(element)"
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
</template>

<script lang="ts">
import {Component, Emit, Prop, PropSync, Vue, Watch} from 'vue-property-decorator';
import {CommonOptions} from 'vue-toastification/dist/types/src/types';
import {NoteDataType} from '@/typs';
import ArchiveTip from '@/components/ArchiveTip.vue';

@Component
export default class Waterfalls extends Vue {
  @PropSync('listArr', {type: Array}) asyncListArr!: NoteDataType[];
  @PropSync('isTop', {type: Boolean}) asyncIsTop!: Boolean;

  option = { //by updatetime
    getSortData: {
      id: 'id'
    },
    sortBy: 'id'
  };


  reRender(noteId: number) {
    this.asyncListArr.splice(this.asyncListArr.findIndex((item: { id: number }) => item.id === noteId), 1);
    this.$nextTick(() => {
      if (this.asyncIsTop) {
        this.asyncListArr = this.asyncListArr.filter((item: { isTop: boolean; archiveId: number | null }) => item.isTop && item.archiveId === null && item.isTop === this.asyncIsTop);
      } else {
        this.asyncListArr = this.asyncListArr.filter((item: { isTop: boolean; archiveId: number | null }) => !item.isTop && item.archiveId === null && item.isTop === this.asyncIsTop);
      }
    });
  }

  @Emit('deleteNote')
  deleteNote(noteData: NoteDataType) {

    if (this.$route.fullPath === '/rec') {
      return noteData;
    } else if (this.$route.fullPath === '/notes') {
      //软删除
      this.axios.delete(`/labels/${noteData.id}`).then(res => {
        if (res.data.stateCode === 0) {
          this.reRender(noteData.id);
          this.$toast.success(res.data.msg, {
            position: 'bottom-left'
          } as CommonOptions);
          return;
        } else if (res.data.stateCode === -1) {
          this.$toast.error(res.data.msg, {
            timeout: 1000
          });
        }
      }).catch(error => {
        //接口错误
        this.$toast.error('请求错误,删除失败', {
          timeout: 1000
        });
      });
    }
  }


  @Emit('restoreNote')
  restoreNote(e) {
    return e;
  }


  pickColor(color: string, noteData: NoteDataType) {
    noteData.color = color;
    this.axios.patch(`/labels/${noteData.id}`, {color: color}).then(res => {
      if (res.data.stateCode === 0) {
        this.$toast.success('更改成功', {
          timeout: 1000
        });
      } else {
        this.$toast.error('更改失败', {
          timeout: 1000
        });
      }
    }).catch(error => {
      //接口错误
      this.$toast.error('更改失败', {
        timeout: 1000
      });
    });


  }

  setArchive(noteData: NoteDataType) {
    console.log(noteData.archiveId);
    if (noteData.archiveId) {
      noteData.archiveId = null;
    } else {
      noteData.archiveId = noteData.userId;
    }
    noteData.isTop = false;
    this.axios.patch(`/labels/${noteData.id}`, {isTop: noteData.isTop, archiveId: noteData.archiveId}).then(res => {
      if (res.data.stateCode === 0) {
        this.$toast.success(ArchiveTip, {
          position: 'bottom-left'
        } as CommonOptions);
        this.reRender(noteData.id);
      } else {
        this.$toast.error('更改失败', {
          timeout: 1000
        });
      }
    }).catch(error => {
      this.$toast.error('更改失败', {
        timeout: 1000
      });
    });
  }

  //更换是否置顶
  changeView(noteId: number, noteData: NoteDataType) {
    if (noteData.archiveId) {
      noteData.archiveId = null;
      this.$toast.success('已将该归档note取消取消归档并且置顶', {position: 'bottom-left'} as CommonOptions);
    }
    this.axios.patch(`/labels/${noteId}`, {isTop: noteData.isTop, archiveId: noteData.archiveId}).then(res => {
      this.reRender(noteData.id);
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
<template>
  <div  >
    <div id='NoteCard_app' :style="{'background-color':syncBackgroundColor}">
      <div class="to_top" ref="top1" @click="topBtn" v-show="$route.fullPath!=='/rec' && $route.fullPath!=='/search'">
        <eva-icon name="toggle-left-outline" ref="top2" class="icons" v-if="!isTop"></eva-icon>
        <eva-icon name="toggle-right" class="icons" ref="top3" v-else></eva-icon>
      </div>
      <blockquote @click="clickNoteCard" >
        <div class="title NoteCard_app_content">
          <slot name="title"></slot>
        </div>
        <div class="content NoteCard_app_content">
          <slot name="content">
          </slot>
        </div>
        <div class="showTag">
          <div class="showTag_foreach" v-for="(item,index) in syncedNoteData.Tags" :key="index">
            {{ item.name }}
          </div>
        </div>
      </blockquote>
      <BottomFunc :note.sync="syncedNoteData"></BottomFunc>
    </div>
  </div>

</template>

<script lang="ts">
import {
  Component,
  Emit,
  Inject,
  InjectReactive,
  Mixins,
  Prop,
  PropSync,
  Provide,
  Vue,
  Watch
} from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import {NoteDataType} from '@/typs';
import BottomFunc from '@/components/BottomFunc.vue';
import ModalMixinBottomFunc from '@/mixins/ModalMixinBottomFunc';


@Component({
  components: {BottomFunc, Card}
})
export default class NoteCard extends Mixins(ModalMixinBottomFunc) {
  @PropSync('backgroundColor',{type:String}) syncBackgroundColor!:string;
  @Prop(String) className?: string;
  @PropSync('noteData', {type: Object}) syncedNoteData!: NoteDataType;

  isTop:boolean = false;
  mounted() {
    this.isTop = this.syncedNoteData.isTop;
  }

  // TODO 暴露具体哪个note需要更新
  @Emit('whichUpdate')
  whichUpdate(e:string,id:number){
    return arguments
  }
  @Emit('changeView')
  changeView(e:number) {
    return e;
  }


  clickNoteCard(){
    this.$EventBus.$emit('clickNoteCard',this.syncedNoteData)
  }

  topBtn() {
    this.isTop = !this.isTop;
    this.syncedNoteData.isTop = this.isTop;
    this.changeView(this.syncedNoteData.id);
  }
  setColor(color: string, noteData?: NoteDataType){
    this.syncBackgroundColor = color;
    if(noteData===undefined){
      this.syncedNoteData.color = color
      this.axios.patch(`/labels/${this.syncedNoteData.id}`, {color: color}).then(res => {
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
    }else {
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
    // this.modal.$el.childNodes[0].style.backgroundColor = `${color}`;
  }




}
</script>

<style lang="scss">
.sweet-modal.is-visible {
}
</style>

<style scoped lang='scss'>
@import "src/assets/scss/var";
#NoteCard_app {
  max-height: 350px;
  width: 240px;
  word-break: break-all;
  border: 1px solid $defaultBorderColor;
  margin: 8px;
  border-radius: 10px;
  position: relative;
  transition: all .2s ease .05s;
  padding-bottom: 40px;
  .to_top {
    opacity: 0;
    position: absolute;
    top: 10px;
    right: 10px;
    transition: inherit;
    display: flex;
  }
  .NoteCard_app_content {
    margin: 15px;
    text-align: left;

  }
  .title {
    font-size: 1.4rem;
  }
  .content {
    line-height: 24px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    overflow: hidden;
    padding-right: 4px;
    &::-webkit-scrollbar{
      width: 2px;
      background-color: rgba($searchBgcColor,1);
    }
    &::-webkit-scrollbar-thumb{
      background-color: $info;
    }
  }
  &:hover {
    box-shadow: 0 0 6px rgba($defaultFontColor, .4);
    .to_top {
      opacity: 1;
      &:hover {
        fill: $info;
      }
    }
    .bottom_fun {
      opacity: 1;
    }
  }
}
.showTag {
  display: flex;
  overflow: auto;
  height: 30px;
  &::-webkit-scrollbar {
    height: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $hoverColor;
  }
  .showTag_foreach {
    line-height: 10px;
    height: 20px;
    margin: 5px;
    padding: 5px;
    min-width: 60px;
    background-color: $searchBgcColor;
    border-radius: 3px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: .6rem;
  }
}
</style>
<template>
  <div>
    <div id='NoteCard_app':style="{'background-color':backgroundColor}">
      <div class="to_top" ref="top1" @click="topBtn">
        <eva-icon name="toggle-left-outline" ref="top2" class="icons" v-if="!isTop"></eva-icon>
        <eva-icon name="toggle-right" class="icons" ref="top3" v-else></eva-icon>
      </div>
      <blockquote @click="showContent">
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
      <BottomFunc :modal="$refs.modal"
                  :all-tags="allTags"
                  :synced-note-data="syncedNoteData"
                  @pickColor="pickColor"
                  @set-archive="setArchive"
                  @deleteNote="deleteNote"
                  @restoreNote="restoreNote"

      ></BottomFunc>
    </div>
    <sweet-modal ref="modal" >
      <template  v-slot:title >
          {{syncedNoteData.title}}
      </template>
      <div class="content NoteCard_app_content">
        <at v-model="syncedNoteData.content">
          <div id="two" class="input_2" style="text-align: left;padding:8px;border: none;outline: none;letter-spacing:1px" ref="input_2" contenteditable="true" v-html="syncedNoteData.content">
            <slot name="content">

            </slot>
          </div>
        </at>

      </div>
      <div class="showTag" style="flex-wrap: wrap!important;margin-top: 40px">
        <div class="showTag_foreach" v-for="(item,index) in syncedNoteData.Tags" :key="index" >
          {{ item.name }}
        </div>
      </div>
      <div class="bottom_fun_model"
      >
        <blockquote style="display: inline;position: relative" v-on-clickaway="closeCardModel" >
          <eva-icon name="color-palette-outline" class="icons" height="18px" width="18px" @click="showCardModel"
                    data-name="选择颜色"></eva-icon>
          <Card height="104px"
                width="138px"
                :isShow="cardShowModel"
                animationName="fade"
                class-name="colorSelectModel"
          >
            <template v-slot:content>
              <ul class="color_box">
                <li :style="{'background-color': item}"
                    v-for="(item,index) in colorArr"
                    :key="index"
                    @click="pickColor(item)"
                ></li>
              </ul>
            </template>
          </Card>
        </blockquote>
        <blockquote @click="setArchive">
          <eva-icon name="archive-outline"
                    class="icons"
                    height="18px"
                    width="18px"
                    data-name="归档"
          ></eva-icon>
        </blockquote>
        <blockquote style="display: inline;position: relative" v-on-clickaway="closeTagCardModel">
          <eva-icon name="bookmark-outline" class="icons" height="18px" width="18px" data-name="添加标签"
                    @click="showTagCardModel"></eva-icon>
          <Card height="200px"
                :isShow="cardTagShowModel"
                animationName="fade"
                class-name="tagSelectModel"
          >
            <template v-slot:content>
              <ul class="tags_box">
                <!--                    最多27个-->
                <li v-for="(item,index) in allTags" :key="item.id" @click="selectTag(item)">
                  <eva-icon name="square-outline" style="line-height: 12px" height="18px"
                            v-if="syncedNoteData.Tags.findIndex(tag=>tag.id===item.id)===-1"></eva-icon>
                  <eva-icon name="checkmark-square-2-outline" style="line-height: 12px" height="18px"
                            v-else></eva-icon>
                  <p>{{ item.name }}</p>
                </li>
              </ul>
            </template>
          </Card>
        </blockquote>
        <blockquote @click="deleteNote">
          <eva-icon name="trash-2-outline" class="icons" height="18px" width="18px" data-name="删除"></eva-icon>
        </blockquote>
      </div>
    </sweet-modal>
  </div>

</template>

<script lang="ts">
import {Component, Emit, InjectReactive, Prop, PropSync, Provide, Vue, Watch} from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import {mixins} from 'vue-class-component';
import CardMixin from '@/mixins/CardMixin';
import {NoteDataType} from '@/typs';
import BottomFunc from '@/components/BottomFunc.vue';


@Component({
  components: {BottomFunc, Card}
})
export default class NoteCard extends mixins(CardMixin) {
  @Prop(String) backgroundColor: string | undefined;
  @Prop(String) className: string | undefined;

  @PropSync('noteData', {type: Object}) syncedNoteData!: NoteDataType;
  // @Prop(Object) noteData: object | undefined;
  @Prop(Array) selectedTags: [] | undefined;
  pickedTags: [] = [];
  isTop: boolean = false;

    mounted(){
      this.isTop = this.syncedNoteData.isTop
      this.$refs.modal.$el.childNodes[0].style.overflow='visible'
    }

  topBtn() {
    this.isTop = !this.isTop;
    this.syncedNoteData.isTop = this.isTop;
    this.changeView(this.syncedNoteData.id);

  }

  @Emit('changeView')
  changeView(e) {
    return e;
  }

  selectTag(tag: any) {
    let i = this.syncedNoteData.Tags.findIndex((v: { id: number }) => v.id === tag.id);
    if (i !== -1) {
      this.syncedNoteData.Tags.splice(i, 1);
      this.axios.delete(`/labels/${this.syncedNoteData.id}/tag/${tag.id}`).then(res => {

      });
    } else {
      //todo ?
      //@ts-ignore
      this.syncedNoteData.Tags.push(tag);
      this.axios.post(`/labels/${this.syncedNoteData.id}`, {tagId: tag.id}).then(res => {
      });
    }
  }

  @Emit('deleteNote')
  deleteNote() {
    return this.syncedNoteData;
  }

  @Emit('restoreNote')
  restoreNote(){
      return this.syncedNoteData;
  }

  @Emit('pickColor')
  pickColor(e) {
    this.$refs.modal.$el.childNodes[0].style.backgroundColor = `${e}`
    return e;
  }

  @Emit()
  setArchive() {
  }

  showContent(e:Event){
    this.$refs.modal.open()
    this.$refs.modal.$el.childNodes[0].style.backgroundColor = `${this.syncedNoteData.color}`
  }

}
</script>

<style lang="scss">
.sweet-modal.is-visible{
  //background-color: red;
}
</style>

<style scoped lang='scss'>
@import "src/assets/scss/var";

.NoteCard_dialong {
  position: absolute;
}

.clicked{
  width: 500px!important;
}


#NoteCard_app {
  max-height: 350px;
  width: 240px;
  //max-width: 250px;
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
    //max-height: 420px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    overflow: hidden;
  }

  .bottom_fun {
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
    opacity: 0;
    transition: inherit;

    .tagSelect {
      max-height: 200px;
      top: -90px !important;
      left: 50px;

      .tags_box {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        padding: 5px;

        li {
          height: 20px;
          margin: 6px;
          display: flex;
          align-items: center;
          font-size: .6rem;
          cursor: pointer;

          > p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &:hover {
            background-color: $searchBgcColor;
          }

        }
      }
    }

    .colorSelect {
      box-shadow: none !important;
      top: -100px !important;
      left: 0;

      .color_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        .selected {
          background-image: url('http://qiniu.dreamsakula.top/images/20201109113117.png');
          background-size: 100% 100%;
        }

        li {
          min-height: 27px;
          min-width: 27px;
          border-radius: 50%;
          margin: 3px;

          &:hover {
            border: 2px solid $defaultFontColor;
          }
        }
      }
    }

    .icons {
      line-height: 9px;
      margin: 5px;
      padding: 5px;
      border-radius: 50%;
      position: relative;

      &:after {
        content: attr(data-name);
        position: absolute;
        bottom: -20px;
        height: 10px;
        font-size: .1rem;
        width: 50px;
        border-radius: 3px;
        padding: 3px;
        line-height: 10px;
        color: #fff;
        background-color: rgba($defaultFontColor, .8);
        left: 50%;
        transform: translateX(-50%);
        transition: opacity .25s linear .2s;
        opacity: 0;
      }

      &:hover {
        background-color: rgba(#efefef, .9);

        &:after {
          opacity: 1;
        }
      }
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
  min-height: 30px;
  overflow-y: auto;
  display: flex;

  &::-webkit-scrollbar {
    height: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: $defaultBorderColor;
    border-radius: 5px;
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
.bottom_fun_model {
  display: flex;

  transition: inherit;

  .tagSelectModel {
    max-height: 200px;
    top: 40px !important;
    left: 20px;

    .tags_box {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      padding: 5px;

      li {
        height: 20px;
        margin: 6px;
        display: flex;
        align-items: center;
        font-size: .6rem;
        cursor: pointer;

        > p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:hover {
          background-color: $searchBgcColor;
        }

      }
    }
  }

  .colorSelectModel {
    box-shadow: none !important;
    top: 40px !important;
    left: 0;

    .color_box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .selected {
        background-image: url('http://qiniu.dreamsakula.top/images/20201109113117.png');
        background-size: 100% 100%;
      }

      li {
        min-height: 27px;
        min-width: 27px;
        border-radius: 50%;
        margin: 3px;

        &:hover {
          border: 2px solid $defaultFontColor;
        }
      }
    }
  }

  .icons {
    line-height: 9px;
    margin: 5px;
    padding: 5px;
    border-radius: 50%;
    position: relative;

    &:after {
      content: attr(data-name);
      position: absolute;
      bottom: -20px;
      height: 10px;
      font-size: .1rem;
      width: 50px;
      border-radius: 3px;
      padding: 3px;
      line-height: 10px;
      color: #fff;
      background-color: rgba($defaultFontColor, .8);
      left: 50%;
      transform: translateX(-50%);
      transition: opacity .25s linear .2s;
      opacity: 0;
    }

    &:hover {
      background-color: rgba(#efefef, .9);

      &:after {
        opacity: 1;
      }
    }
  }
}


</style>
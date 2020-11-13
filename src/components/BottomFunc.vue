<template>
  <div class="bottom_fun" >
    <blockquote v-show="$route.fullPath==='/notes'"  style="display: inline;position: relative" v-on-clickaway="closeCard" @click="showCard">
      <eva-icon name="color-palette-outline" class="icons" height="18px" width="18px"
                data-name="选择颜色"></eva-icon>
      <Card height="104px"
            width="138px"
            :isShow="cardShow"
            animationName="fade"
            class-name="colorSelect"
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
    <blockquote v-show="$route.fullPath==='/archive' || $route.fullPath==='/notes'"  @click="setArchive">
      <eva-icon name="archive-outline"
                class="icons"
                height="18px"
                width="18px"
                :data-name="[$route.fullPath==='/archive'?'取消归档':'归档']"
      ></eva-icon>
    </blockquote>
    <blockquote v-show="$route.fullPath==='/notes'|| $route.fullPath==='/notes'"  style="display: inline;position: relative" v-on-clickaway="closeTagCard">
      <eva-icon name="bookmark-outline" class="icons" height="18px" width="18px" data-name="添加标签"
                @click="showTagCard"></eva-icon>
      <Card height="200px"
            :isShow="cardTagShow"
            animationName="fade"
            class-name="tagSelect"
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

    <blockquote v-show="$route.fullPath==='/rec'"  @click="restoreNote">
      <eva-icon name="minus-circle" class="icons" height="18px" width="18px"
                data-name="还原"
      ></eva-icon>
    </blockquote>
    <blockquote v-show="$route.fullPath==='/rec' || $route.fullPath==='/notes'"  @click="deleteNote">
      <eva-icon name="trash-2-outline" class="icons" height="18px" width="18px"
                :data-name="[$route.fullPath==='/rec'?'彻底删除':'删除']"
      ></eva-icon>
    </blockquote>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import {NoteDataType} from '@/typs';
@Component({
  components: {Card}
})
export default class BottomFunc extends Vue {
  @Prop() modal?:any;
  @Prop(Array) allTags:[]|undefined;
  @Prop() syncedNoteData!:NoteDataType;

  //
  cardShow: boolean = false;
  colorArr: string[] = [
    '#fff', '#99b898', '#feceab', '#ff847c', '#e84a5f',
    '#de7119', '#dee3e2', '#116979', '#18b0b0',
    '#8fcfd1', '#df5e88', '#f6ab6c'
  ];

  //tagCard
  cardTagShow: boolean = false;


  created(){
  }

  //Card
  closeCard(){
    this.cardShow = false;
  }
  showCard(){
    this.cardShow = !this.cardShow;
  }
  @Emit('pickColor')
  pickColor(e) {
    this.modal.$el.childNodes[0].style.backgroundColor = `${e}`
    return e;
  }

  //Archive
  @Emit()
  setArchive() {
  }

  //TagCard
  closeTagCard(){
    this.cardTagShow = false;
  }
  showTagCard(){
    this.cardTagShow = !this.cardTagShow;
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

  //delete
  @Emit('deleteNote')
  deleteNote() {
    return this.syncedNoteData;
  }

  @Emit('restoreNote')
  restoreNote(){
      return this.syncedNoteData
  }

}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";
.bottom_fun {
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  opacity: 1;
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

</style>
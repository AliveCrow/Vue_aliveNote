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
                @click="setColor(item)"
            ></li>
          </ul>
        </template>
      </Card>
    </blockquote>
    <blockquote v-show="$route.fullPath==='/archive' || $route.fullPath==='/notes'"  @click="setArchive(note)">
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
                        v-if="note.Tags.findIndex(tag=>tag.id===item.id)===-1"></eva-icon>
              <eva-icon name="checkmark-square-2-outline" style="line-height: 12px" height="18px"
                        v-else></eva-icon>
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </template>
      </Card>
    </blockquote>
    <blockquote v-show="$route.fullPath==='/rec'"  @click="restoreNote(note)">
      <eva-icon name="minus-circle" class="icons" height="18px" width="18px"
                data-name="还原"
      ></eva-icon>
    </blockquote>
    <blockquote v-show="$route.fullPath==='/rec' || $route.fullPath==='/notes'"  @click="deleteNote(note)">
      <eva-icon name="trash-2-outline" class="icons" height="18px" width="18px"
                :data-name="[$route.fullPath==='/rec'?'彻底删除':'删除']"
      ></eva-icon>
    </blockquote>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Mixins, Prop, Vue} from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import {NoteDataType} from '@/typs';
import ModalMixinBottomFunc from '@/mixins/ModalMixinBottomFunc';
import ArchiveTip from '@/components/ArchiveTip.vue';
import {CommonOptions} from 'vue-toastification/dist/types/src/types';
import {mixins} from 'vue-class-component';
@Component({
  components: {Card}
})
export default class BottomFunc extends mixins(ModalMixinBottomFunc) {
  @Prop() modal?:any;
  @Prop() note!:NoteDataType;

  @Emit('selectColor')
  pickColor(e:string) {
    // this.modal.$el.childNodes[0].style.backgroundColor = `${e}`
    // this.SyncWaterFall()
    return e;
  }
  @Emit('colorValue')
  colorValue(e:string){
    return e
  }

  test(){
    console.log('2333');
  }

  setColor(color:string){
      this.note.color = color;
      this.axios.patch(`/labels/${this.note.id}`, {color: color}).then(res => {
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
      this.SyncWaterFall('setColor')
      this.colorValue(color)
  }
  setArchive(noteData: NoteDataType) {
    if (noteData.archiveId) {
      noteData.archiveId = null;
    } else {
      noteData.archiveId = noteData.userId;
    }
    noteData.isTop = false;
    this.axios.patch(`/labels/${noteData.id}`, {isTop: noteData.isTop, archiveId: noteData.archiveId}).then(res => {
      if (res.data.stateCode === 0) {
        if(this.$route.fullPath!=='/archive'){
          this.$toast.info({
            component:ArchiveTip,
            props:{
              content: "已将归档"
            },
            listeners:{
              // click:()=>{}
              abc:()=>{
                this.axios.patch(`/labels/${noteData.id}`, { archiveId: null}).then(res=>{
                  this.$toast.success('已恢复',{position:"bottom-left"} as CommonOptions)
                  this.SyncWaterFall('restoreArchive')
                })
              }
            }
          }, {
            position: 'bottom-left'
          } as CommonOptions);
        }else {
          this.$toast.success("恢复成功", {
            position: 'bottom-left'
          } as CommonOptions);
        }
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
    this.SyncWaterFall('setArchive')
  }
  deleteNote(noteData: NoteDataType) {
    if (this.$route.fullPath === '/rec') {
      //彻底删除
      this.axios.delete(`/labels/delete/${noteData.id}`).then(res=>{
        this.$toast.success(res.data.res,{position:"bottom-left"} as CommonOptions)
      }).catch(error=>{
        this.$toast.error('请求错误')
      })
    } else if (this.$route.fullPath === '/notes') {
      //软删除
      this.axios.delete(`/labels/${noteData.id}`).then(res => {
        if (res.data.stateCode === 0) {
          this.$toast.warning({
            component:ArchiveTip,
            props:{
              content: "已将note放入回收站"
            },
            listeners:{
              // click:()=>{}
              abc:()=>{
                this.axios.post(`/labels/restore/${noteData.id}`).then(res=>{
                  this.SyncWaterFall('restore')
                  this.$toast.success(res.data.res,{position:"bottom-left"} as CommonOptions)
                })
              }
            }
          }, {
            position: 'bottom-left'
          } as CommonOptions)

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
    this.SyncWaterFall('deleteNote')
  }
  restoreNote(noteData:NoteDataType){
    this.axios.post(`/labels/restore/${noteData.id}`).then(res=>{
      this.$toast.success(res.data.res,{position:"bottom-left"} as CommonOptions)
    }).catch(error=>{
      this.$toast.error('请求错误')
    })
    this.SyncWaterFall('restoreNote')
  }
  selectTag(tag: any) {
    let i = this.note.Tags.findIndex((v: { id: number }) => v.id === tag.id);
    if (i !== -1) {
      this.note.Tags.splice(i, 1);
      this.axios.delete(`/labels/${this.note.id}/tag/${tag.id}`).then(res => {

      });
    } else {
      //todo ?
      //@ts-ignore
      this.note.Tags.push(tag);
      this.axios.post(`/labels/${this.note.id}`, {tagId: tag.id}).then(res => {
      });
    }
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
  opacity: 0;
  transition: inherit;
  .tagSelect {
    max-height: 200px;
    top: 55px !important;
    left: 0px;

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
    top: 55px !important;
    left: -100px;

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
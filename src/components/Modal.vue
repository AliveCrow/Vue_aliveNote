<template>
  <sweet-modal @close="saveNote" ref="modal">
    <template v-slot:title>
              <span contenteditable
                    ref="title"
                    v-html="note.title"
                    style="padding: 10px;border: none;outline: none"
              >
              </span>
    </template>

    <div class=" NoteCard_app_content" style="overflow-y: scroll!important;max-height: 60vh">
      <div id="two"
           class="input_2"
           style="text-align: left;padding:8px 8px 0 ;border: none;outline: none;letter-spacing:1px;"
           ref="input_2"
           contenteditable
           v-html="note.content"
      >
      </div>
    </div>
    <div class="showTag" style="flex-wrap: wrap!important;margin-top: 20px">
      <div class="showTag_foreach" v-for="(item,index) in note.Tags" :key="index">
        {{ item.name }}
      </div>
    </div>
    <BottomFunc :note="note" style="opacity: 1;position: relative;margin-bottom: -20px"
                :modal="this.$refs.modal"
                @updateWaterFall="dataChange($event,note.id)"
                @colorValue="setBgc"
    ></BottomFunc>
  </sweet-modal>
</template>

<script lang="ts">
import {Component, Emit, Mixins, Prop, Vue, Watch} from 'vue-property-decorator';
import {NoteDataType} from '@/typs';
import ModalMixinBottomFunc from '@/mixins/ModalMixinBottomFunc';
import BottomFunc from '@/components/BottomFunc.vue';

@Component({
  components: {BottomFunc}
})
export default class Modal extends Mixins(ModalMixinBottomFunc) {
  @Prop() note!: NoteDataType;

  @Emit('modalRef')
  modelRef() {
    return this.$refs.modal;
  }

  mounted() {
    this.modelRef();
    //
  }
  setBgc(color){
    this.$refs.modal.$el.childNodes[0].style.backgroundColor = `${color}`
  }

  saveNote() {
    this.$nextTick(() => {
      this.axios.patch(`labels/${this.note.id}`, {
        title: this.$refs.title.innerHTML,
        content: this.$refs.input_2.innerHTML
      }).then(res => {
        this.$router.push('/transit') //重载组件
        // this.dataChange(this.note.id)
      }).catch(error => {
        this.$toast.error(error.msg);
      });
    });

  }


}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";

.NoteCard_app_content {
  margin-bottom: 50px;
  text-align: left;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(#efefef, .5);
    border-radius: 8px;
  }
}

.title {
  font-size: 1.4rem;
}

.content {
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  overflow: hidden;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 2px;
    background-color: rgba($searchBgcColor, 1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: $info;
  }
}

.showTag {
  max-height: 120px;
  overflow-y: auto;
  display: flex;
  flex-wrap: nowrap;

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
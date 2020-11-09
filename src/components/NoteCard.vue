<template>
    <div v-if="true" id='NoteCard_app' :style="{'width':width}">
      <div class="to_top">
        <eva-icon name="toggle-left-outline" class="icons" v-if="true"></eva-icon>
        <eva-icon name="toggle-right" class="icons  " v-else></eva-icon>
      </div>
      <div class="title NoteCard_app_content">
        <slot name="title"></slot>
      </div>
      <div class="content NoteCard_app_content">
        <slot name="content"></slot>
      </div>
      <slot></slot>
      <div>

      </div>
      <div class="bottom_fun">
        <eva-icon name="color-palette-outline" class="icons" height="18px" width="18px" data-name="选择颜色"></eva-icon>
        <eva-icon name="archive-outline" class="icons" height="18px" width="18px" data-name="归档"></eva-icon>
        <eva-icon name="bookmark-outline" class="icons" height="18px" width="18px" data-name="添加标签"></eva-icon>
        <eva-icon name="trash-2-outline" class="icons" height="18px" width="18px" data-name="删除"></eva-icon>
      </div>
    </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class NoteCard extends Vue {
  @Prop(String) width: string |undefined;
  @Prop(String) height: string |undefined;

}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";

.NoteCard_dialong{
  position: absolute;
}


#NoteCard_app {
  max-height: 350px;
  width: 240px;
  max-width: 240px;
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

</style>
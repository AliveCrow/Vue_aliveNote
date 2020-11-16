<template>
  <div class="bottom_fun">
    <blockquote
      v-show="$route.fullPath === '/notes' || $route.fullPath === '/search'"
      style="display: inline; position: relative"
      v-on-clickaway="closeCard"
      @click="cardShow = !cardShow"
    >
      <eva-icon
        name="color-palette-outline"
        class="icons"
        height="18px"
        width="18px"
        data-name="选择颜色"
      ></eva-icon>
      <Card
        height="104px"
        width="138px"
        :isShow="cardShow"
        animationName="fade"
        class-name="colorSelect"
      >
        <template v-slot:content>
          <ul class="color_box">
            <li
              :style="{ 'background-color': item }"
              v-for="(item, index) in colorArr"
              :key="index"
              @click="setColor(item)"
            ></li>
          </ul>
        </template>
      </Card>
    </blockquote>
    <blockquote
      v-show="
        $route.fullPath === '/archive' ||
        $route.fullPath === '/notes' ||
        $route.fullPath === '/search'
      "
      @click="setArchive(asyncNote)"
    >
      <eva-icon
        name="archive-outline"
        class="icons"
        height="18px"
        width="18px"
        :data-name="[$route.fullPath === '/archive' ? '取消归档' : '归档']"
      ></eva-icon>
    </blockquote>
    <blockquote
      v-show="
        $route.fullPath === '/notes' ||
        $route.fullPath === '/notes' ||
        $route.fullPath === '/search'
      "
      style="display: inline; position: relative"
      v-on-clickaway="closeTagCard"
    >
      <eva-icon
        name="bookmark-outline"
        class="icons"
        height="18px"
        width="18px"
        data-name="添加标签"
        @click="cardTagShow = !cardTagShow"
      ></eva-icon>
      <Card
        height="200px"
        :isShow="cardTagShow"
        animationName="fade"
        class-name="tagSelect"
      >
        <template v-slot:content>
          <ul class="tags_box">
            <!--                    最多27个-->
            <li v-for="item in allTags" :key="item.id" @click="selectTag(item)">
              <eva-icon
                name="square-outline"
                style="line-height: 12px"
                height="18px"
                v-if="
                  asyncNote.Tags.findIndex((tag) => tag.id === item.id) === -1
                "
              ></eva-icon>
              <eva-icon
                name="checkmark-square-2-outline"
                style="line-height: 12px"
                height="18px"
                v-else
              ></eva-icon>
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </template>
      </Card>
    </blockquote>
    <blockquote
      v-show="$route.fullPath === '/rec'"
      @click="restoreNote(asyncNote)"
    >
      <eva-icon
        name="minus-circle"
        class="icons"
        height="18px"
        width="18px"
        data-name="还原"
      ></eva-icon>
    </blockquote>
    <blockquote
      v-show="
        $route.fullPath === '/rec' ||
        $route.fullPath === '/notes' ||
        $route.fullPath === '/search'
      "
      @click="deleteNote(asyncNote)"
    >
      <eva-icon
        name="trash-2-outline"
        class="icons"
        height="18px"
        width="18px"
        :data-name="[$route.fullPath === '/rec' ? '彻底删除' : '删除']"
      ></eva-icon>
    </blockquote>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Mixins,
  Prop,
  PropSync,
  Vue,
} from "vue-property-decorator";
import Card from "@/components/Card.vue";
import { NoteDataType } from "@/typs";
import ArchiveTip from "@/components/ArchiveTip.vue";
import { CommonOptions } from "vue-toastification/dist/types/src/types";
import { mixins } from "vue-class-component";
import CommonData from "@/mixins/CommonData";
import any = jasmine.any;
@Component({
  components: { Card },
})
export default class BottomFunc extends mixins<any>(CommonData) {
  @Prop() modal?: any;

  @PropSync("note", { type: Object }) asyncNote!: NoteDataType;
  $EventBus: any;

  mounted() {
    if (Object.keys(this.asyncNote) === []) {
      this.asyncNote = {
        Tags: [],
        id: -1,
        title: "",
        content: "",
        color: "",
        archiveId: null,
        userId: -1,
        isTop: false,
      };
    }
  }

  whichUpdate(type: string, note: Record<string, any>) {
    this.$EventBus.$emit("whichUpdate", [type, note]);
  }
  setColor(color: string) {
    this.asyncNote.color = color;
    this.axios
      .patch(`/labels/${this.asyncNote.id}`, { color: color })
      .then((res) => {
        if (res.data.stateCode === 0) {
          this.$toast.success("更改成功", {
            timeout: 1000,
          });
        } else {
          this.$toast.error("更改失败", {
            timeout: 1000,
          });
        }
      })
      .catch((error) => {
        //接口错误
        this.$toast.error("更改失败", {
          timeout: 1000,
        });
      });
    // TODO 暴露选择的color
    this.$EventBus.$emit("colorValue", color);
  }
  setArchive(noteData: NoteDataType) {
    if (this.$route.fullPath !== "/archive") {
      this.axios
        .patch(`/labels/${noteData.id}`, { archiveId: noteData.userId })
        .then((res) => {
          if (res.data.stateCode === 0) {
            this.$EventBus.$emit("setArchiveModal");
            this.$toast.info(
              {
                component: ArchiveTip,
                props: {
                  content: "已将归档",
                },
                listeners: {
                  // click:()=>{}
                  abc: () => {
                    this.axios
                      .patch(`/labels/removeArchive/${noteData.id}`, {
                        archiveId: null,
                      })
                      .then((res) => {
                        this.$toast.success("已恢复", {
                          position: "bottom-left",
                        } as CommonOptions);
                        // this.updateType('restoreArchive')
                        this.whichUpdate("restoreArchive", noteData);
                      });
                  },
                },
              },
              {
                position: "bottom-left",
              } as CommonOptions
            );
          } else {
            this.$toast.error("更改失败", {
              timeout: 1000,
            });
          }
        });
    } else {
      this.axios.patch(`/labels/removeArchive/${noteData.id}`).then((res) => {
        this.$EventBus.$emit("restoreArchive", noteData);
        this.$toast.success("恢复成功", {
          position: "bottom-left",
        } as CommonOptions);
      });
    }

    // TODO 更新页面
    // this.updateType('setArchive')
    this.whichUpdate("setArchive", this.asyncNote);
  }

  deleteNote(noteData: NoteDataType) {
    if (this.$route.fullPath === "/rec") {
      //彻底删除
      this.axios
        .delete(`/labels/delete/${noteData.id}`)
        .then((res) => {
          this.$EventBus.$emit("deleteNoteFover", noteData);
          this.$toast.success(res.data.res, {
            position: "bottom-left",
          } as CommonOptions);
        })
        .catch((error) => {
          this.$toast.error("请求错误");
        });
    } else if (
      this.$route.fullPath === "/notes" ||
      this.$route.fullPath === "/search"
    ) {
      //软删除
      this.axios
        .delete(`/labels/${noteData.id}`)
        .then((res) => {
          this.$EventBus.$emit("deleteNoteModal");
          this.$EventBus.$emit("deleteNoteSearch", noteData);
          if (res.data.stateCode === 0 && this.$route.fullPath !== "/search") {
            this.$toast.warning(
              {
                component: ArchiveTip,
                props: {
                  content: "已将note放入回收站",
                },
                listeners: {
                  // click:()=>{}
                  abc: () => {
                    this.axios
                      .post(`/labels/restore/${noteData.id}`)
                      .then((res) => {
                        this.whichUpdate("restore", noteData);
                        this.$toast.success(res.data.res, {
                          position: "bottom-left",
                        } as CommonOptions);
                      });
                  },
                },
              },
              {
                position: "bottom-left",
              } as CommonOptions
            );

            return;
          } else if (res.data.stateCode === -1) {
            this.$toast.error(res.data.msg, {
              timeout: 1000,
            });
          }
        })
        .catch((error) => {
          //接口错误
          this.$toast.error("请求错误,删除失败", {
            timeout: 1000,
          });
        });
    }
    // this.updateType('deleteNote')
    this.whichUpdate("deleteNote", this.asyncNote);
  }

  restoreNote(noteData: NoteDataType) {
    this.axios
      .post(`/labels/restore/${noteData.id}`)
      .then((res) => {
        this.$EventBus.$emit("restoreNote", noteData);
        this.$toast.success(res.data.res, {
          position: "bottom-left",
        } as CommonOptions);
      })
      .catch((error) => {
        this.$toast.error("请求错误");
      });
    // this.updateType('restoreNote')
  }
  selectTag(tag: any) {
    const i = this.asyncNote.Tags.findIndex(
      (v: { id: number }) => v.id === tag.id
    );
    if (i !== -1) {
      this.asyncNote.Tags.splice(i, 1);
      this.axios
        .delete(`/labels/${this.asyncNote.id}/tag/${tag.id}`)
        .then((res) => {});
    } else {
      //todo ?
      //@ts-ignore
      this.asyncNote.Tags.push(tag);
      this.axios
        .post(`/labels/${this.asyncNote.id}`, { tagId: tag.id })
        .then((res) => {});
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
    top: 40px !important;
    left: 0;

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
        font-size: 0.6rem;
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
    left: 0;

    .color_box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .selected {
        background-image: url("http://qiniu.dreamsakula.top/images/20201109113117.png");
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
      font-size: 0.1rem;
      width: 50px;
      border-radius: 3px;
      padding: 3px;
      line-height: 10px;
      color: #fff;
      background-color: rgba($defaultFontColor, 0.8);
      left: 50%;
      transform: translateX(-50%);
      transition: opacity 0.25s linear 0.2s;
      opacity: 0;
    }

    &:hover {
      background-color: rgba(#efefef, 0.9);

      &:after {
        opacity: 1;
      }
    }
  }
}
</style>
<template>
  <div class="container-box__right_input" ref="box__right_input">
    <div class="input_box">
      <label for="one">
        <input type="text" ref="input_title" @focus="show = true;" id="one" class="input_1" placeholder="标题">
      </label>
      <div class="to_top" v-show="show" @click="isTop = !isTop;">
        <eva-icon name="toggle-left-outline" class="icons" v-if="!isTop"></eva-icon>
        <eva-icon name="toggle-right" class="icons  " v-else></eva-icon>
      </div>
      <blockquote v-show="show">
          <div id="two" class="input_2" ref="input_2" contenteditable="true" >
          </div>
        <div class="showTag">
          <div class="showTag_foreach" v-for="item in selectedTags" :key="item.id">
            {{ item.name }}
          </div>
        </div>
        <div class="input_box__fun">
          <div>
            <blockquote style="display: inline;position: relative" @click="cardShow = !cardShow;">
              <eva-icon name="color-palette-outline" class="icons add_color" v-on-clickaway="closeCard"></eva-icon>
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
                        @click="selectColor(item)"
                    ></li>
                  </ul>
                </template>
              </Card>
            </blockquote>
            <blockquote style="display: inline" @click="goArchive">
              <eva-icon name="archive-outline"
                        class="icons archive"
              ></eva-icon>
            </blockquote>
            <blockquote style="display: inline;position: relative" v-on-clickaway="closeTagCard">
              <eva-icon name="bookmark-outline" class="icons tags" @click="cardTagShow = !cardTagShow;"></eva-icon>
              <Card height="200px"
                    :isShow="cardTagShow"
                    animationName="fade"
                    class-name="tagsSelect"
              >
                <template v-slot:content>
                  <ul class="tags_box">
                    <!--                    最多27个-->
                    <li v-for="(item,index) in allTags" :key="item.id" @click="selectTag(item)">
                      <eva-icon name="square-outline" style="line-height: 12px" height="18px"
                                v-if="!selectedTags.includes(item)"></eva-icon>
                      <eva-icon name="checkmark-square-2-outline" style="line-height: 12px" height="18px"
                                v-else></eva-icon>
                      <p>{{ item.name }}</p>
                    </li>
                  </ul>
                </template>
              </Card>
            </blockquote>
          </div>
          <button @click="submit">关闭</button>
        </div>
      </blockquote>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, PropSync} from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import {CommonOptions} from 'vue-toastification/dist/types/src/types';
import CommonData from '@/mixins/CommonData';
import {mixins} from 'vue-class-component';

@Component({
  components: {Card}
})
export default class InputCard extends  mixins(CommonData) {
  @PropSync('isShow', {type: Boolean}) show!: boolean;
  selectedTags: [] = [];
  selected: number |null = null;
  isTop:boolean = false;
  selectedColor:string |undefined;


  @Emit('submit')
  submit(type: string) {
    this.show = false;
    let titleContent = this.$refs.input_title.value;
    let textContent = this.$refs.input_2.innerHTML;
    if (titleContent === '' && textContent === '') {
      this.$refs.input_title.value = '空白记事';
    }
    let note = {
      title: this.$refs.input_title.value,
      content: this.$refs.input_2.innerHTML,
      isTop: this.isTop,
      color: this.selectedColor,
      tags: this.selectedTags
    };
    this.reset();
    return note;
  }


  created() {
    this.$nextTick(() => {
      this.$refs.input_2.setAttribute('data-placeholder', '添加记事...');
      this.$refs.input_2.addEventListener('input', function (e: any) {
        let content = e.target.textContent;
        if (content.length !== 0) {
          this.removeAttribute('data-placeholder');
        } else {
          this.setAttribute('data-placeholder', '添加记事...');
        }
      });
    });
  }

  selectTag(tag:never) {
    let i = this.selectedTags.indexOf(tag);
    if (i !== -1) {
      this.selectedTags.splice(i, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }


  selectColor(item: string) {
    this.$refs.box__right_input.style.backgroundColor = item;
    this.$refs.input_title.style.backgroundColor = item;
    this.selectedColor = item;
  }

  reset() {
    this.$refs.box__right_input.style.backgroundColor = '#fff';
    this.$refs.input_title.style.backgroundColor = '#fff';
    this.$refs.input_title.value = '';
    this.$refs.input_2.textContent = '';
    this.$refs.input_2.setAttribute('data-placeholder', '添加记事...');
    this.isTop = false;
    this.selectedTags = [];
  };

  goArchive() {
    this.show = false;
    this.axios.get('/users').then(res => {
      let note = {
        title: this.$refs.input_title.value,
        content: this.$refs.input_2.textContent,
        isTop: this.isTop,
        color: this.selectedColor,
        archiveId: parseInt(res.data.userInfo.Archive.id),
        tags: [
          {id: 1, name: '哈哈哈'}
        ]
      };
      this.axios.post('/labels', note).then(res => {
        if (res.data.stateCode === 0) {
          this.$toast.success("已归档", {
            position: 'bottom-left'
          } as CommonOptions);
          this.reset();
        }
      });
    }).catch(error => {
      console.log(error);
    });

  }

}
</script>
<style scoped lang='scss'>
@import "../assets/scss/var";

.container-box__right_input {
  width: 500px;
  display: flex;
  flex-direction: column;
  margin: 50px auto 120px;
  //transform: translateX(-120px);
  border-radius: 10px;
  box-shadow: 0 0 6px rgba($defaultFontColor, .4);
  transition: background-color .2s ease;
  z-index: 100;

  .input_box, {
    position: relative;
    display: flex;
    flex-direction: column;

    input, #two {
      width: 100%;
      border: none;
      outline: none;
      text-align: left;
      border-radius: 10px;

      &::placeholder {
        font-weight: 500;
      }
    }

    .input_1 {
      font-size: 1.2rem;
      font-weight: 500;
      padding: 15px 50px 15px 10px;
      transition: background-color .2s ease;
    }

    .input_2 {
      font-size: .9rem;
      padding: 5px 50px 5px 10px;

      &:after {
        content: attr(data-placeholder);
        font-size: .9rem;
      }
    }

    .to_top {
      height: 35px;
      padding: 5px;
      position: absolute;
      right: 0;
      cursor: pointer;

      &:hover {
        fill: $info;
      }

      &:active {
        fill: $info;
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

    .input_box__fun {
      display: flex;
      margin: 10px;
      align-items: center;
      justify-content: space-between;

      .tagsSelect {
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
        top: 25px !important;
        left: -80px;

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
        height: 36px;
        width: 36px;
        margin: 0 10px;
        padding: 5px;
        border-radius: 50%;
        position: relative;

        &:before {
          content: '';
          opacity: 0;
          transition: opacity .25s ease .4s;

        }
      ;

        &:hover {
          background-color: rgba(#efefef, .9);

          &:before {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: .1rem;
            width: 50px;
            border-radius: 3px;
            padding: 3px;
            height: 20px;
            line-height: 20px;
            color: #fff;
            background-color: rgba($defaultFontColor, .8);
            opacity: 1;
          }
        }

      }

      button {
        border: none;
        padding: 5px 15px;
        background-color: #fff;
        cursor: pointer;
        margin-right: 10px;

        &:hover {
          background-color: rgba(#efefef, .9);
        }
      }

      .add_color {
        &:hover {
          &:before {
            content: '改变颜色';
          }
        }
      }

      .archive {
        &:hover {
          &:before {
            content: '归档';
          }
        }
      }

      .tags {
        &:hover {
          &:before {
            content: '添加标签';
          }
        }
      }
    }
  }

}

</style>
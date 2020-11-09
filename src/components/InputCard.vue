<template>
  <div class="container-box__right_input" ref="box__right_input">
    <div class="input_box">
      <label for="one">
        <input type="text" ref="input_title" @focus="open" id="one" class="input_1" placeholder="标题">
      </label>
      <div class="to_top" v-show="show" @click="topBtn">
        <eva-icon name="toggle-left-outline" class="icons" v-if="!isTop"></eva-icon>
        <eva-icon name="toggle-right" class="icons  " v-else></eva-icon>
      </div>
      <blockquote v-show="show">
        <div id="two" class="input_2" ref="input_2" contenteditable="true">
          <slot></slot>
        </div>
        <div class="input_box__fun">
          <div>
            <blockquote style="display: inline;position: relative" v-on-clickaway="closeCard" @click="showCard">
              <eva-icon name="color-palette-outline" class="icons add_color"></eva-icon>
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
            <blockquote style="display: inline" @click="archive">
              <eva-icon name="archive-outline"
                        class="icons archive"

              ></eva-icon>
            </blockquote>
            <blockquote style="display: inline;position: relative" v-on-clickaway="closeCard1" @click="showCard1">
              <eva-icon name="bookmark-outline" class="icons tags"></eva-icon>
              <Card height="104px"
                    width="138px"
                    :isShow="cardShow1"
                    animationName="fade"
                    class-name="colorSelect"
              >
                <template v-slot:content>
                  <ul class="tags_box">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
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
import {Component, Emit, PropSync, Vue} from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import ArchiveTip from '@/components/ArchiveTip.vue';

@Component({
  components: {Card}
})
export default class InputCard extends Vue {
  public $refs!: {
    box__right_input: HTMLDivElement;
    input_2: HTMLDivElement;
    input_title: HTMLInputElement;
  };
  @PropSync('isShow', {type: Boolean}) show!: boolean;
  isTop: boolean = false;
  cardShow: boolean = false;
  cardShow1: boolean = false;
  colorArr: string[] = [
    '#fff', '#99b898', '#feceab', '#ff847c', '#e84a5f',
    '#de7119', '#dee3e2', '#116979', '#18b0b0',
    '#8fcfd1', '#df5e88', '#f6ab6c'
  ];
  selectedColor: string = '#fff';
  tags:string[]=[]


  @Emit('open')
  open() {
  }

  topBtn() {
    this.isTop = !this.isTop;
  }

  selectColor(item: string) {
    this.$refs.box__right_input.style.backgroundColor = item;
    this.$refs.input_title.style.backgroundColor = item;
    this.selectedColor = item;
  }

  showCard() {
    this.cardShow = !this.cardShow;
  };

  closeCard() {
    this.cardShow = false;
  };

  showCard1() {
    this.cardShow1 = !this.cardShow1;
  };

  closeCard1() {
    this.cardShow1 = false;
  };

  reset() {
    this.$refs.box__right_input.style.backgroundColor = '#fff';
    this.$refs.input_title.style.backgroundColor = '#fff';
    this.$refs.input_title.value = '';
    this.$refs.input_2.textContent = '';
    this.isTop = false;
    this.tags = []
  };

  submit() {
    this.show = false;
    let note = {
      title: this.$refs.input_title.value,
      content: this.$refs.input_2.textContent,
      isTop: this.isTop,
      color: this.selectedColor,
      tags: [
        {id: 1, name: '哈哈哈'}
      ]
    };

    this.$nextTick(()=>{
      this.reset()
    })
  }

  archive() {
    this.submit();
    this.$toast(ArchiveTip, {
      //@ts-ignore
      position: 'bottom-left'
    });
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



}
</script>
<style scoped lang='scss'>
@import "../assets/scss/var";

.container-box__right_input {
  width: 500px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  transform: translateX(-120px);
  border-radius: 10px;
  box-shadow: 0 0 6px rgba($defaultFontColor, .4);
  transition: background-color .2s ease;

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

    .input_box__fun {
      display: flex;
      margin: 10px;
      align-items: center;
      justify-content: space-between;

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
<template>
  <div :class="[show===true?'container-box__left show ':'container-box__left ' ]+className" ref="slideGroup">
    <div :class="[select==='notes'?'icon_box selected':'icon_box']"  @click="routeTo('notes');select='notes'">
      <eva-icon name="calendar-outline" class="icons  container-box__left___calendar"></eva-icon>
      <span>记事</span>
    </div>
    <div :class="[select==='tags'?'icon_box selected':'icon_box']" @click="routeTo('tags');select='tags'">
      <eva-icon name="attach-outline" class="icons container-box__left___attach"></eva-icon>
      <span>标签</span>
    </div>
    <div :class="[select==='archive'?'icon_box selected':'icon_box']" @click="routeTo('archive');select='archive'">
      <eva-icon name="hard-drive-outline" class="icons container-box__left___hard"></eva-icon>
      <span>归档</span>
    </div>
    <div :class="[select==='rec'?'icon_box selected':'icon_box']" @click="routeTo('rec');select='rec'">
      <eva-icon name="trash-2-outline" class="icons container-box__left___trash"></eva-icon>
      <span>回收站</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';


@Component
export default class ContainerBoxLeft extends Vue {
  public $refs!: {
    slideGroup: HTMLDivElement;
  };
  @Prop(Boolean) show: boolean = false;
  @Prop(String) className: string | undefined;
  select:string  = 'notes'

  @Watch('$route')
  routeChange(to: any, from: any) {
    let routeLink: string = to.path;
    if (routeLink === '/notes') {
      this.select = 'notes'
    }
  }

  created(){
    let go = this.$route.fullPath.split('/')[1]
    this.routeTo(go)
    this.select = go
  }

  routeTo(where: string) {
    if(this.$route.fullPath === `/${where}`){
      return
    }else {
      this.$router.push({path: `/${where}`});
    }
    this.select = where
    localStorage.setItem('select',where)
  }

}
</script>
<style scoped lang='scss'>
@import "../../assets/scss/var";

.show {
  width: 200px;
  box-shadow: 0 7px 4px rgba(#000, .4);
  background-color: #fff;

  .selected {
    background-color: $info !important;
  }

  .icon_box {
    width: 220px !important;

    > span {
      opacity: 1 !important;
      color: $defaultFontColor !important;
    }
  }
}

.container-box__left {

  overflow: hidden;
  display: flex;
  height: 100%;
  flex-direction: column;
  transition: all .2s ease .1s;
  padding-top: 10px;
  //position: absolute;
  .selected {

    &:hover {
      background-color: $info !important;
    }

    > span {
      color: #fff !important;
    }

    > .icons {
      fill: #fff !important;
      background-color: $info !important;
    }
  }

  .icon_box {
    //margin: 0 10px;
    cursor: pointer;
    display: flex;
    width: 60px;
    height: 50px;
    flex-direction: row;
    align-items: center;
    border-radius: 30px;
    transition: all .25s ease .05s;
    background-color: transparent;

    > span {
      min-width: 50px;
      margin-left: 20px;
      opacity: 0;
      transition: all .25s ease .1s;
    }

    &:hover {
      background-color: rgba(#efefef, .8);
      width: 220px;

      > span {
        opacity: 1;
        color: $defaultFontColor;
      }

      > .icons {
        background-color: rgba(#efefef, .8);
      }
    }

    .icons {
      min-width: 46px;
      height: 46px;
      line-height: 56px;
      margin-left: 12px;
      border-radius: 50%;
      transition: all .2s ease .05s;

    }

    .container-box__left___calendar {

    }
  }
}

</style>
<template>
  <div id="home">
    <nav>
      <div class="icons_box">
        <eva-icon name="menu-outline" fill="#000" class="btn_open_slide icons"></eva-icon>
        <span>AliveNote</span>
      </div>
      <label class="search-input">
        <eva-icon name="search-outline" fill="#000" class="search_icon icons"></eva-icon>
        <input type="text" class="search" placeholder="搜索"/>
        <eva-icon name="close-outline" fill="#000" class="search-input__close icons"></eva-icon>
      </label>
      <div class="nav-right">
        <eva-icon name="refresh-outline" fill="#000" class="nav__refresh nav-right__common icons"></eva-icon>
        <!--        <div class="re_fresh"></div>-->
        <eva-icon name="layers-outline" fill="000" class="nav__myapp nav-right__common icons"></eva-icon>
        <!--        <div class="my_app"></div>-->
        <div class="avatar"></div>
      </div>
    </nav>
    <div class="container-box">
      <div class="container-box__left " style="width: 240px">
        <div class="icon_box selected">
          <eva-icon name="calendar-outline" class="icons  container-box__left___calendar"></eva-icon>
          <span>记事</span>
        </div>
        <div class="icon_box">
          <eva-icon name="attach-outline" class="icons container-box__left___attach"></eva-icon>
          <span>标签</span>
        </div>
        <div class="icon_box">
          <eva-icon name="hard-drive-outline" class="icons container-box__left___hard"></eva-icon>
          <span>归档</span>
        </div>
        <div class="icon_box">
          <eva-icon name="trash-2-outline" class="icons container-box__left___trash"></eva-icon>
          <span>回收站</span>
        </div>
      </div>
      <div class="container-box__right">
        <div class="container-box__right_input">
          <label v-show="false">
            <input type="text" class="input_3" placeholder="标题">
          </label>
          <div class="input_box">
            <label for="one">
              <input type="text" id="one" class="input_1" placeholder="标题">
            </label>
            <div class="to_top">
              <eva-icon name="toggle-left-outline" class="icons  "></eva-icon>
              <eva-icon name="toggle-right" class="icons  "></eva-icon>
            </div>
            <label for="two">
              <input type="text" id="two" class="input_2" placeholder="添加记事">
            </label>
            <div class="input_box__fun">
              <div>
                <eva-icon name="color-palette-outline" class="icons " ></eva-icon>
                <eva-icon name="archive-outline" class="icons"></eva-icon>
                <eva-icon name="bookmark-outline" class="icons"></eva-icon>
              </div>
              <button>关闭</button>
            </div>
          </div>


        </div>


      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/home.scss";
</style>

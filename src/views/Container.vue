<template>
  <div id='Container_app' :key="keyNum">
    <div id="login_app">
      <transition name="slide" >
        <router-view ></router-view>
      </transition>
    </div>
  </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Container extends Vue {
  @Prop(Number) keyNum: number|undefined

}
</script>
<style scoped lang='scss'>
@import "../assets/scss/var";

.slide-enter-active,
.slide-leave-active {
  transition: all .25s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}

#login_app {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  &:after{
    transform: scale(1.2);
    position: absolute;
    content: '';
    display: block;
    background-image: url('../assets/images/science.png');
    background-position:10px 0;
    filter:blur(1px);
    height: 100%;
    width: 100%;
    z-index: -1;
    animation: bgc_move 10s linear infinite alternate;
  }
  
  @keyframes bgc_move {
    0%{
      background-position:10px 0;
    }
    30%{
      background-position: 10px 0;
    }
    70%{
      background-position: -10px 0;
    }
    100%{
      background-position: -10px 0;
    }
  }


}


</style>
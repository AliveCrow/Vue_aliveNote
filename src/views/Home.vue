<template>
  <div id="home">
    <Nav @toggle-slide="toggleSlide"
         @getUser="getUser"
    />
    <div id='ContainerBox_app'>
      <router-view  />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Provide, Vue, Watch} from 'vue-property-decorator';
import ContainerBoxLeft from '@/components/Home/ContainerBoxLeft.vue';
import {user} from '@/typs';
import Nav from '@/components/Nav.vue';

@Component({
  components: {Nav, ContainerBoxLeft}
})
export default class Home extends Vue {
  user: user = {
    id: 0,
    username: '',
    nickname: '',
    avatar: '',
    email: ''
  };
  // todo 刷新当前组件
  slideShow: boolean = false;
  routeId!:number;


  toggleSlide() {
    this.slideShow = !this.slideShow;
  }

  getUser(userData: user) {
    this.user = userData;
  }




}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/var";

#home {
  display: flex;
  flex-direction: column;
  width: 100%;

  #ContainerBox_app {
    width: 100%;
    padding-left: 80px;

  }
}
</style>

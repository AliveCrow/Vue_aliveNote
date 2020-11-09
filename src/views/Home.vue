<template>
  <div id="home">
    <Nav @toggle-slide="toggleSlide"
         @getUser="getUser"
    />
    <div id='ContainerBox_app'>
      <router-view   />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Provide, Vue} from 'vue-property-decorator';
import ContainerBoxLeft from '@/components/Home/ContainerBoxLeft.vue';
import {user} from '@/typs';
import Nav from '@/components/Nav.vue';

@Component({
  components: {Nav, ContainerBoxLeft}
})
export default class Home extends Vue {
  user:user = {
    id:0,
    username:'',
    nickname:'',
    avatar:'',
    email:''
  }
  slideShow:boolean = false;
  toggleSlide(){
    this.slideShow = !this.slideShow
  }
  getUser(userData:user){
    this.user = userData
  }

}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/var";
#home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  #ContainerBox_app{
    height: 100%;
    width: 100%;
    padding-left: 80px;
  }
}
</style>

<template>
  <div id="home">
    <Nav @toggle-slide="toggleSlide" @getUser="getUser" @showCard="showCard" />
    <Card  className="userInfo_card" :isShow="cardShow">
      <template v-slot:title >
        <img :src="user.avatar" alt="" class="header_avatar">
      </template>
      <template v-slot:content >
        <p class="userInfo_card__nickname userInfo_card_manage">{{ user.nickname }}</p>
        <p class="userInfo_card__username userInfo_card_manage">{{user.username}}</p>
        <button class="userInfo_card_manage userInfo_card_manage__btn g_border">管理账号信息</button>
        <div class="userInfo_card_manage not_complete">
          暂未开放
        </div>
        <button class="userInfo_card_manage  g_border exit" >退出</button>
      </template>
    </Card>
    <div id='ContainerBox_app'>
      <ContainerBoxLeft :show="slideShow" />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Provide, Vue} from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';
import ContainerBox from '@/components/Home/ContainerBox.vue';
import ContainerBoxLeft from '@/components/Home/ContainerBoxLeft.vue';
import ContainerBoxRight from '@/components/Home/ContainerBoxRight.vue';
import {Action, State} from 'vuex-class';
import Card from '@/components/Card.vue';
@Component({
  components: {Card, ContainerBoxRight, ContainerBoxLeft, ContainerBox, Nav}
})
export default class Home extends Vue {
  user:user = {
    number:0,
    username:'',
    nickname:'',
    avatar:'',
    email:''
  }
  cardShow:boolean= false;
  slideShow:boolean = false;
  toggleSlide(e){
    this.slideShow = !this.slideShow
  }
  getUser(userData:user){
    this.user = userData
  }
  showCard(e){
    this.cardShow = !this.cardShow
  }
  created(){

  }

}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/var";
#home {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3px rgba(0, 0, 0, .3);
  height: 100vh;
  .userInfo_card{
    >span{
      font-size: 2rem;
      color:red;
    }

  }
  #ContainerBox_app{
    height: 100%;
    display: flex;
  }
  .header_avatar{
    height: 80px;
    width: 80px;
    margin: 15px;
    border-radius: 50%;
  }
  .userInfo_card_manage{
    margin: 10px;
  }
  .userInfo_card__nickname{
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0;
  }
  .userInfo_card__username{
    margin: 0;
    color: rgba($defaultFontColor,.5);
  }
  .userInfo_card_manage__btn{
    margin: 20px;
    height: 40px;
    width: 200px;
    border-radius: 50px;
    background-color: #fff;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    &:hover{
      background-color: rgba($defaultBorderColor,.1);
    }
  }
  .not_complete{
    width: 100%;
    height: 50px;
    margin: 0;
    line-height: 50px;
    border-top: $defaultBorderColor 1px solid ;
    border-bottom: $defaultBorderColor 1px solid ;
    cursor: pointer;
    &:hover{
      background-color: rgba($defaultBorderColor,.1);
    }
  }
  .exit{
    margin: 30px;
    height: 40px;
    width: 80px;
    border-radius: 5px;
    background-color: #fff;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    &:hover{
      background-color: rgba($error,.7);
      color: #fff;
    }
  }
}
</style>

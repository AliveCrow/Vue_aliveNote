<template>
  <div id='Nav_app'>
    <div class="icons_box"  >
      <div v-on-clickaway="closeSlide">
        <eva-icon name="menu-outline"
                  fill="#000"
                  class="btn_open_slide icons"
                  @click="slideShow = !slideShow"
        ></eva-icon>
        <ContainerBoxLeft :show="slideShow" className="ContainerBoxLeft"  />
      </div>
      <span>{{ user.nickname }}</span>
    </div>

    <div class="search-input">
      <div class="search_icon icons" >
        <eva-icon name="search-outline" fill="#000" class=" icon" v-show="isShow"></eva-icon>
      </div>
      <label >
        <input type="text" class="search" placeholder="搜索" v-model="keyword" @input="input" @click="pushSearch" />
      </label>
      <div class="search-input__close icons"  @click.stop="outSearch">
        <eva-icon name="close-outline" fill="#000" class=" icon"   v-show="isShow"></eva-icon>
      </div>
    </div>
    <div class="nav-right">
      <eva-icon name="refresh-outline" fill="#000" class="nav__refresh nav-right__common icons" @click="refresh"></eva-icon>
      <!--        <div class="re_fresh"></div>-->
      <eva-icon name="layers-outline" fill="000" class="nav__myapp nav-right__common icons" style="cursor:not-allowed;"></eva-icon>
      <!--        <div class="my_app"></div>-->
      <div class="avatar" v-on-clickaway="closeCard" @click="cardShow = !cardShow" >
          <img :src="user.avatar" alt="头像"  class="nav_avatar"  height="45px" >
        <Card  className="userInfo_card" :isShow="cardShow" animationName="fade" >
          <template v-slot:title >
            <img :src="user.avatar" alt="" class="header_avatar">
          </template>
          <template v-slot:content >
            <p class="userInfo_card__nickname userInfo_card_manage">{{ user.nickname }}</p>
            <p class="userInfo_card__username userInfo_card_manage">{{user.username}}</p>
            <button class="userInfo_card_manage userInfo_card_manage__btn g_border" @click="getUser">管理账号信息</button>
            <div class="userInfo_card_manage not_complete">
              暂未开放
            </div>
            <button class="userInfo_card_manage  g_border exit"  @click="exit">退出</button>
          </template>
        </Card>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {Component, Emit, Inject, PropSync, Provide, ProvideReactive, Vue, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import Card from '@/components/Card.vue';
import {NoteDataType, user} from '@/typs';
import ContainerBoxLeft from '@/components/Home/ContainerBoxLeft.vue';
import Waterfalls from '@/components/Waterfalls.vue';
@Component({
  components: {Waterfalls, ContainerBoxLeft, Card}
})
export default class Nav extends Vue {
  user: user = {
    id: 0,
    username: '',
    nickname: '',
    avatar: '',
    email: ''
  };
  isShow: boolean = false;
  cardShow:boolean= false;
  slideShow:boolean = false;

  @State('userInfo', {namespace: 'userInfo'}) userInfo!:user;


  // @PropSync('keyword',{type:String}) asyncKeyWord!:string
  @Emit('getUser')
  getUser() {
    return this.user;
  }

  keyword:string = ''
  input(){
    this.$EventBus.$emit('input',this.keyword)
  }


  created() {
    this.axios.get('/users').then(res => {
      this.$nextTick(() => {
        this.user = {
          id: res.data.userInfo.id,
          username: res.data.userInfo.username,
          nickname: res.data.userInfo.nickname,
          avatar: res.data.userInfo.avatar+`?${Math.random()*314}`,
          email: res.data.userInfo.email
        };
      });
    }).catch(error=>{
      console.log(error);
    });
  }

  closeSlide(){
    this.slideShow = false
  }
  closeCard(){
    this.cardShow = false
  }

  refresh(){
    this.$router.push('/transit')
  }
  exit(){
    localStorage.removeItem('jwt_token')
    this.$router.push('login')
  }

  pushSearch(){
    this.isShow = true
    if(this.$route.fullPath==='/search'){
      return
    }else {
      this.$router.push('/search')
    }
  }
  outSearch(){
    this.isShow = false
    this.$router.push('/notes')
    this.keyword = ''
  }





}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";

#Nav_app {
  img{
    object-fit: cover;
  }

  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $defaultBorderColor;
  .icons_box {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .ContainerBoxLeft{
      position: absolute;
      bottom: -63px;
      z-index: 20;
    }
    .icons {
      height: 50px;
      width: 50px;
      line-height: 60px;
      margin: 0 10px;
    }

    .btn_open_slide {
      border-radius: 50%;

      &:hover {
        background-color: rgba($defaultFontColor, .1);
      }

    }
  }

  .search-input {
    margin: 0 10px;
    position: relative;

    > .icons {
      height: 35px;
      padding: 5px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;

      &:hover {
        background-color: rgba($defaultFontColor, .1);
      }
    }

    .search_icon {
      margin-left: 10px;
      left: 0;
    }

    .search-input__close {
      margin-right: 10px;
      right: 0;
    }

    .search {
      font-size: 1.2rem;
      height: 50px;
      padding-left: 50px;
      border: none;
      outline: none;
      background-color: $searchBgcColor;
      width: 500px;
      border-radius: 6px;
      transition: all .1s linear;

      &:focus {
        background-color: #fff;
        box-shadow: 0 0 4px rgba($defaultFontColor, .6);
      }

    }
  }

  .nav-right {
    margin-right: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;

    > .icons {
      transform: scale(1.1);
      margin-right: 20px;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      line-height: 50px;

      &:hover {
        background-color: rgba($defaultFontColor, .1);
      }

    }

    .nav-right__common {
      position: relative;

      &:hover {
        &:before {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: .1rem;
          width: 30px;
          border-radius: 3px;
          padding: 3px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          background-color: rgba($defaultFontColor, .8);
        }
      }
    }


    .nav__refresh {
      &:hover {
        &:before {
          content: '刷新';
        }
      }
    }

    .nav__myapp {
      &:hover {
        &:before {
          content: '应用';
        }
      }
    }

    .avatar {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      overflow: hidden;
      .nav_avatar{
        width: 45px;
        object-fit: cover;
      }
    }

    .userInfo_card{
      >span{
        font-size: 2rem;
      }

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
}

</style>
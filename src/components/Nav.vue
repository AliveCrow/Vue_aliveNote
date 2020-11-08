<template>
  <div id='Nav_app'>
    <div class="icons_box">
      <eva-icon name="menu-outline"
                fill="#000"
                class="btn_open_slide icons"
                @click="toggleSlide"
      ></eva-icon>
      <span>{{ user.nickname }}</span>
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
      <div class="avatar" @click="showCard(isSHow)">
        <img :src="user.avatar" alt="" height="100%">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Inject, Provide, Vue, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';

@Component
export default class Nav extends Vue {
  user: user = {
    number: 0,
    username: '',
    nickname: '',
    avatar: '',
    email: ''
  };
  isSHow: boolean = false;
  @State('userInfo', {namespace: 'userInfo'}) userInfo;

  @Emit()
  toggleSlide() {
    return false;
  }

  @Emit('getUser')
  getUser(userData: user) {
    return userData;
  }

  @Emit('showCard')
  showCard(showCard: boolean) {
    if (showCard) {
      return showCard=false;
    } else {
      return showCard = true;
    }
  }

  created() {
    this.axios.get('/users').then(res => {
      this.$nextTick(() => {
        this.user = {
          number: res.data.userInfo.id,
          username: res.data.userInfo.username,
          nickname: res.data.userInfo.nickname,
          avatar: res.data.userInfo.avatar,
          email: res.data.userInfo.email
        };
        this.getUser(this.user);
      });
    });


    // this.$nextTick(()=>{
    //   if(userId){
    //
    //   }else {
    //     this.$toast.error('用户信息消失,请重新登录')
    //     setTimeout(()=>this.$router.push('/login'),2500)
    //   }
    // })
  }

  setUserInfo() {

  }


}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";

#Nav_app {
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .icons_box {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

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
      background-color: $info;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}

</style>
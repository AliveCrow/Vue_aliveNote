<template>
<div id="home">
  <Nav @toggle-slide="slideShow = !slideShow;" @getUser="getUser" :keyword.sync="keyword" />
  <div id="ContainerBox_app">
    <router-view />
  </div>

  <sweet-modal ref="userInfo" @click="previewAvatar = user.avatar">
    <template v-slot:title> 账号信息管理 </template>
    <section class="content">
      <div class="set-img">
        <form>
          <img :src="previewAvatar" alt="加载失败" height="150px" class="" />
          <label class="g_border">
            <input type="file" style="width: 100%" accept=".jpg, .jpeg, .png" ref="uploadImg" @change="handleFiles" />
          </label>
        </form>
      </div>
      <div class="content_input">
        <label>
          <span>登录账户:</span>
          <input type="text" disabled class="input_disable" v-model="user.username" />
        </label>
        <label>
          <span>昵称:</span>
          <input type="text" v-model="user.nickname" />
        </label>
        <label>
          <span>邮箱:</span>
          <input type="email" v-model="user.email" placeholder="邮箱是找回密码的唯一途径" />
        </label>
      </div>
    </section>
    <template slot="button">
      <button class="editButton" @click="submit">确认</button>
    </template>
  </sweet-modal>
  <sweet-modal ref="submited" icon="success"> </sweet-modal>
</div>
</template>

<script lang="ts">
import {
  Component,
  Inject,
  Provide,
  ProvideReactive,
  Vue,
  Watch,
} from "vue-property-decorator";
import ContainerBoxLeft from "@/components/Home/ContainerBoxLeft.vue";
import {
  NoteDataType,
  user
} from "@/typs";
import Nav from "@/components/Nav.vue";
import {
  mapGetters
} from "vuex";

@Component({
  components: {
    Nav,
    ContainerBoxLeft,
  },
})
export default class Home extends Vue {

  user: user = {
    id: 0,
    username: "",
    nickname: "",
    avatar: "",
    email: "",
  };
  // todo 刷新当前组件
  slideShow: boolean = false;
  routeId!: number;
  formData: any | undefined;
  previewAvatar: string = "";

  @ProvideReactive() keyword: string = "";

  //获取用户信息
  getUser(userData: user) {
    this.user = userData;
    this.previewAvatar = this.user.avatar;
    this.$refs.userInfo.open();
  }

  //上传图片
  handleFiles() {
    let uploadFile = this.$refs.uploadImg.files[0];
    //图片不能过大
    let number = uploadFile.size;
    if (number > 1048576 * 3) {
      this.$toast.error("图片大小不能超过3MB");
      return;
    }
    this.previewAvatar = URL.createObjectURL(uploadFile); //缩略图
    this.formData = new FormData();
    this.formData.append("img", uploadFile);
  }
  submit() {
    this.axios
      .post("/avatarUpload", this.formData)
      .then((res) => {
        if (res.data.statusCode === 0) {
          this.user.avatar =
            "http://qiniu.dreamsakula.top/" +
            res.data.respBody.key +
            `?${Math.random() * 314}`;
        }
        this.axios.patch("/users", this.user).then((res) => {
          this.$refs.submited.open();
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  @Watch("$route")
  routeChange(to: any, from: any) {
    this.keyword = "";
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

  .content {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;

    .set-img {
      width: 150px;

      img {
        width: 150px;
        object-fit: cover;
      }

      >label {
        width: 100%;
      }

      >div {
        display: inline-block;
        color: $defaultFontColor;
        border: 1px solid $defaultBorderColor;
        outline: none;
        padding: 5px 10px;
        font-size: 0.5rem;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s linear 0.02s;

        &:hover {
          background-color: rgba($defaultBorderColor, 0.2);
        }
      }
    }

    .content_input {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;

      span {
        display: inline-block;
        width: 80px;
      }

      .input_disable {
        border: 2px solid rgba($defaultBorderColor, 1);
        color: rgba(#000, 0.6);
        background-color: #fff;
        cursor: not-allowed;
      }

      input {
        width: 300px;
        height: 35px;
        margin: 5px;
        border: 2px solid $defaultFontColor;
        border-radius: 5px;
        outline: none;
        padding: 0 10px;
        transition: all 0.2s linear 0.02s;

        &:focus {
          border: 2px solid $inputBorderColor;
          box-shadow: 0 0 4px rgba($inputBorderColor, 0.6);
        }
      }
    }
  }

  @keyframes avatar-move {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-20px);
    }
  }

  .editButton {
    height: 35px;
    width: 100px;
    background-color: $info;
    color: #fff;
    border: none;
    outline: none;
    font-size: 1rem;
  }
}
</style>

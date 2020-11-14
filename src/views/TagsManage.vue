<template>
  <div id='TagsManage_app'>
    <div class="add_tag">
      <label>
        <input type="text" v-model="tagName" class="add_tag_name">
      </label>
      <button @click="addTag">添加</button>
    </div>
    <transition-group name="fade" class="tag_box" tag="div">
      <div class="tag" v-for="tag in tagsList" :key="tag.id" @click="editTag(tag.id)">
        <span>{{ tag.name }}</span>
      </div>
    </transition-group>
    <sweet-modal ref="modal" :icon="iconType">
      {{ content }}
    </sweet-modal>
    <sweet-modal hide-close-button ref="tag" @close="saveEdit">
      <template v-slot:title>
        编辑标签
      </template>
        <template v-slot:default>
          <label>
            <input class="tag_name"  ref="input" v-model="tagData.name"  />
          </label>
          <!--        </input>-->
        </template>
      <template slot="button">
        <button class="editButton" @click="deleteTag">删除标签</button>
      </template>
    </sweet-modal>
    <sweet-modal ref="nestedChild"  icon="success">
      删除成功
    </sweet-modal>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class TagsManage extends Vue {
  tagsList: [] = [];
  tagData: {id:number|undefined} = {id:undefined};
  tagName: string = '';
  iconType: String = '';
  content: string = '';

  init() {
    this.axios.get('/tags').then(res => {
      this.tagsList = res.data.res;
    }).catch(error => {
      this.$toast.error(error.msg);
    });
  }
  created() {
    this.init();
  }
  mounted() {
    console.log(this.$refs.tag.$el.firstChild.classList.add('not_scroll'));
  }
  addTag() {
    if (this.tagName === '') {
      this.iconType = 'error';
      this.content = '不能添加空标签';
      this.$refs.modal.open();
    } else {
      this.axios.post('/tags', {name: this.tagName}).then(res => {
        if (res.data.stateCode === 0) {
          this.iconType = 'success';
          this.content = '添加成功';
          this.tagName = '';
          this.init();
        } else {
          this.iconType = 'error';
          this.content = '已经有此标签,请勿重复添加';
          this.tagName = '';
        }
        this.$refs.modal.open();
      }).catch(error => {
        this.$toast.error(error.msg);
      });
    }
  }

  editTag(id: number) {
    this.axios.get(`/tags/${id}`).then(res => {
      this.tagData = res.data.res;
    }).catch(error => {
      this.$toast.error(error.res);
    });
    this.$refs.tag.open();
  }

  saveEdit(){
      this.axios.patch(`/tags/${this.tagData.id}`,{name:(this.$refs.input.value).trim()}).then(res=>{
        let tagIndex = this.tagsList.findIndex(item=>item.id===this.tagData.id)
        this.tagsList[tagIndex].name = res.data.res.name
      }).catch(error=>{
        // console.log(error);
      })
  }

  deleteTag(){
      this.axios.delete(`/tags/${this.tagData.id}`).then(res=>{
        let tagIndex = this.tagsList.findIndex(item=>item.id===this.tagData.id)
        this.tagsList.splice(tagIndex,1)
        this.iconType = 'success';
        this.content = '删除成功';
        this.$refs.tag.close();
        this.$refs.nestedChild.open();
      }).catch(error=>{
        console.log(error);
      })
  }
}
</script>
<style scoped lang='scss'>
@import "src/assets/scss/var";


.fade-item {
  transition: all 100ms linear;
  display: inline-block;
}

.list-complete-leave-active {
  position: absolute;
}

.fade-enter,
.fade-leave-to {
  transform: scale(0);
  opacity: 0;
}


#TagsManage_app {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 20px;

  .add_tag {
    box-shadow: 0 1px .5px rgba(#000, .1);
    height: 60px;
    display: flex;
    align-items: center;

    input, button {
      height: 40px;
      margin: 10px;
    }

    input {
      width: 400px;
      transition: all .1s linear .05s;
      padding: 0 8px;
      border: 1px solid $defaultBorderColor;
      outline: none;
      border-radius: 3px;

      &:focus {
        box-shadow: 0 0 4px rgba(#000, .2);
        background-color: #fff;
      }
    }

    button {
      line-height: 15px;
      padding: 5px 25px;
      outline: none;
      border: none;
      background-color: $searchBgcColor;
      transition: all .15s linear .05s;

      &:hover {
        background-color: $success;
        color: #fff
      }
    }
  }

  .tag_box {
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;

    .tag {
      margin: 10px 15px;
      border: 1px solid rgba($defaultBorderColor, 1);
      border-radius: 20px;
      cursor: pointer;
      transition: all .25s ease, .5s;
      padding: 8px 20px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .icons {
        line-height: 9px;
        transition: all .1s ease, .5s;
      }

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 8px rgba($info, .7);
        background-color: rgba($info, 1);
        color: #fff;

        .icons {
          fill: #fff;
          display: block;

          &:hover {
            fill: $error;
            transform: scale(1.2) rotate(180deg);
          }
        }
      }
    }
  }

  .add_tag_name{
    font-size: 1rem;
  }

  .tag_name {
    text-align: center;
    display: inline-block;
    font-size: 1.5rem;
    border: 1px solid $defaultBorderColor;
    height: 100%;
    border-radius: 5px;
    outline: none;
    padding: 5px 20px;
  }

  .editButton {
    height: 35px;
    width: 100px;
    background-color: $error;
    color: #fff;
    border: none;
    outline: none;
    font-size: 1rem;
  }
}
</style>
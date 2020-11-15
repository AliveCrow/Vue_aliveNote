<template>
  <div id='NotFound_app'>
    <div>
      <img src="http://qiniu.dreamsakula.top/images/20201115201736.png" alt="">
    </div>
    <p style="font-size: 1.5rem">
      找不到页面了
    </p>
    <router-link to="/notes" style="color: rgb(30	,160	,255	)">尝试返回主页</router-link>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {

}
</script>
<style scoped lang='scss'>

</style>
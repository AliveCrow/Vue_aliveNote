
<template>
  <waterfall :line-gap="200" line="h" :watch="items">
    <!-- each component is wrapped by a waterfall slot -->
    <waterfall-slot
        v-for="(item, index) in items"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="item.id"
        style="background-color:red;"
    >
<!--      <div style="background-color:red;">-->
        {{item.name}}
<!--      </div>-->
      <!--
        your component
      -->
    </waterfall-slot>
  </waterfall>
</template>

<script>
export default {
  data(){
    return {
      items:[
        {width:2310,height:230,name:1},
        {width:20,height:210,name:2},
        {width:20,height:210,name:3},
        {width:20,height:20,name:4},
        {width:20,height:20,name:5},
        {width:220,height:210,name:6},
        {width:20,height:230,name:7},
        {width:20,height:210,name:8},
        {width:20,height:210,name:13},
        {width:20,height:210,name:13},
        {width:20,height:210,name:13}
      ]
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import "assets/scss/var";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body,
html {
  position: relative;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $defaultBorderColor;
    border-radius: 3px;
    &:hover {
      background-color: $info;
    }
  }
}

li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #202124;
}
.item-move {
  /* applied to the element when moving */
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
#app {
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
    "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #202124;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.g_border {
  border: 1px solid rgb(209, 212, 216);
}

.g_font_weight {
  font-weight: 500;
}

.g_error {
  color: $error;
  border-color: $error;
}

.g_success {
  color: $success;
  border-color: $success;
}

.tip {
  font-size: 0.6rem;
  text-align: left;
  width: 100%;
  display: inline-block;
}
.sweet-modal.is-visible {
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>

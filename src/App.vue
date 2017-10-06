<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
  html, body {
    height: 100%;
    overflow: hidden;
  }

  #app {
    height: 100%;
    position: relative;
  }

  .main-content {
    position: absolute;
    top: 64px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background-color: white;
  }

  .md-tabs.hide-tab-content .md-tabs-content {
    display: none;
  }

  .text-receber {
    color: #43A047;
  }

  .text-pagar {
    color: #F4511E;
  }
</style>

<template>
  <div class="c-spacer" :style="{ height: (size || 10) + 'px' }"></div>
</template>

<script>
export default {
  props: ['size']
}
</script>

<style>
  .c-spacer {
    display: block;
    width: 100%;
  }
</style>

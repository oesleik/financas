<template>
  <div class="c-resumo-total">
    <span class="c-resumo-total__valor">
      <slot></slot>
    </span>
    {{ label }}
  </div>
</template>

<script>
export default {
  props: ['label']
}
</script>

<style>
  .c-resumo-total {
    flex-grow: 1;
    text-align: center;
    border-left: 1px solid #ccc;
    margin: 10px 5px 5px;
    padding: 2px 0;
  }

  .c-resumo-total:first-child {
    border-left: none;
  }

  .c-resumo-total__valor {
    display: block;
    font-size: 1.3em;
    line-height: 1.3em;
  }
</style>

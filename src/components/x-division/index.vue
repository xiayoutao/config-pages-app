<template>
<div class="x-division division" :style="{ height }"></div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'x-division',
  props: {
    data: Object,
  },
  setup (props) {
    const height = computed(() => `${props.data.height >= 10 ? props.data.height : 10}px`);

    return {
      height,
    }
  }
}
</script>

<style lang="less" scoped>
</style>
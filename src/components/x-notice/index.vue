<template>
<div class="x-notice notice">
  <van-notice-bar left-icon="volume-o" :background="background">
    <span :style="{ color }">{{ message }}</span>
  </van-notice-bar>
</div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'x-notice',
  props: {
    data: Object,
  },
  setup (props) {
    const color = computed(() => props.data.color);
    const background = computed(() => props.data.background);
    const message = computed(() => props.data.message);

    return {
      color,
      background,
      message,
    }
  }
}
</script>

<style lang="less" scoped>
</style>
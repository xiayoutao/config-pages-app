<template>
<div class="x-notice notice">
  <van-notice-bar left-icon="volume-o" :background="dataForm.background">
    <span :style="{color: dataForm.color}">{{ dataForm.message }}</span>
  </van-notice-bar>
</div>
</template>

<script>
import cpsMixin from '@/mixins/component.js';

export default {
  name: 'x-notice',
  mixins: [cpsMixin],
}
</script>

<style lang="less" scoped>
</style>
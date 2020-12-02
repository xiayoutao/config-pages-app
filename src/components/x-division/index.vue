<template>
<div class="x-division division" :style="{height: height}"></div>
</template>

<script>
import cpsMixin from '@/mixins/component.js';

export default {
  name: 'x-division',
  mixins: [cpsMixin],
  computed: {
    height () {
      const height = this.dataForm && this.dataForm.height >= 10 ? this.dataForm.height : 10;
      return height + 'px';
    }
  },
}
</script>

<style lang="less" scoped>
</style>
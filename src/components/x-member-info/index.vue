<template>
<div class="x-member-info member-info"></div>
</template>

<script>
import cpsMixin from '@/mixins/component.js';

export default {
  name: 'x-member-info',
  mixins: [cpsMixin],
  computed: {}
}
</script>

<style lang="less" scoped>
.member-info {
  display: flex;
  align-items: center;
  height: 100px;
  background-color: #ccc;
  font-size: 14px;
}
</style>
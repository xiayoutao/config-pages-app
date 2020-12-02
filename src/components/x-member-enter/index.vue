<template>
<div class="x-member-enter member-enter">
  <i class="van-icon van-icon-shop-o"></i>
  <p class="title">{{ title }}</p>
  <div class="action">
    <span>{{ actionText }}</span>
    <i class="van-icon van-icon-arrow"></i>
  </div>
</div>
</template>

<script>
import cpsMixin from '@/mixins/component.js';

export default {
  name: 'x-member-enter',
  mixins: [cpsMixin],
  computed: {
    title () {
      return this.dataForm.title || '个人中心';
    },
    actionText () {
      return this.dataForm.actionText || null;
    }
  }
}
</script>

<style lang="less" scoped>
.member-enter {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background-color: #fff;
  font-size: 14px;

  .title {
    flex: 1;
    margin: 0;
    padding: 0 10px;
    text-align: left;
    color: #333;
  }

  .action {
    display: flex;
    align-items: center;
    color: #999;
  }
}
</style>
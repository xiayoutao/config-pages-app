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
import { computed } from 'vue';

export default {
  name: 'x-member-enter',
  props: {
    data: Object,
  },
  setup (props) {
    const title = computed(() => props.data.title || '个人中心');
    const actionText = computed(() => props.data.actionText || null);

    return {
      title,
      actionText,
    }
  },
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
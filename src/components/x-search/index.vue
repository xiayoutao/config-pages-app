<template>
<div class="x-search search">
  <div class="search-inner" :style="{ height }">
    <van-search v-model="keywords" :input-align="align" :placeholder="placeholder" />
  </div>
</div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'x-search',
  props: {
    data: Object,
  },
  setup (props) {
    const height = computed(() => props.data.height + 'px');
    const keywords = computed(() => props.data.keywords);
    const align = computed(() => props.data.align);
    const placeholder = computed(() => props.data.placeholder || '请输入搜索关键词');

    return {
      height,
      keywords,
      align,
      placeholder,
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding: 5px 0;
  border-bottom: 1px solid #f3f3f3;
  background-color: #fff;

  &-inner {
    flex: 1;
    display: flex;
  }

  /deep/ .van-search {
    flex: 1;
    border-radius: 10px;
  }
}
</style>
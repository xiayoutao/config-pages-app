<template>
<div class="x-search search">
  <div class="search-inner" :style="{height: dataForm.height + 'px'}">
    <van-search v-model="dataForm.keywords" :input-align="dataForm.align" :placeholder="placeholder" />
  </div>
</div>
</template>

<script>
import cpsMixin from '@/mixins/component.js';

export default {
  name: 'x-search',
  mixins: [cpsMixin],
  computed: {
    placeholder () {
      return this.dataForm.placeholder || '请输入搜索关键词';
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
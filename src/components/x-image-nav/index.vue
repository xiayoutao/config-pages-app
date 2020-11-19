<template>
<div class="x-image-nav image-nav">
  <div class="image-nav-item" v-for="(item, index) in dataList" :key="index">
    <img class="image" :src="item.icon">
    <span class="title">{{ item.label }}</span>
  </div>
</div>
</template>

<script>
import { computed } from 'vue';
import defaultImage from '@/assets/images/default-image.png';

export default {
  name: 'x-image-nav',
  props: {
    data: Object,
  },
  setup (props) {
    const dataList = computed(() => {
      if (props.data instanceof Object) {
        return [ ...(props.data.nav || []) ];
      }
      return [];
    });

    return {
      defaultImage,
      dataList,
    }
  },
}
</script>

<style lang="less" scoped>
.image-nav {
  display: flex;
  background-color: #fff;

  &-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;

    >.image {
      display: block;
      width: 30px;
      height: 30px;
      margin-bottom: 10px;
    }

    >.title {
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
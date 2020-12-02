<template>
<div class="x-image-nav image-nav">
  <div class="image-nav-item" v-for="(item, index) in dataList" :key="index">
    <img class="image" :src="item.icon">
    <span class="title">{{ item.label }}</span>
  </div>
</div>
</template>

<script>
import cpsMixin from '@/mixins/component.js';
import defaultImage from '@/images/default-image.png';

export default {
  name: 'x-image-nav',
  mixins: [cpsMixin],
  data () {
    return {
      defaultImage,
    }
  },
  computed: {
    dataList () {
      return [
        { icon: defaultImage, label: '导航一' },
        { icon: defaultImage, label: '导航二' },
        { icon: defaultImage, label: '导航三' },
        { icon: defaultImage, label: '导航四' },
      ]
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
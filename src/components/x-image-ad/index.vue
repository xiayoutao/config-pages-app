<template>
<div class="x-image-ad image-ad">
  <van-swipe class="image-ad-swipe" :autoplay="3000" indicator-color="white" v-if="dataList.length > 0">
    <van-swipe-item v-for="(item, index) in dataList" :key="index">
      <img class="image-ad-item" :src="item.image">
    </van-swipe-item>
  </van-swipe>
  <img class="image-ad-item" :src="defaultAdImage" v-else>
</div>
</template>

<script>
import cpsMixin from '@/mixins/component.js';
import defaultAdImage from '@/images/default-ad.png';

export default {
  name: 'x-image-ad',
  mixins: [cpsMixin],
  data () {
    return {
      defaultAdImage,
    }
  },
}
</script>

<style lang="less" scoped>
.image-ad {
  &-item {
    display: block;
    width: 100%;
    height: 200px;
    background-color: #fff;
  }
}
</style>
<template>
<div class="x-video video">
  <video controls controlslist webkit-playsinline x5-playsinline playsinline :poster="dataForm.poster" :src="dataForm.url">
    当前浏览器不支持最新的video播放
  </video>
</div>
</template>

<script>
import cpsMixin from '@/mixins/component.js';

export default {
  name: 'x-video',
  mixins: [cpsMixin],
}
</script>

<style lang="less" scoped>
.video {
  position: relative;
  display: flex;
  align-items: center;
  height: 210px;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
}
</style>
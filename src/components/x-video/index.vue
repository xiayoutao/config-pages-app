<template>
<div class="x-video video">
  <video controls controlslist webkit-playsinline x5-playsinline playsinline :poster="poster" :src="url">
    当前浏览器不支持最新的video播放
  </video>
</div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'x-video',
  props: {
    data: Object,
  },
  setup(props) {
    const poster = computed(() => props.data.poster);
    const url = computed(() => props.data.url);

    return {
      poster,
      url,
    }
  }
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
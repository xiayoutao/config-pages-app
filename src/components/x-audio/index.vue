<template>
<div class="x-audio audio">
  <div :id="domID" v-if="type === 0"></div>
  <audio controls :loop="loop" :src="url" v-else></audio>
</div>
</template>

<script>
import { ref, computed, watchEffect, nextTick } from 'vue';
import WxAudio from '@dw/wx-audio';

export default {
  name: 'x-audio',
  props: {
    data: Object,
  },
  setup (props) {
    const domID = ref('audioPlayer_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000));
    const type = computed(() => props.data.type);
    const title = computed(() => props.data.title);
    const url = computed(() => props.data.url);
    const loop = computed(() => props.data.loop);
    
    watchEffect(() => {
      if (type.value === 0) {
        initPlayer();
      }
    });

    async function initPlayer () {
      await nextTick();
      let wxAudio = new WxAudio({
        ele: '#' + domID.value,
        title: title.value,
        disc: '',
        src: url.value,
        width: '100%',
        loop: !!loop.value,
        ended () {
          console.log('结束播放');
        }
      });
      wxAudio.audioPlay();
    }

    return {
      domID,
      type,
      title,
      url,
      loop,
    }
  },
}
</script>

<style lang="less" scoped>
.audio {
  padding: 15px;

  audio {
    width: 100%;
  }
}
</style>
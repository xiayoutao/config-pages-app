<template>
<div class="x-audio audio">
  <div :id="audioPlayerDomID" v-if="dataForm.type === 0"></div>
  <audio controls :loop="dataForm.loop" :src="dataForm.url" v-else-if="dataForm.type === 1"></audio>
</div>
</template>

<script>
import WxAudio from '@dw/wx-audio';
import cpsMixin from '@/mixins/component.js';

export default {
  name: 'x-audio',
  mixins: [cpsMixin],
  data () {
    return {
      audioPlayerDomID: 'audioPlayer_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000),
      wxAudio: null
    }
  },
  methods: {
    initPlayer () {
      var _this = this;
      this.visible = true;
      this.wxAudio = null;
      this.$nextTick(() => {
        this.wxAudio = new WxAudio({
          ele: '#' + this.audioPlayerDomID,
          title: this.dataForm.title,
          disc: '',
          src: this.dataForm.url,
          width: '100%',
          loop: !!this.dataForm.loop,
          ended () {
            console.log('结束播放');
          }
        });
        this.wxAudio.audioPlay();
      });
    }
  },
  watch: {
    dataForm: {
      handler (val) {
        if (val.type === 0) {
          this.initPlayer();
        }
      },
      immediate: true,
      deep: true,
    }
  }
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
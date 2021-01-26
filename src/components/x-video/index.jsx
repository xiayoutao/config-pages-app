import { computed } from 'vue';
import './index.less';

export default {
  name: 'x-video',
  props: {
    data: Object,
  },
  setup(props) {
    const poster = computed(() => props.data.poster);
    const url = computed(() => props.data.url);

    return () => {
      return (
        <div class="x-video video">
          <video controls controlslist webkit-playsinline x5-playsinline playsinline poster={ poster.value } src={ url.value }>
            当前浏览器不支持最新的video播放
          </video>
        </div>
      )
    }
  }
}
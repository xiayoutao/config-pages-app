import { computed } from 'vue';
import './index.less';

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

    return () => {
      return (
        <div class="x-search search">
          <div class="search-inner" style={{ height: height.value }}>
            <van-search v-model={keywords.value} input-align={align.value} placeholder={placeholder.value} />
          </div>
        </div>
      )
    }
  }
}
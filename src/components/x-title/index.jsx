import { computed } from 'vue';
import './index.less';

export default {
  name: 'x-title',
  props: {
    data: Object,
  },
  setup (props) {
    const linkType = computed(() => props.data.linkType || 0);
    const title = computed(() => props.data.title);
    const desc = computed(() => props.data.desc);

    return () => {
      return (
        <div class="x-title title">
          <div class="title-title">
            <div class="label">{ title.value }</div>
            {
              [1, 2, 3].indexOf(linkType.value) >= 0 ?
              <div class="more" class={linkType.value, {'is-link': linkType.value === 1}}>
                {
                  linkType.value !== 3 ? <span>查看更多</span> : <i class="van-icon van-icon-arrow"></i>
                }
              </div> : ''
            }
          </div>
          { desc.value && <div class="title-desc">{ desc.value }</div>}
        </div>
      )
    }
  }
}
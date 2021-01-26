import { computed } from 'vue';
// import defaultImage from '@/assets/images/default-image.png';
import './index.less';

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

    return () => {
      return (
        <div class="x-image-nav image-nav">
          <div class="image-nav-item">
            {
              dataList.value.map(item => {
                return (
                  <img class="image" src={ item.icon } />
                  // <span class="title">{ item.label }</span>
                )
              })
            }
          </div>
        </div>
      )
    }
  },
}
import { computed } from 'vue';
import defaultAdImage from '@/assets/images/default-ad.png';
import './index.less';

export default {
  name: 'x-image-ad',
  props: {
    data: Object,
  },
  setup (props) {
    const dataList = computed(() => {
      if (props.data instanceof Object) {
        return [ ...(props.data.ad || []) ];
      }
      return [];
    });

    return () => {
      return (
        <div class="x-image-ad image-ad">
          {
            dataList.value.length > 0 ?
            <van-swipe class="image-ad-swipe" autoplay={3000} indicator-color="white">
              <van-swipe-item>
              {
                dataList.value.map(item => <img class="image-ad-item" src={item.image} />)
              }
              </van-swipe-item>
            </van-swipe> :
            <img class="image-ad-item" src={defaultAdImage}></img>
          }
        </div>
      )
    }
  }
}
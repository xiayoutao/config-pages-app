import { computed } from 'vue';
import './index.less';

export default {
  name: 'x-member-enter',
  props: {
    data: Object,
  },
  setup (props) {
    const title = computed(() => props.data.title || '个人中心');
    const actionText = computed(() => props.data.actionText || null);

    function goMemberEnterHandle () {
      console.log('点击');
    }

    return () => {
      return (
        <div class="x-member-enter member-enter">
          <i class="van-icon van-icon-shop-o"></i>
          <p class="title">{ title.value }</p>
          <div class="action">
            <span>{ actionText.value }</span>
            <i class="van-icon van-icon-arrow" onClick={ goMemberEnterHandle }></i>
          </div>
        </div>
      )
    }
  },
}
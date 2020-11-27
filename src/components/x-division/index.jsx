import { computed } from 'vue';

export default {
  name: 'x-division',
  props: {
    data: Object,
  },
  setup (props) {
    const height = computed(() => `${props.data.height >= 10 ? props.data.height : 10}px`);

    return () => {
      return (
        <div class="x-division division" style={{ height: height.value }}></div>
      )
    }
  }
}
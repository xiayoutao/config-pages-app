import './index.less';

export default {
  name: 'x-member-info',
  props: {
    data: Object,
  },
  setup (props) {
    console.log(props);
    
    return () => {
      return (
        <div class="x-member-info member-info"></div>
      )
    }
  }
}
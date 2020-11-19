export default {
  props: {
    data: {
      type: [Array, Object],
    },
  },
  computed: {
    dataForm () {
      if (this.data instanceof Object) {
        return { ...this.data };
      }
      return {};
    },
    dataList () {
      if (this.data instanceof Array) {
        return [ ...this.data ];
      }
      return [];
    }
  },
}
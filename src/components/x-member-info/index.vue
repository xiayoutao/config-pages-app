<template>
<div class="x-member-info member-info"></div>
</template>

<script>
export default {
  name: 'x-member-info',
  props: {
    data: Object,
  },
  setup (props) {
    console.log(props);
  }
}
</script>

<style lang="less" scoped>
.member-info {
  display: flex;
  align-items: center;
  height: 100px;
  background-color: #ccc;
  font-size: 14px;
}
</style>
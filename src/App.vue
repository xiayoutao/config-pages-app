<template>
<router-view></router-view>
</template>

<script>
import { provide, reactive } from 'vue';
import store from '@/store';

export default {
  name: 'App',
  setup() {
    provide('store', reactive(store));
  }
}
</script>

<style lang="less">
@import url('~@/assets/styles/global.less');
</style>
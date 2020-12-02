<template>
<div class="main" v-if="!loading" :style="{backgroundColor: pageConfig.bgColor}">
  <template
    v-for="(item, index) in layouts"
    @click="selectedIndex = index"
  >
    <component :is="item.name" :key="index" :data="item.data"></component>
  </template>
</div>
<van-loading class="loading" size="24px" v-else>加载中...</van-loading>
</template>

<script>
import components from '@/components/index.js';
import { postMessage } from '@/scripts/tools.js';
import { getPageLayout } from '@/apis/show.js';

export default {
  name: 'show',
  components: {
    ...components,
  },
  data () {
    return {
      loading: true,
      layouts: [],
      pageConfig: {},
    }
  },
  created () {
    this.getPageLayout(this.$route.query.uuid);
  },
  methods: {
    async getPageLayout (uuid) {
      const data = await getPageLayout({
        uuid
      });
      console.log(data);
      this.loading = false;
      if (data) {
        this.pageConfig = {...data.config};
        this.layouts = [...data.layouts];
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import '../styles/comp-layout.less';

.main {
  max-width: 768px;
  min-height: 100vh;
  margin: 0 auto;
  transform: scale(1);
  overflow: visible;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
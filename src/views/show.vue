<template>
<div class="main" v-if="!loading" :style="{backgroundColor: pageConfig.bgColor}">
  <template
    v-for="(item, index) in layouts"
    :key="index"
    @click="selectedIndex = index"
  >
    <component :is="item.name" :data="item.data"></component>
  </template>
</div>
<van-loading class="loading" size="24px" v-else>加载中...</van-loading>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import components from '@/components';
import { getPageLayout } from '@/apis/show';

export default {
  name: 'show',
  components: {
    ...components,
  },
  setup () {
    const route = useRoute();

    let state = reactive({
      loading: false,
      layouts: [],
      pageConfig: {},
    });

    handleGetPageLayout(route.query.uuid);

    async function handleGetPageLayout (uuid) {
      state.loading = true;
      const data = await getPageLayout({
        uuid
      });
      state.loading = false;
      if (data) {
        state.pageConfig = { ...data.config };
        state.layouts = [ ...data.layouts ];

        document.title = data.config.title;
      }
    }

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/comp-layout.less';

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
import { reactive, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import components from '@/components';
import { getPageLayout } from '@/apis/show';

export default {
  name: 'show',
  components: {
    ...components,
  },
  setup () {
    let state = reactive({
      loading: false,
      pageConfig: {},
      layouts: [],
      selectedIndex: null,
    });

    const route = useRoute();

    handleGetPageLayout(route.query.uuid);

    async function handleGetPageLayout (uuid) {
      const data = await getPageLayout({
        uuid
      });
      state.loading = false;
      let layouts = toRaw(state.layouts);
      let pageConfig = toRaw(state.pageConfig);
      if (data) {
        state.pageConfig = { ...pageConfig };
        state.layouts = [ ...layouts ];

        document.title = data.config.title;
      }
    }

    return () => {
      let layouts = toRaw(state.layouts);
      let pageConfig = toRaw(state.pageConfig);

      return (
        !state.loading ?
          <div class="main" style={{backgroundColor: pageConfig.bgColor}}>
            {
              layouts.forEach((item, index) => {
                <component is={item.name} data={item.data} onClick={state.selectedIndex = index}></component>
              })
            }
          </div> :
          <van-loading class="loading" size="24px" v-else>加载中...</van-loading>
      )
    }
  },
};
<template>
<div class="page-wrap">
  <div class="main" :style="{backgroundColor: pageConfig.bgColor}" :data-id="pageConfig.bgColor">
    <div style="min-height: 603px">
      <div
        :ref="el => { if (el) layoutComp[index] = el }"
        class="layout-comp preview"
        v-for="(item, index) in layouts"
        :key="item.name + Math.floor(Math.random() * 10000) + Date.now()"
        :class="[{active: selectedIndex === index}, {ghost: item.drag}, {disabled: item.disabled}]"
        @click="singleCompSelectedHandle(index)"
      >
        <component :is="item.name" :data="item.data"></component>
        <p class="comp-delete" @click.stop="deleteSingleCpsHandle(index)"></p>
        <p class="comp-name">
          <span>{{ item.label }}</span>
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { nextTick, onMounted, reactive, toRaw, toRefs, watch } from 'vue';
import components from '@/components';
import { postMessage } from '@/scripts/tools';
import { getUUID } from '@/scripts/utils';

export default {
  name: 'preview',
  components: {
    ...components,
  },
  setup() {
    let state = reactive({
      selectedIndex: null, // 选中的数组索引值
      backupLayouts: [], // 备份的布局
      layouts: [],
      pageConfig: {},
      layoutComp: [],
    });

    onMounted(() => {
      window.addEventListener('message', (event) => {
        receiveMessageHandle(event.data);
      });
    });

    watch(() => state.selectedIndex, (val) => {
      postMessageHandle({
        type: 'updateSelectedIndex',
        index: val,
      });
    });

    // 获取所有组件offsetTop值
    async function countAllCount () {
      await nextTick();
      let allHeight = 0;
      let layoutComp = toRaw(state.layoutComp);
      layoutComp.forEach((item, index) => {
        state.layouts[index].offsetTop = item.offsetTop;
        state.layouts[index].height = item.offsetHeight;
        allHeight += item.offsetHeight;
      });
      backupLayoutHandle(); // 备份布局数据
      postMessageHandle({
        type: 'updateHeight',
        height: Math.max(allHeight, 603) + 50,
      });
    }

    // 接收消息
    function receiveMessageHandle (data) {
      try {
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
      } catch (error) {
        console.log(error);
      }
      if (data.type === 'config') { // 页面信息
        state.pageConfig = { ...data.config };
      } else if (data.type === 'layouts') { // 布局信息
        let layouts = [];
        data.layouts.forEach(item => {
          layouts.push({
            ...item,
            data: item.data,
          });
        });

        state.layouts = [ ...layouts ];
        countAllCount();
      } else if (data.type === 'clearSelected') { // 清空选中组件
        state.selectedIndex = null;
      } else if (data.type === 'layoutMoveOver') { // 拖拽到指定区域
        let activeIndex = -1;
        reductionLayoutHandle(); // 还原布局数据
        state.layouts.some((item, index) => {
          if (data.y >= item.offsetTop && data.y < item.offsetTop + item.height) {
            activeIndex = index;
          } else if (data.y <= item.offsetTop) {
            return true;
          }
        });
        const needAddCps = {
          drag: true,
          ...data.component,
          data: data.data,
          disabled: data.disabled,
          uuid: getUUID(),
        };
        if (activeIndex === -1) {
          state.layouts.push(needAddCps);
          activeIndex = state.layouts.length - 1;
        } else {
          state.layouts.splice(activeIndex, 0, needAddCps);
        }
        state.selectedIndex = activeIndex; // 新增的组件设置为选中状态
      } else if (data.type === 'layoutMoveOut') { // 拖拽到显示区域外面还原数据
        reductionLayoutHandle(); // 还原布局数据
      } else if (data.type === 'layoutChanged') { // 拖拽到显示区域并放开鼠标，布局改变
        filterLayoutHandle();
        state.layouts.forEach((item, index) => {
          state.layouts[index].drag = false;
        });
        postMessageHandle({
          type: 'updateLayouts',
          layouts: toRaw(state.layouts),
        });
        countAllCount();
      }
    }

    // 发送消息
    function postMessageHandle (data, delay = 0) {
      postMessage(window.top, data, delay);
    }

    // 过滤布局数据
    function filterLayoutHandle () {
      let layouts = [];
      state.layouts.forEach(item => {
        if (!item.disabled) {
          layouts.push({
            ...item,
          });
        }
      });
      state.layouts = [ ...layouts ];
      if (state.selectedIndex > layouts.length - 1) {
        state.selectedIndex = layouts.length - 1;
      }
    }

    // 还原布局
    function reductionLayoutHandle () {
      state.layouts = [ ...state.backupLayouts ];
    }

    // 备份布局
    function backupLayoutHandle () {
      state.backupLayouts = [ ...state.layouts ];
    }

    function singleCompSelectedHandle (index) {
      state.selectedIndex = index;
    }

    // 删除单个组件
    function deleteSingleCpsHandle (index) {
      state.layouts.splice(index, 1);
      state.layoutComp.splice(index, 1);

      postMessageHandle({
        type: 'updateLayouts',
        layouts: toRaw(state.layouts),
      });
      if (state.layouts.length > 0) {
        state.selectedIndex = index - 1 >= 0 ? index - 1 : 0;
      } else {
        state.selectedIndex = null;
      }
      countAllCount();
    }

    return {
      singleCompSelectedHandle,
      deleteSingleCpsHandle,
      ...toRefs(state),
    }
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/comp-layout.less';
.page-wrap {
  min-height: 100vh;

  .main {
    width: 375px;
    margin: 0 auto;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, .1);
    transform: scale(1);
    overflow: visible;
  }
}
</style>
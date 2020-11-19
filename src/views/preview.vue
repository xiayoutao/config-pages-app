<template>
<div class="page-wrap">
  <div class="main" :style="{backgroundColor: pageConfig.bgColor}">
    <div style="min-height: 603px">
      <div
        :ref="el => { if (el) layoutComp[index] = el }"
        class="layout-comp preview"
        v-for="(item, index) in layouts"
        :key="item.name + Math.floor(Math.random() * 10000) + Date.now()"
        :class="[{active: selectedIndex === index}, {ghost: item.drag}, {disabled: item.disabled}]"
        @click="selectedIndex = index"
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
import components from '@/components';
import { postMessage } from '@/scripts/tools';
import { getUUID } from '@/scripts/utils';
import { nextTick, onMounted, ref, watch } from 'vue';

export default {
  name: 'preview',
  components: {
    ...components,
  },
  setup() {
    let selectedIndex = ref(null); // 选中的数组索引值
    let backupLayouts = ref([]); // 备份的布局
    let layouts = ref([]);
    let pageConfig = ref({});
    let layoutComp = ref([]);

    onMounted(() => {
      window.addEventListener('message', (event) => {
        receiveMessageHandle(event.data);
      });
    });

    watch(selectedIndex, (val) => {
      postMessageHandle({
        type: 'updateSelectedIndex',
        index: val,
      });
    });

    // 获取所有组件offsetTop值
    async function countAllCount () {
      await nextTick();
      console.log('countAllCount', layoutComp.value);
      let allHeight = 0;
      layoutComp.value.forEach((item, index) => {
        layouts.value[index].offsetTop = item.offsetTop;
        layouts.value[index].height = item.offsetHeight;
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
      console.log('receiveMessage', data);
      if (data.type === 'config') { // 页面信息
        pageConfig.value = { ...data.config };
      } else if (data.type === 'layouts') { // 布局信息
        let _layouts = [];
        data.layouts.forEach(item => {
          _layouts.push({
            ...item,
            data: item.data,
          });
        });
        layouts.value = [ ..._layouts ];
        countAllCount();
      } else if (data.type === 'clearSelected') { // 清空选中组件
        selectedIndex.value = null;
      } else if (data.type === 'layoutMoveOver') { // 拖拽到指定区域
        let activeIndex = -1;
        reductionLayoutHandle(); // 还原布局数据
        layouts.value.some((item, index) => {
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
          layouts.value.push(needAddCps);
          activeIndex = layouts.value.length - 1;
        } else {
          layouts.value.splice(activeIndex, 0, needAddCps);
        }
        selectedIndex.value = activeIndex; // 新增的组件设置为选中状态
      } else if (data.type === 'layoutMoveOut') { // 拖拽到显示区域外面还原数据
        reductionLayoutHandle(); // 还原布局数据
      } else if (data.type === 'layoutChanged') { // 拖拽到显示区域并放开鼠标，布局改变
        filterLayoutHandle();
        layouts.value.forEach((item, index) => {
          layouts.value[index].drag = false;
        });
        postMessageHandle({
          type: 'updateLayouts',
          layouts: layouts.value,
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
      let _layouts = [];
      layouts.value.forEach(item => {
        if (!item.disabled) {
          _layouts.push({
            ...item,
          });
        }
      });
      layouts.value = [ ..._layouts ];
      if (selectedIndex.value > _layouts.length - 1) {
        selectedIndex.value = _layouts.length - 1;
      }
    }

    // 还原布局
    function reductionLayoutHandle () {
      layouts.value = [ ...backupLayouts.value ];
    }

    // 备份布局
    function backupLayoutHandle () {
      backupLayouts.value = [ ...layouts.value ];
    }

    // 删除单个组件
    function deleteSingleCpsHandle (index) {
      layouts.value.splice(index, 1);
      postMessageHandle({
        type: 'updateLayouts',
        layouts: [ ...layouts.value ],
      });
      if (layouts.value.length > 0) {
        selectedIndex.value = index - 1 >= 0 ? index - 1 : 0;
      } else {
        selectedIndex.value = null;
      }
      countAllCount();
    }

    return {
      layoutComp,
      selectedIndex,
      backupLayouts,
      layouts,
      pageConfig,
      deleteSingleCpsHandle,
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
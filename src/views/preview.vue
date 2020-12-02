<template>
<div class="page-wrap">
  <div class="main" :style="{backgroundColor: pageConfig.bgColor}">
    <div style="min-height: 603px">
      <div
        ref="layoutComp"
        class="layout-comp preview"
        v-for="(item, index) in layouts"
        :key="item.name + Math.floor(Math.random() * 10000) + Date.now()"
        :class="[{active: selectedIndex === index}, {ghost: item.drag}, {disabled: item.disabled}]"
        @click="selectedIndex = index"
      >
        <component :is="item.name" :key="index" :data="item.data"></component>
        <p class="comp-delete" @click.stop="handleDeleteSingleCps(index)"></p>
        <p class="comp-name">
          <span>{{ item.label }}</span>
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import components from '@/components/index.js';
import { postMessage } from '@/scripts/tools.js';
import { getUUID } from '@/scripts/utils.js';

export default {
  name: 'preview',
  components: {
    ...components,
  },
  data () {
    return {
      selectedIndex: null, // 选中的数组索引值
      compData: {}, // 组件数据
      backupLayouts: [], // 备份的布局
      layouts: [],
      pageConfig: {},
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('message', (event) => {
        this.receiveMessage(event.data);
      });
    });
  },
  methods: {
    // async getPageLayout (uuid) {
    //   const { data } = await this.$http({
    //     url: this.$http.adornUrl('/pages/get'),
    //     method: 'get',
    //     params: this.$http.adornParams({
    //       uuid,
    //     }),
    //   });
    //   if (data && data.code === 0 && data.result) {
    //     this.pageConfig = {...data.result.config};
    //     this.layouts = [...data.result.layouts];

    //     this.postMessage({
    //       type: 'updateLayouts',
    //       layouts: this.layouts,
    //     });

    //     this.postMessage({
    //       type: 'updateConfig',
    //       config: this.config,
    //     });
    //   }
    // },
    // 获取所有组件offsetTop值
    countAllCount () {
      this.$nextTick(() => {
        let allHeight = 0;
        let layoutComp = this.$refs.layoutComp || [];
        layoutComp.forEach((item, index) => {
          this.layouts[index].offsetTop = item.offsetTop;
          this.layouts[index].height = item.offsetHeight;
          allHeight += item.offsetHeight;
        });
        this.handleBackupLayout(); // 备份布局数据
        this.postMessage({
          type: 'updateHeight',
          height: Math.max(allHeight, 603) + 50,
        });
      });
    },
    // 发送消息
    postMessage (data, delay = 0) {
      postMessage(window.top, data, delay);
    },
    // 接收消息
    receiveMessage (data) {
      // console.log('receiveMessage', data);
      if (data.type === 'config') { // 页面信息
        this.pageConfig = { ...data.config };
      } else if (data.type === 'layouts') { // 布局信息
        let layouts = [];
        data.layouts.forEach((item, index) => {
          layouts.push({
            ...item,
            data: item.data,
          });
        });
        this.layouts = [ ...layouts ];
        this.countAllCount();
      } else if (data.type === 'clearSelected') { // 清空选中组件
        this.selectedIndex = null;
      } else if (data.type === 'layoutMoveOver') { // 拖拽到指定区域
        let activeIndex = -1;
        this.handleReductionLayout(); // 还原布局数据
        this.layouts.some((item, index) => {
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
          this.layouts.push(needAddCps);
          activeIndex = this.layouts.length - 1;
        } else {
          this.layouts.splice(activeIndex, 0, needAddCps);
        }
        this.selectedIndex = activeIndex; // 新增的组件设置为选中状态
      } else if (data.type === 'layoutMoveOut') { // 拖拽到显示区域外面还原数据
        this.handleReductionLayout(); // 还原布局数据
      } else if (data.type === 'layoutChanged') { // 拖拽到显示区域并放开鼠标，布局改变
        this.handleFilterLayout();
        this.layouts.forEach((item, index) => {
          this.layouts[index].drag = false;
        });
        this.postMessage({
          type: 'updateLayouts',
          layouts: this.layouts,
        });
        this.countAllCount();
      }
    },
    // 过滤布局数据
    handleFilterLayout () {
      let layouts = [];
      this.layouts.forEach(item => {
        if (!item.disabled) {
          layouts.push({
            ...item,
          });
        }
      });
      this.layouts = [...layouts];
      if (this.selectedIndex > this.layouts.length - 1) {
        this.selectedIndex = this.layouts.length - 1;
      }
    },
    // 还原布局
    handleReductionLayout () {
      this.layouts = [ ...this.backupLayouts ];
    },
    // 备份布局
    handleBackupLayout () {
      this.backupLayouts = [ ...this.layouts ];
    },
    // 删除单个组件
    handleDeleteSingleCps (index) {
      this.layouts.splice(index, 1);
      this.postMessage({
        type: 'updateLayouts',
        layouts: [...this.layouts],
      });
      if (this.layouts.length > 0) {
        this.selectedIndex = index - 1 >= 0 ? index - 1 : 0;
      } else {
        this.selectedIndex = null;
      }
      this.countAllCount();
    },
  },
  watch: {
    selectedIndex (val) {
      this.postMessage({
        type: 'updateSelectedIndex',
        index: val,
      });
    },
    layouts: {
      handler (val) {
        console.log('layouts', val);
      },
      deep: true,
    },
    pageConfig: {
      handler (val) {
        console.log('pageConfig', val);
      },
      deep: true,
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/comp-layout.less';
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
<template>
<div class="x-richtext richtext" :style="{ background }">
  <div class="richtext-inner" :class="{ fullscreen }" v-html="content || defaultContent"></div>
</div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'x-richtext',
  props: {
    data: Object,
  },
  setup(props) {
    const defaultContent = ref(
      `
        <p>点此编辑『富文本』内容 ——&gt;</p>
        <p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。</p>
        <p>还可以在这里加入表格了</p>
        <table><tbody><tr><td width="93" valign="top" style="word-break: break-all;">中奖客户</td><td width="93" valign="top" style="word-break: break-all;">发放奖品</td><td width="93" valign="top" style="word-break: break-all;">备注</td></tr><tr><td width="93" valign="top" style="word-break: break-all;">猪猪</td><td width="93" valign="top" style="word-break: break-all;">内测码</td><td width="93" valign="top" style="word-break: break-all;"><em><span style="color: rgb(255, 0, 0);">已经发放</span></em></td></tr><tr><td width="93" valign="top" style="word-break: break-all;">大麦</td><td width="93" valign="top" style="word-break: break-all;">积分</td><td width="93" valign="top" style="word-break: break-all;"><a href="javascript: void(0);" target="_blank" draggable="false">领取地址</a></td></tr></tbody></table>
        <p style="text-align: left;"><span style="text-align: left;">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p>
      `
    );

    const fullscreen = computed(() => props.data.fullscreen);
    const background = computed(() => props.data.background);
    const content = computed(() => props.data.content);

    return {
      defaultContent,
      fullscreen,
      background,
      content,
    }
  },
}
</script>

<style lang="less" scoped>
.richtext {

  &-inner {
    padding: 10px;
    line-height: 1.5;
    text-align: left;
    font-size: 16px;
    color: #333;
    word-wrap: break-word;

    &.fullscreen {
      padding: 0;
    }

    /deep/ p {
      margin: 0 0 10px;
    }

    /deep/ a {
      color: #07d;
    }

    /deep/ img {
      max-width: 100% !important;
      min-height: 1px;
      vertical-align: bottom;
      background: 0 0;
    }

    /deep/ table {
      display: table;
      width: auto!important;
      margin: 0 auto 10px;
      border-collapse: collapse;

      caption {
        padding: 3px;
        text-align: center;
        border: 1px dashed #ddd;
        border-bottom: 0;
      }

      th {
        background: #f7f7f7;
        border-top: 2px solid #bbb;
      }

      td, th {
        padding: 5px 10px;
        border: 1px solid #ddd;
        box-sizing: content-box;

        p {
          margin: 0;
          padding: 0
        }
      }

      th {
        background: #f7f7f7;
        border-top: 2px solid #bbb;
      }
    }
  }
}
</style>
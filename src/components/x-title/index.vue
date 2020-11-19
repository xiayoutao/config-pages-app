<template>
<div class="x-title title">
  <div class="title-title">
    <div class="label">{{ title }}</div>
    <div class="more" :class="[linkType, {'is-link': linkType === 1}]" v-if="[1, 2, 3].indexOf(linkType) >= 0">
      <span v-if="linkType !== 3">查看更多</span>
      <i class="van-icon van-icon-arrow" v-else></i>
    </div>
  </div>
  <div class="title-desc" v-if="desc">{{ desc }}</div>
</div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'x-title',
  props: {
    data: Object,
  },
  setup (props) {
    const linkType = computed(() => props.data.linkType || 0);
    const title = computed(() => props.data.title);
    const desc = computed(() => props.data.desc);
    
    return {
      linkType,
      title,
      desc,
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  padding: 12px 16px;
  font-size: 14px;
  color: #666;

  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    >.more {
      display: flex;
      align-items: center;

      &.is-link {
        color: #38f;
      }
    }
  }

  &-desc {
    margin-top: 5px;
    text-align: left;
    font-size: 12px;
    color: #8c8c8c;
    word-break: break-all;
  }
}
</style>
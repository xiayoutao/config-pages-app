<template>
<div class="main">
  <div
    ref="layoutComp"
    class="layout-comp"
    v-for="(item, index) in layouts"
    :key="item.id + Math.floor(Math.random() * 10000) + Date.now()"
    :class="[{active: selectedIndex === index}, {ghost: item.drag}]"
    @click="selectedIndex = index"
  >
    <component :is="item.name" :key="index" :data="item.data"></component>
    <p class="comp-delete" @click="handleDeleteSingleCps"></p>
    <p class="comp-name">
      <span>{{ item.label }}</span>
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'layout',
};
</script>

<style lang="less" scoped>
</style>
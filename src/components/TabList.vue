<template>
  <div class="tabs-container">
    <div
      :class="['tab', { active: currentTab == tab.tab }]"
      v-for="tab in tablist"
      :key="tab.tab"
      @click="click(tab.tab)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TabList",
  props: {
    currentTab: String,
    tablist: Array,
  },
  methods: {
    click(tab) {
      this.$emit("change", tab);
    },
  },
};
</script>

<style scoped>
.tabs-container {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
}

.tab {
  cursor: pointer;
  padding: 8px;
  background-color: #b5c3b3;
  border-radius: 8px;
  margin: 0 4px;
}

.tab.active {
  background-color: #8ec782;
}
</style>

<template>
  <div class="items-container">
    <span v-for="(item, idx) in list" :key="idx" class="item">
      <pre>{{ item }}</pre>
    </span>
  </div>
</template>

<script>
export default {
  name: "PreList",
  props: {
    list: Array,
  },
};
</script>

<style scoped>
.items-container {
  display: flex;
  flex-direction: column;

  background-color: #e9e9e9;
  padding: 5px;

  max-height: 300px;
  overflow: auto;
}

.item {
  padding: 3px 0;
}

pre {
  margin: 0;
  padding: 2px 5px;
}
</style>

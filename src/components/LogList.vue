<template>
  <div class="logs-container">
    <span v-for="(log, idx) in logs" :key="idx" class="log">
      {{ log }}
    </span>
  </div>
</template>

<script>
export default {
  name: "LogList",
  props: {
    logs: Array,
  },
};
</script>

<style scoped>
.logs-container {
  display: flex;
  flex-direction: column;
}

.log {
  padding: 5px 0;
}
</style>

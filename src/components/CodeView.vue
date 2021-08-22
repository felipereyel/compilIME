<template>
  <div class="code">
    <div class="line" v-for="(line, idx) in code.split('\n')" :key="idx">
      <pre class="index">{{ idx + 1 }}</pre>
      <pre class="content">{{ line }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeView",
  props: {
    code: String,
  },
};
</script>

<style scoped>
.code {
  background-color: #e9e9e9;
  max-height: 300px;
  overflow: auto;
}

.line {
  display: flex;
  flex-direction: row;
}

.index {
  width: 20px;
  height: 20px;
  background-color: #adc5a8;
}

pre {
  margin: 0;
  padding: 2px 5px;
}
</style>

<template>
  <div class="home">
    <h1>Compilador SSL - IME</h1>
    <input type="file" :multiple="false" @input="fileInput" />
    <div v-if="fileContent" class="compiler">
      <div class="code">
        <pre>{{ fileContent }}</pre>
      </div>
      <div class="controls">
        <div class="control-buttons">
          <button @click="lexical">Lexical analysis</button>
          <button disabled>Syntax analysis</button>
          <button disabled>Compile!</button>
        </div>
        <div v-if="analysisLogs.length" class="logs">
          <span v-for="log in analysisLogs" :key="log" class="log">
            {{ log }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lexical from "../utils/compiler/src/lexical";

export default {
  name: "Home",
  data() {
    return {
      fileContent: null,
      analysisLogs: [],
    };
  },
  methods: {
    fileInput(evt) {
      if (evt.target.files[0]) {
        this.analysisLogs = [];
        const reader = new FileReader();
        reader.onload = () => {
          this.fileContent = reader.result;
        };
        reader.onerror = () => {
          this.fileContent = "error reading file";
        };
        reader.readAsText(evt.target.files[0], "UTF-8");
      }
    },
    lexical() {
      const lexical = new Lexical(this.fileContent);
      const errors = lexical.run();
      if (errors.length) {
        this.analysisLogs = errors.map(
          (e) => `Line ${e.line}, Char ${e.char}: ${e.message}`
        );
      } else {
        this.analysisLogs = ["There are no lexical errors"];
      }
    },
  },
};
</script>

<style scoped>
.code {
  margin: 15px 0;
  padding: 10px 30px;
  background-color: #c7c5c5;

  max-height: 300px;
  overflow: auto;
}

.control-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.logs {
  display: flex;
  flex-direction: column;
}
</style>

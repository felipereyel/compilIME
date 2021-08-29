<template>
  <div class="home">
    <input type="file" :multiple="false" @input="fileInput" />
    <div v-if="fileContent" class="compiler">
      <div class="control-buttons">
        <button @click="lexical">Lexical analysis</button>
        <button disabled>Syntax analysis</button>
        <button disabled>Compile!</button>
      </div>
      <code-view :code="fileContent" />
      <div v-if="result.logs">
        <div class="tabs-container">
          <div
            :class="['tab', { active: currentTab == tab.tab }]"
            v-for="tab in tabs"
            :key="tab.tab"
            @click="currentTab = tab.tab"
          >
            {{ tab.label }}
          </div>
        </div>

        <div class="logs-container" v-if="currentTab == 'logs'">
          <span v-for="(log, idx) in result.logs" :key="idx" class="log">
            {{ log }}
          </span>
        </div>
        <div class="logs-container" v-if="currentTab == 'tokens'">
          <span v-for="(token, idx) in result.tokens" :key="idx" class="log">
            {{ token }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Lexical from "../utils/compiler/src/lexical";
import CodeView from "../components/CodeView.vue";

export default {
  name: "Home",
  components: {
    CodeView,
  },
  data() {
    return {
      fileContent: null,
      result: {},
      currentTab: "logs",
      tabs: [
        {
          label: "Result Logs",
          tab: "logs",
        },
        {
          label: "Tokens",
          tab: "tokens",
        },
        {
          label: "Tokenized File",
          tab: "token-file",
        },
      ],
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
      lexical.run();
      this.result = lexical.getResults();
    },
  },
};
</script>

<style scoped>
.code {
  margin: 15px 0;
}

.control-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

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

.logs-container {
  display: flex;
  flex-direction: column;
}

.log {
  padding: 5px 0;
}
</style>

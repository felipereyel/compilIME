<template>
  <div class="home">
    <input type="file" :multiple="false" @input="fileInput" />
    <div v-if="fileContent" class="compiler">
      <code-view :code="fileContent" />
      <div class="control-buttons">
        <button @click="lexical">Lexical analysis</button>
        <button disabled>Syntax analysis</button>
        <button disabled>Compile!</button>
      </div>
      <div v-if="result.logs">
        <tab-list
          :currentTab="currentTab"
          :tablist="tabs"
          @change="currentTab = $event"
        />
        <div class="logs-container" v-if="currentTab == 'logs'">
          <span v-for="(log, idx) in result.logs" :key="idx" class="log">
            {{ log }}
          </span>
        </div>
        <pre-list v-if="currentTab == 'tokens'" :list="result.tokens" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Lexical from "../utils/compiler/src/lexical";
import CodeView from "../components/CodeView.vue";
import PreList from "../components/PreList.vue";
import TabList from "../components/TabList.vue";

export default {
  name: "Home",
  components: {
    CodeView,
    PreList,
    TabList,
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
        // {
        //   label: "Tokenized File",
        //   tab: "token-file",
        // },
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

.logs-container {
  display: flex;
  flex-direction: column;
}

.log {
  padding: 5px 0;
}
</style>

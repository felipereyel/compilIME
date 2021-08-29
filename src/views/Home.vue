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
        <log-list v-if="currentTab == 'logs'" :logs="result.logs" />
        <pre-list v-if="currentTab == 'tokens'" :list="result.tokens" />
        <pre-list
          v-if="currentTab == 'identifiers'"
          :list="result.identifiers"
        />
        <pre-list v-if="currentTab == 'consts'" :list="result.consts" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Lexical from "../utils/compiler/src/lexical";
import CodeView from "../components/CodeView.vue";
import PreList from "../components/PreList.vue";
import LogList from "../components/LogList.vue";
import TabList from "../components/TabList.vue";

export default {
  name: "Home",
  components: {
    CodeView,
    PreList,
    LogList,
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
        {
          label: "Identifiers",
          tab: "identifiers",
        },
        {
          label: "Consts",
          tab: "consts",
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
</style>

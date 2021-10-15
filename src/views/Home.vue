<template>
  <div class="home">
    <div class="file-chooser">
      <dropdown
        :options="options"
        placeholder="Choose from examples"
        @select="changeCode"
      />
      <span class="file-span"> or </span>
      <input
        class="uploadbtn"
        type="file"
        :multiple="false"
        @input="fileInput"
      />
    </div>
    <div v-if="fileContent" class="compiler">
      <code-view :code="fileContent" />
      <div class="control-buttons">
        <button @click="compile">Compile!</button>
      </div>
      <div v-if="logs.length">
        <tab-list
          :currentTab="currentTab"
          :tablist="tabs"
          @change="currentTab = $event"
        />
        <log-list v-if="currentTab == 'logs'" :logs="logs" />
        <pre-list
          v-if="currentTab == 'identifiers'"
          :list="lexicalResult.identifiers"
        />
        <pre-list v-if="currentTab == 'consts'" :list="lexicalResult.consts" />
        <pre-list v-if="currentTab == 'code'" :list="compileResult.out" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Lexical from "../utils/compiler/src/lexical";
import Syntatical from "../utils/compiler/src/syntatical";
import { options } from "../utils/examples";

import Dropdown from "../components/Dropdown.vue";
import CodeView from "../components/CodeView.vue";
import PreList from "../components/PreList.vue";
import LogList from "../components/LogList.vue";
import TabList from "../components/TabList.vue";

export default {
  name: "Home",
  components: {
    CodeView,
    Dropdown,
    PreList,
    LogList,
    TabList,
  },
  data() {
    return {
      fileContent: null,
      logs: [],
      lexicalResult: {},
      compileResult: {},
      currentTab: "logs",
      tabs: [
        {
          label: "Result Logs",
          tab: "logs",
        },
        {
          label: "Identifiers",
          tab: "identifiers",
        },
        {
          label: "Consts",
          tab: "consts",
        },
        {
          label: "Result code",
          tab: "code",
        },
      ],
      options,
    };
  },
  methods: {
    fileInput(evt) {
      if (evt.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => this.changeCode(reader.result);
        reader.onerror = () => this.changeCode("error reading file");
        reader.readAsText(evt.target.files[0], "UTF-8");
      }
    },
    changeCode(content) {
      this.resetState();
      this.fileContent = content;
    },
    lexical() {
      const lexical = new Lexical(this.fileContent);
      lexical.run();
      this.lexicalResult = lexical.getResults();
      this.logs.push(...this.lexicalResult.logs);
    },
    compile() {
      this.resetState();
      this.lexical();

      if (this.logs.length > 1) return;

      const lexical = new Lexical(this.fileContent);
      const syntatical = new Syntatical(lexical);
      try {
        syntatical.parse();
        this.compileResult.out = syntatical.scope._out.split("\n");
      } catch (e) {
        this.logs.push(e.message);
      }
    },
    resetState() {
      this.logs = [];
      this.lexicalResult = {};
      this.compileResult = {};
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

.file-chooser {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.file-span {
  margin: 0 30px;
}

.uploadbtn {
  width: 157px;
}
</style>

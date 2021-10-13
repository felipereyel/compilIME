<template>
  <div class="about">
    <h2>Frontend for SSL compiler</h2>
    <h3>Tokens Enum</h3>
    <pre-list :list="tokens" />
    <h3>Authors</h3>
    <lu>
      <li>Felipe Reyel</li>
      <li>Leonardo Gomes</li>
    </lu>
    <h3>Sources</h3>
    <lu>
      <li>
        Compiler:
        <a href="https://github.com/felipereyel/ssl-compiler-ime">
          https://github.com/felipereyel/ssl-compiler-ime
        </a>
      </li>
      <li>
        Frontend:
        <a href="https://github.com/felipereyel/compilime">
          https://github.com/felipereyel/compilime
        </a>
      </li>
    </lu>
  </div>
</template>

<script>
import { Tokens } from "../utils/compiler/src/lexical/header";
import PreList from "../components/PreList.vue";

export default {
  name: "About",
  components: {
    PreList,
  },
  data() {
    return {
      tokens: Object.keys(Tokens).map((t) => `${Tokens[t]} -> ${t}`),
    };
  },
};
</script>

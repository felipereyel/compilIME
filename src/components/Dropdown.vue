<template>
  <div class="dropdown">
    <button @click="show = !show" class="dropbtn">{{ placeholder }}</button>
    <div :class="['dropdown-content', { show }]">
      <span v-for="(opt, idx) in options" :key="idx" @click="click(opt.value)">
        {{ opt.label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    options: Array,
    placeholder: String,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    click(value) {
      this.show = false;
      this.$emit("select", value);
    },
  },
};
</script>

<style scoped>
.dropbtn {
  background-color: #04aa6d;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 2.75px 10px;
  cursor: pointer;
}

.dropbtn:hover,
.dropbtn:focus {
  background-color: #3e8e41;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content span {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown span:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
</style>

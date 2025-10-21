<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <input type="text" class="input-main text" v-model="model" />
</template>

<style scoped>
.input-main {
  padding: 0px 24px;
  background-color: var(--bgc-dark);
  border-radius: 10px;
}
</style>

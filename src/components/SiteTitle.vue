<script setup lang="ts">
import type { Locale } from "@/types/locale";
import translations from "@/utils/translations";

defineProps<{
  lang: Locale;
}>();
</script>

<template>
  <h1 class="main-title text">{{ translations.mainHeading[lang] }}</h1>
</template>

<style scoped>
.main-title {
  font-size: 52px;
  font-weight: 700;
  line-height: 120%;
  text-align: center;
}
</style>

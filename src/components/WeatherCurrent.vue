<script setup lang="ts">
import { computed, ref, watch } from "vue";
import LoaderDots from "./UI/LoaderDots.vue";
import bgTodayLarge from "@/assets/images/bg-today-large.svg";

const { t, tUnit, todayStr, displayName, iconSrc, iconTitle } = defineProps<{
  t: number | null;
  tUnit: string;
  todayStr: string;
  displayName: string;
  iconSrc: string;
  iconTitle: string;
}>();

const imgSrc = computed(() => {
  return new URL(`../assets/images/${iconSrc}.webp`, import.meta.url).href;
});

const isWeatherLoaded = computed(() => t && isWeatherReloaded.value);
const isWeatherReloaded = ref(true);

watch(
  () => displayName,
  () => {
    isWeatherReloaded.value = false;
  }
);

watch(
  () => t,
  () => {
    isWeatherReloaded.value = true;
  }
);
</script>

<template>
  <div
    class="current"
    :style="{
      backgroundImage: `url(${bgTodayLarge})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }"
  >
    <p v-if="!displayName">Используйте поиск</p>
    <Transition name="fade" mode="out-in">
      <div class="current__content" v-if="isWeatherLoaded && isWeatherReloaded">
        <div class="current__side current__side--left">
          <p class="text current__city">{{ displayName }}</p>
          <p class="text text-m current__today">{{ todayStr }}</p>
        </div>
        <div class="current__side current__side--right">
          <img :src="imgSrc" alt="icon" class="weather-icon-l" :title="iconTitle" />
          <p class="current__t">{{ Math.round(t || 0) + tUnit }}</p>
        </div>
      </div>
      <LoaderDots v-else
    /></Transition>
  </div>
</template>

<style scoped lang="scss">
.current {
  height: 286px;

  @media (max-width: 649.98px) {
    min-height: 400px;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 24px;

    @media (max-width: 649.98px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
      height: 100%;
    }
  }

  &__today {
    @media (max-width: 649.98px) {
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
  }

  &__displayname {
    max-width: 60%;
  }

  &__side {
    height: 100%;
    display: flex;

    &--left {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 12px;
      max-width: 400px;
    }

    &--right {
      align-items: center;
      gap: 20px;
    }
  }

  &__city {
    font-size: 28px;
    line-height: 28px;
    font-weight: 700;
  }

  &__t {
    font-size: 96px;
    line-height: 96px;
    font-weight: 500;
  }
}
</style>

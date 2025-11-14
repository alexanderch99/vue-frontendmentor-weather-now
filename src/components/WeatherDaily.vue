<script setup lang="ts">
import type { Locale } from "@/types/locale";
import type { DailyData } from "@/types/weather";
import { weekdayShortObj } from "@/utils/consts";
import { correctWeatherIcon, correctWeatherTitle } from "@/utils/correct-weather-data";
import translations from "@/utils/translations";
import { computed } from "vue";

const { lang, daily, tUnit } = defineProps<{
  lang: Locale;
  daily: DailyData;
  tUnit: string;
}>();

const day = new Date().getDay();

function correctIndexForDay(index: number) {
  return (index + day - 1) % 7;
}

function getCorrectWeatherIcon(key: number, data: DailyData) {
  return computed(() => {
    return new URL(`../assets/images/${correctWeatherIcon(key, data)}.webp`, import.meta.url).href;
  });
}
</script>

<template>
  <div class="daily">
    <h2 class="daily__subheading text text-subheading">{{ translations.daily[lang] }}</h2>
    <div class="daily__items">
      <div v-for="(time, key) in daily.time" :key="time || undefined" class="daily__item">
        <div v-if="time == null"></div>
        <div v-else class="daily__data">
          <p class="text text-s">{{ weekdayShortObj[lang][correctIndexForDay(key)] }}</p>
          <img
            :src="getCorrectWeatherIcon(key, daily).value"
            alt="icon"
            class="weather-icon-m"
            :title="correctWeatherTitle(key, daily, lang)"
          />
          <div class="daily__data-bottom">
            <span class="text text-s">
              {{ Math.round(daily.temperature_2m_max[key] ?? 0) + tUnit }}</span
            >
            <span class="text text-s daily__min">
              {{ Math.round(daily.temperature_2m_min[key] ?? 0) + tUnit }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /daily__items -->
  </div>
</template>

<style scoped lang="scss">
.daily {
  margin-top: 48px;

  &__subheading {
    margin-left: 4px;
  }

  &__items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-top: 20px;

    @media (max-width: 829.98px) {
      flex-wrap: wrap;
      gap: 16px;
    }
  }

  &__item {
    flex: 1 0 100px;
    height: 165px;
    padding: 16px 10px;
    background-color: var(--bgc-dark);
    border-radius: 20px;

    @media (max-width: 829.98px) {
      flex: 1 0 30%;
    }

    &:last-child {
      @media (max-width: 829.98px) {
        max-width: 31.9%;
        align-self: center;
      }

      @media (max-width: 649.98px) {
        max-width: 31.3333%;
      }
    }
  }

  &__data {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  &__min {
    color: #d4d3d9;
  }
}
</style>

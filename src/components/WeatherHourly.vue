<script setup lang="ts">
import type { Locale } from "@/types/locale";
import type { HourlyData } from "@/types/weather";
import { correctWeatherIcon, correctWeatherTitle } from "@/utils/correct-weather-data";
import translations from "@/utils/translations";
import { computed } from "vue";

const { lang, hoursNow, hourly, tUnit } = defineProps<{
  lang: Locale;
  hoursNow: number;
  hourly: HourlyData;
  tUnit: string;
}>();

const hourlyTimeSliced = computed(() => hourly.time.slice(hoursNow + 1, hoursNow + 9));

function getCorrectWeatherIcon(key: number, data: HourlyData) {
  return computed(() => {
    return new URL(`../assets/images/${correctWeatherIcon(key, data)}.webp`, import.meta.url).href;
  });
}
</script>

<template>
  <div class="hourly">
    <div class="hourly__top">
      <h2 class="hourly__subheading text text-subheading">{{ translations.hourly[lang] }}</h2>
      <div class="hourly__day"></div>
    </div>
    <div class="hourly__items">
      <div v-for="(time, key) in hourlyTimeSliced" :key="time || undefined" class="hourly__item">
        <div v-if="time == null"></div>
        <div v-else class="hourly__data">
          <p class="hourly__time-and-icon">
            <span
              ><img
                :src="getCorrectWeatherIcon(key, hourly).value"
                alt="icon"
                class="weather-icon-s"
                :title="correctWeatherTitle(key, hourly, lang)"
            /></span>
            <span class="text text-m">
              {{
                new Date(time || 0).toLocaleTimeString(`${lang == "ru" ? "ru-RU" : "en-US"}`, {
                  ...(lang == "ru" ? { hour: "2-digit", minute: "2-digit" } : { hour: "numeric" }),
                })
              }}</span
            >
          </p>
          <p class="hourly__t text text-m">
            {{ Math.round(hourly.temperature_2m[hoursNow + 1 + key] ?? 0) + tUnit }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hourly {
  height: 100%;

  &__subheading {
    height: 30px;
    margin-left: 4px;
  }

  &__items {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: calc(100% - 60px);
  }

  &__item {
    min-height: 60px;
    max-height: 60px;
    padding: 12px 10px;
    background-color: var(--bgc-light);
    border-radius: 10px;
  }

  &__data {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__time-and-icon {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>

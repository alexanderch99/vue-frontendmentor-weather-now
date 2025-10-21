<script setup lang="ts">
import type { Locale } from "@/types/locale";
import type { PrecipitationUnit, WindspeedUnit } from "@/types/weather";
import translations from "@/utils/translations";
import { ref, watch } from "vue";

const { feelsLike, humidity, wind, precipitation, tUnit, windspeedUnit, precipitationUnit } =
  defineProps<{
    feelsLike: number | null;
    humidity: number | null;
    wind: number | null;
    precipitation: number | null;
    tUnit: string;
    windspeedUnit: string;
    precipitationUnit: string;
    lang: Locale;
  }>();

function correctWindKey(unit: string): WindspeedUnit {
  const result = unit.replace(/[^a-z]/gi, "");
  if (result == "ms" || result == "mph") {
    return result;
  } else {
    return "ms";
  }
}
const windKey = ref(correctWindKey(windspeedUnit));

function correctPrecipitationKey(unit: string): PrecipitationUnit {
  const result = unit.replace(/[^a-z]/gi, "");
  if (result == "mm" || result == "inch") {
    return result;
  } else {
    return "mm";
  }
}
const precipitationKey = ref(correctPrecipitationKey(precipitationUnit));

watch(
  () => windspeedUnit,
  () => {
    windKey.value = correctWindKey(windspeedUnit);
  }
);

watch(
  () => precipitationUnit,
  () => {
    precipitationKey.value = correctPrecipitationKey(precipitationUnit);
  }
);
</script>

<template>
  <div class="stats">
    <div class="stats__stat">
      <p class="text text-m">{{ translations.feelsLike[lang] }}</p>
      <p class="text text-l">{{ feelsLike != null ? Math.round(feelsLike) + tUnit : "–" }}</p>
    </div>
    <div class="stats__stat">
      <p class="text text-m">{{ translations.humidity[lang] }}</p>
      <p class="text text-l">{{ humidity != null ? humidity + "%" : "–" }}</p>
    </div>
    <div class="stats__stat">
      <p class="text text-m">{{ translations.wind[lang] }}</p>
      <p class="text text-l">
        {{ wind != null ? Math.round(wind) + " " + translations[windKey][lang] : "–" }}
      </p>
    </div>
    <div class="stats__stat">
      <p class="text text-m">{{ translations.precipitation[lang] }}</p>
      <p class="text text-l">
        {{
          precipitation != null ? precipitation + " " + translations[precipitationKey][lang] : "–"
        }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats {
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: 24px;
  margin-top: 32px;

  @media (max-width: 649.98px) {
    flex-wrap: wrap;
  }

  &__stat {
    flex-grow: 1;
    flex-shrink: 0;
    font-style: 0;
    width: calc(25% - 24px);
    height: 118px;
    padding: 20px;
    background-color: var(--bgc-dark);
    border-radius: 20px;

    @media (max-width: 649.98px) {
      width: calc(50% - 24px);
    }

    & p:last-child {
      margin-top: 24px;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { Locale } from "@/types/locale";
import WeatherDaily from "./WeatherDaily.vue";
import WeatherStats from "./WeatherStats.vue";
import WeatherCurrent from "./WeatherCurrent.vue";
import WeatherHourly from "./WeatherHourly.vue";
import { monthObj, weekdayObj } from "@/utils/consts";
import type {
  DailyData,
  HourlyData,
  PrecipitationUnit,
  TemperatureUnit,
  WindspeedUnit,
} from "@/types/weather";
import type { ApiResponseWeather } from "@/types/api";
import { correctWeatherIcon, correctWeatherTitle } from "@/utils/correct-weather-data";

const {
  lang,
  coords,
  temperatureUnitForRequest,
  windspeedUnitForRequest,
  precipitationUnitForRequest,
} = defineProps<{
  lang: Locale;
  coords: { lat: string; lon: string; displayName: string };
  temperatureUnitForRequest: TemperatureUnit;
  windspeedUnitForRequest: WindspeedUnit;
  precipitationUnitForRequest: PrecipitationUnit;
}>();
const hoursNow = ref(0);
const day = ref("");
const dayNum = ref(0);
const month = ref("");
const year = ref(0);
const tNow = ref<number | null>(null);
const feelsLikeNow = ref<number | null>(null);
const humidityNow = ref<number | null>(null);
const windNow = ref<number | null>(null);
const precipitationNow = ref<number | null>(null);
const tUnit = ref("");
const windspeedUnit = ref("");
const precipitationUnit = ref("");
const daily = ref<DailyData>();
const hourly = ref<HourlyData>();
const iconSrcCurrent = ref("");
const iconTitleCurrent = ref("");

function computeDate() {
  const date = new Date();
  day.value = weekdayObj[lang][(date.getDay() + 6) % 7] ?? "Ошибка";
  dayNum.value = date.getDate();
  const defaultMonthName = monthObj[lang][date.getMonth()] ?? "Ошибка";

  if (lang == "ru") {
    month.value = defaultMonthName == "март" ? "марта" : defaultMonthName.slice(0, -1) + "я";
  } else {
    month.value = defaultMonthName;
  }

  year.value = date.getFullYear();
}

const todayStr = computed(() => {
  computeDate();
  return lang == "ru"
    ? `${dayNum.value} ${month.value} ${year.value}, ${day.value}`
    : `${day.value}, ${month.value} ${dayNum.value}, ${year.value}`;
});

function isApiResponse(data: unknown): data is ApiResponseWeather {
  if (typeof data != "object" || data == null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    obj.daily != null &&
    typeof obj.daily == "object" &&
    obj.daily_units != null &&
    typeof obj.daily_units == "object" &&
    typeof obj.elevation == "number" &&
    typeof obj.generationtime_ms == "number" &&
    obj.hourly != null &&
    typeof obj.hourly == "object" &&
    obj.hourly_units != null &&
    typeof obj.hourly_units == "object" &&
    typeof obj.latitude == "number" &&
    typeof obj.longitude == "number" &&
    typeof obj.timezone == "string" &&
    typeof obj.timezone_abbreviation == "string" &&
    typeof obj.utc_offset_seconds == "number"
  );
}

async function getWeather(lat: string, lon: string): Promise<ApiResponseWeather> {
  try {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&
hourly=temperature_2m,weathercode,apparent_temperature,relative_humidity_2m,windspeed_10m,precipitation&
daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&
timezone=auto&
temperature_unit=${temperatureUnitForRequest}&
windspeed_unit=${windspeedUnitForRequest}&
precipitation_unit=${precipitationUnitForRequest}`
    );
    const weatherData: unknown = await weatherRes.json();

    if (!isApiResponse(weatherData)) {
      throw new Error("Получены невалидные данные от api");
    }

    console.log(weatherData);
    return weatherData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
}

async function showWeather(lat: string, lon: string) {
  const weather = await getWeather(lat, lon);

  const date = new Date();
  hoursNow.value = date.getHours();

  tNow.value = weather.hourly.temperature_2m[hoursNow.value] ?? null;
  tUnit.value = weather.hourly_units.temperature_2m.slice(0, 1);
  feelsLikeNow.value = weather.hourly.apparent_temperature[hoursNow.value] ?? null;
  humidityNow.value = weather.hourly.relative_humidity_2m[hoursNow.value] ?? null;
  windNow.value = weather.hourly.windspeed_10m[hoursNow.value] ?? null;
  windspeedUnit.value = weather.hourly_units.windspeed_10m;
  precipitationNow.value = weather.hourly.precipitation[hoursNow.value] ?? null;
  precipitationUnit.value = weather.hourly_units.precipitation;
  daily.value = weather.daily;
  hourly.value = weather.hourly;

  iconSrcCurrent.value = correctWeatherIcon(hoursNow.value, hourly.value);
  iconTitleCurrent.value = correctWeatherTitle(hoursNow.value, hourly.value, lang);
}

const dailyEmpty: DailyData = {
  precipitation_sum: [null, null, null, null, null, null, null],
  temperature_2m_max: [null, null, null, null, null, null, null],
  temperature_2m_min: [null, null, null, null, null, null, null],
  time: [null, null, null, null, null, null, null],
  weathercode: [null, null, null, null, null, null, null],
  windspeed_10m_max: [null, null, null, null, null, null, null],
};

const hourlyEmpty: HourlyData = {
  apparent_temperature: [null, null, null, null, null, null, null, null, null],
  precipitation: [null, null, null, null, null, null, null, null, null],
  relative_humidity_2m: [null, null, null, null, null, null, null, null, null],
  temperature_2m: [null, null, null, null, null, null, null, null, null],
  time: [null, null, null, null, null, null, null, null, null],
  weathercode: [null, null, null, null, null, null, null, null, null],
  windspeed_10m: [null, null, null, null, null, null, null, null, null],
};

const dailySafe = computed(() => {
  return daily.value ?? dailyEmpty;
});

const hourlySafe = computed(() => {
  return hourly.value ?? hourlyEmpty;
});

watch(
  () => [coords, temperatureUnitForRequest, windspeedUnitForRequest, precipitationUnitForRequest],
  () => {
    showWeather(coords.lat, coords.lon);
  },
  { deep: true }
);

// onMounted(async () => {
//   await showWeather();
// });
</script>

<template>
  <div class="weather">
    <div class="container weather__container">
      <div class="weather__items">
        <div class="weather__part weather__part--big">
          <WeatherCurrent
            class="weather__current"
            :t="tNow"
            :tUnit="tUnit"
            :todayStr="todayStr"
            :displayName="coords.displayName"
            :iconSrc="iconSrcCurrent"
            :iconTitle="iconTitleCurrent"
          />
          <WeatherStats
            :feelsLike="feelsLikeNow"
            :humidity="humidityNow"
            :wind="windNow"
            :precipitation="precipitationNow"
            :tUnit="tUnit"
            :windspeedUnit="windspeedUnit"
            :precipitationUnit="precipitationUnit"
            :lang="lang"
            class="weather__stats"
          />
          <WeatherDaily class="weather__daily" :lang="lang" :daily="dailySafe" :tUnit="tUnit" />
        </div>
        <!-- /weather__part--big -->
        <div class="weather__part weather__part--small">
          <WeatherHourly
            class="weather__hourly"
            :lang="lang"
            :hoursNow="hoursNow"
            :hourly="hourlySafe"
            :tUnit="tUnit"
          />
        </div>
        <!-- /weather__part--small -->
      </div>
      <!-- /weather__items -->
    </div>
    <!-- /container -->
  </div>
</template>

<style scoped lang="scss">
.weather {
  margin-top: 48px;

  &__items {
    display: flex;
    justify-content: space-between;
    gap: 32px;

    @media (max-width: 1149.98px) {
      flex-direction: column;
    }
  }

  &__current {
    @media (max-width: 1149.98px) {
      border-radius: 20px;
    }
  }

  &__part {
    border-radius: 20px;

    &--big {
      max-width: 800px;
      min-width: 800px;
      padding: 0px;
      height: 100%;

      @media (max-width: 1149.98px) {
        max-width: 100%;
        min-width: revert;
      }
    }

    &--small {
      flex-grow: 1;
      padding: 30px 24px 20px 24px;
      background-color: var(--bgc-dark);
    }
  }
}
</style>

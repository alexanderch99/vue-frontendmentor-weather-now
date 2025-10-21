<script setup lang="ts">
import { ref } from "vue";
import FooterMain from "./components/FooterMain.vue";
import HeaderMain from "./components/HeaderMain.vue";
import SearchForm from "./components/SearchForm.vue";
import SiteTitle from "./components/SiteTitle.vue";
import WeatherMain from "./components/WeatherMain.vue";
import type { Locale } from "./types/locale";
import type { WindspeedUnit, PrecipitationUnit, TemperatureUnit } from "./types/weather";

// import DropdownMain from "./components/UI/DropdownMain.vue";
// import DropdownForm from "./components/UI/DropdownForm.vue";
// import DropdownRadioInput from "./components/UI/DropdownRadioInput.vue";
// import { weekdayObj } from "./utils/consts";

const siteSettings = {
  lang: <Locale>localStorage.getItem("lang") || "ru",
  temperatureUnitForRequest: <TemperatureUnit>localStorage.getItem("tUnit") || "celsius",
  windspeedUnitForRequest: <WindspeedUnit>localStorage.getItem("wind") || "ms",
  precipitationUnitForRequest: <PrecipitationUnit>localStorage.getItem("precipitation") || "mm",
};

const lang = ref<Locale>(siteSettings.lang);
const temperatureUnitForRequest = ref<TemperatureUnit>(siteSettings.temperatureUnitForRequest);
const windspeedUnitForRequest = ref<WindspeedUnit>(siteSettings.windspeedUnitForRequest);
const precipitationUnitForRequest = ref<PrecipitationUnit>(
  siteSettings.precipitationUnitForRequest
);

function changeLang(newUnit: Locale) {
  lang.value = newUnit;
  localStorage.setItem("lang", newUnit);
}

function changeTUnit(newUnit: TemperatureUnit) {
  temperatureUnitForRequest.value = newUnit;
  localStorage.setItem("tUnit", newUnit);
}

function changeWindspeedUnit(newUnit: WindspeedUnit) {
  windspeedUnitForRequest.value = newUnit;
  localStorage.setItem("wind", newUnit);
}

function changePrecipitationUnit(newUnit: PrecipitationUnit) {
  precipitationUnitForRequest.value = newUnit;
  localStorage.setItem("precipitation", newUnit);
}

const coords = ref({
  lat: "",
  lon: "",
  displayName: "",
});

function search(lat: string, lon: string, slicedName: string) {
  coords.value.lat = lat;
  coords.value.lon = lon;
  coords.value.displayName = slicedName;
}
</script>

<template>
  <HeaderMain
    :lang="lang"
    :temperatureUnitForRequest="temperatureUnitForRequest"
    :windspeedUnitForRequest="windspeedUnitForRequest"
    :precipitationUnitForRequest="precipitationUnitForRequest"
    @changeLang="changeLang"
    @changeTUnit="changeTUnit"
    @changeWindspeedUnit="changeWindspeedUnit"
    @changePrecipitationUnit="changePrecipitationUnit"
  />
  <SiteTitle class="site-title" :lang="lang" />
  <main class="main">
    <SearchForm class="search-form" :lang="lang" @search="search" />
    <WeatherMain
      :lang
      :coords
      :temperatureUnitForRequest
      :windspeedUnitForRequest
      :precipitationUnitForRequest
    />
  </main>
  <FooterMain />
</template>

<style scoped>
.site-title {
  margin: 64px 0px;
}
</style>

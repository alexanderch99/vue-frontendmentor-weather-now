<script setup lang="ts">
import type { Locale } from "@/types/locale";
import translations from "@/utils/translations";
import DropdownMain from "./UI/DropdownMain.vue";
import DropdownForm from "./UI/DropdownForm.vue";
import DropdownRadioInput from "./DropdownRadioInput.vue";
import DropdownHeading from "./UI/DropdownHeading.vue";
import { computed, ref, useTemplateRef, watch } from "vue";
import { langMap } from "@/utils/consts";
import type { PrecipitationUnit, TemperatureUnit, WindspeedUnit } from "@/types/weather";
import { useClickOutside } from "@/composables/click-outside";

const emit = defineEmits<{
  changeLang: [newLang: Locale];
  changeTUnit: [newUnit: TemperatureUnit];
  changeWindspeedUnit: [newUnit: WindspeedUnit];
  changePrecipitationUnit: [newUnit: PrecipitationUnit];
}>();

const { lang, temperatureUnitForRequest, windspeedUnitForRequest, precipitationUnitForRequest } =
  defineProps<{
    lang: Locale;
    temperatureUnitForRequest: TemperatureUnit;
    windspeedUnitForRequest: WindspeedUnit;
    precipitationUnitForRequest: PrecipitationUnit;
  }>();

const isSettingsVisible = ref(false);

const pKey = computed((): PrecipitationUnit => {
  const result: unknown = precipitationUnitForRequest + "Full";

  if (result == "mmFull") {
    return "mmFull";
  } else if (result == "inchFull") {
    return "inchFull";
  } else {
    return "mmFull";
  }
});

const settingsBtn = useTemplateRef("settings-btn");
function cancelSettings() {
  isSettingsVisible.value = false;
}
useClickOutside(settingsBtn, cancelSettings);

const langFull = ref(langMap[lang]);
const tUnitFull = ref(translations[temperatureUnitForRequest][lang]);
const windspeedUnitFull = ref(translations[windspeedUnitForRequest][lang]);
const precipitationUnitFull = ref(translations[pKey.value][lang]);

watch(
  () => lang,
  () => {
    langFull.value = langMap[lang];
    tUnitFull.value = translations[temperatureUnitForRequest][lang];
    windspeedUnitFull.value = translations[windspeedUnitForRequest][lang];
    precipitationUnitFull.value = translations[pKey.value][lang];
  }
);

watch(
  () => langFull.value,
  (newValue, oldValue) => {
    if (newValue == langMap["ru"]) {
      emit("changeLang", "ru");
    } else if (newValue == langMap["en"]) {
      emit("changeLang", "en");
    } else {
      return oldValue;
    }
  }
);

watch(
  () => tUnitFull.value,
  (newValue, oldValue) => {
    if (newValue == translations["celsius"][lang]) {
      emit("changeTUnit", "celsius");
    } else if (newValue == translations["fahrenheit"][lang]) {
      emit("changeTUnit", "fahrenheit");
    } else {
      return oldValue;
    }
  }
);

watch(
  () => windspeedUnitFull.value,
  (newValue, oldValue) => {
    if (newValue == translations["ms"][lang]) {
      emit("changeWindspeedUnit", "ms");
    } else if (newValue == translations["mph"][lang]) {
      emit("changeWindspeedUnit", "mph");
    } else {
      return oldValue;
    }
  }
);

watch(
  () => precipitationUnitFull.value,
  (newValue, oldValue) => {
    if (newValue == translations["mmFull"][lang]) {
      emit("changePrecipitationUnit", "mm");
    } else if (newValue == translations["inchFull"][lang]) {
      emit("changePrecipitationUnit", "inch");
    } else {
      return oldValue;
    }
  }
);
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__items">
        <div class="logo header__logo">
          <div class="logo__img">
            <img src="@/assets/images/logo.svg" alt="logo" />
          </div>
        </div>
        <div
          class="units text text-s"
          @click="isSettingsVisible = !isSettingsVisible"
          ref="settings-btn"
        >
          <img class="units__img units__units" src="@/assets/images/icon-units.svg" alt="units" />
          <div class="units__text text text-s">{{ translations.units[lang] }}</div>
          <img
            class="units__img"
            src="@/assets/images/icon-dropdown.svg"
            alt="dropdown"
            :style="{ transform: isSettingsVisible ? 'rotate(180deg)' : 'rotate(0deg)' }"
          />
          <DropdownMain v-if="isSettingsVisible" @click.stop class="units__dropdown">
            <DropdownHeading>Язык / Language</DropdownHeading>
            <DropdownForm>
              <DropdownRadioInput
                class="units__radio-input"
                input-name="lang"
                input-id="ru"
                :value="langMap.ru"
                v-model="langFull"
              />
              <DropdownRadioInput
                class="units__radio-input"
                input-name="lang"
                input-id="en"
                :value="langMap.en"
                v-model="langFull"
              />
            </DropdownForm>
            <DropdownHeading class="dropdown-bt">{{ translations.t[lang] }}</DropdownHeading>
            <DropdownForm>
              <DropdownRadioInput
                class="units__radio-input"
                input-name="t"
                input-id="celsuis"
                :value="translations.celsius[lang]"
                v-model="tUnitFull" />
              <DropdownRadioInput
                class="units__radio-input"
                input-name="t"
                input-id="fahrenheit"
                :value="translations.fahrenheit[lang]"
                v-model="tUnitFull"
            /></DropdownForm>
            <DropdownHeading class="dropdown-bt">{{ translations.wind[lang] }}</DropdownHeading>
            <DropdownForm>
              <DropdownRadioInput
                class="units__radio-input"
                input-name="wind"
                input-id="ms"
                :value="translations.ms[lang]"
                v-model="windspeedUnitFull" />
              <DropdownRadioInput
                class="units__radio-input"
                input-name="wind"
                input-id="mph"
                :value="translations.mph[lang]"
                v-model="windspeedUnitFull"
            /></DropdownForm>
            <DropdownHeading class="dropdown-bt">{{
              translations.precipitation[lang]
            }}</DropdownHeading>
            <DropdownForm>
              <DropdownRadioInput
                class="units__radio-input"
                input-name="precipitation"
                input-id="mm"
                :value="translations.mmFull[lang]"
                v-model="precipitationUnitFull" />
              <DropdownRadioInput
                class="units__radio-input"
                input-name="precipitation"
                input-id="inch"
                :value="translations.inchFull[lang]"
                v-model="precipitationUnitFull"
            /></DropdownForm>
          </DropdownMain>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding-top: 48px;

  @media (max-width: 399.98px) {
    &__logo,
    &__logo img {
      width: 80%;
      height: 80%;
    }
  }

  &__items {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.units {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background-color: var(--bgc-dark);
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  z-index: 2;

  @media (max-width: 649.98px) {
    padding: 10px;
  }

  &__dropdown {
    position: absolute;
    top: 50px;
    width: 280px;
    right: 0;
  }
}

:global(.units .dropdown-radio-input__input:checked + .dropdown-radio-input__text) {
  position: relative;
}

:global(.units .dropdown-radio-input__input:checked + .dropdown-radio-input__text::before) {
  position: absolute;
  content: "";
  background-image: url("@/assets/images/icon-checkmark.svg");
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 14px;
  height: 11px;
  background-repeat: no-repeat;
}
</style>

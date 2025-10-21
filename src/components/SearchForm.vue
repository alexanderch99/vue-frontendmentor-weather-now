<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Locale } from "@/types/locale";
import ButtonMain from "./UI/ButtonMain.vue";
import InputMain from "./UI/InputMain.vue";
import translations from "@/utils/translations";
import DropdownMain from "./UI/DropdownMain.vue";
import DropdownForm from "./UI/DropdownForm.vue";
import DropdownRadioInput from "./DropdownRadioInput.vue";
import type { ApiResponseCity } from "@/types/api";
import { MOSCOW } from "@/utils/consts";
import sliceCityName from "@/utils/slice-city-name";
import LoaderRound from "./UI/LoaderRound.vue";
import iconSearch from "@/assets/images/icon-search.svg";

const { lang } = defineProps<{
  lang: Locale;
}>();

const emit = defineEmits<{
  (e: "search", lat: string, lon: string, slicedName: string): void;
}>();

const request = ref("");
const response = ref<ApiResponseCity[]>([]);

const isCitySearching = ref(false);

async function getCity(): Promise<void> {
  if (!request.value.length) return;
  isCitySearching.value = true;
  try {
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${request.value}`
    );
    const geoData: ApiResponseCity[] = await geoRes.json();
    response.value = geoData;
  } catch (error) {
    throw new Error(String(error));
  } finally {
    isCitySearching.value = false;
  }
}

function showWeather(id: number) {
  const city = response.value.find((el) => el.place_id == id);

  if (city) {
    const { lat, lon, display_name, place_id } = city;
    const latestSearch = {
      lat,
      lon,
      display_name,
      place_id,
    };
    localStorage.setItem("latestSearch", JSON.stringify(latestSearch));
    emit("search", lat, lon, sliceCityName(display_name));
    response.value = [];
    request.value = "";
  } else {
    if (!localStorage.getItem("latestSearch")) {
      emit("search", MOSCOW.lat, MOSCOW.lon, MOSCOW.displayName);
    } else {
      const { lat, lon, display_name } = JSON.parse(localStorage.getItem("latestSearch") as string);
      emit("search", lat, lon, sliceCityName(display_name));
    }
  }
}

function resetForm() {
  request.value = "";
  response.value = [];
}

onMounted(async () => {
  if (!request.value && !localStorage.getItem("latestSearch")) {
    showWeather(MOSCOW.id);
  } else {
    showWeather(0);
  }
});
</script>

<template>
  <div class="container">
    <form action="#" class="form" @submit.prevent>
      <div class="form__search">
        <img class="icon-search" :src="iconSearch" alt="" />
        <div v-if="response.length" class="form__reset" @click="resetForm">&times;</div>
        <InputMain
          class="form__item form__input"
          :placeholder="translations.inputPlaceholder[lang]"
          v-model="request"
        />
        <div v-if="isCitySearching" class="searching">
          <LoaderRound />
          <span class="searching__text text text-s">{{ translations.searching[lang] }}</span>
        </div>
        <DropdownMain v-if="response && response.length" class="form__dropdown">
          <DropdownForm>
            <DropdownRadioInput
              v-for="city in response"
              :key="String(city.place_id)"
              input-name="city"
              :input-id="String(city.place_id)"
              :value="city.display_name"
              @change="showWeather(city.place_id)"
            />
          </DropdownForm>
        </DropdownMain>
      </div>
      <ButtonMain class="form__item form__submit" @click="getCity">{{
        translations.searchButton[lang]
      }}</ButtonMain>
    </form>
  </div>
</template>

<style scoped lang="scss">
.icon-search {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
}

.searching {
  position: absolute;
  right: 0;
  left: 0;
  margin-top: 8px;
  background-color: #1f1e25;
  height: 55px;
  border-radius: 20px;

  display: flex;
  align-items: center;
  padding: 0px 24px;

  &__text {
    margin-left: 10px;
  }
}

.form {
  max-width: 656px;
  margin-inline: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  @media (max-width: 649.98px) {
    flex-direction: column;
    justify-content: flex-start;
  }

  &__reset {
    position: absolute;
    z-index: 1;
    font-size: 36px;
    line-height: 36px;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &__search {
    position: relative;
    flex-grow: 1;

    @media (max-width: 649.98px) {
      width: 100%;
    }
  }

  &__dropdown {
    position: absolute;
    right: 0;
    left: 0;
    margin-top: 8px;
  }

  &__item {
    height: 56px;
    flex-shrink: 0;
    font-size: 20px;
    line-height: 20px;

    @media (max-width: 649.98px) {
      width: 100%;
    }
  }

  &__input {
    position: relative;
    width: 100%;
    padding: 0px 50px;
  }
}
</style>

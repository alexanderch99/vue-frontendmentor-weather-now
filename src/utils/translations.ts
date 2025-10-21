import type { Locale } from "@/types/locale";

type Translations = Record<string, Record<Locale, string>>;

export default {
  units: {
    ru: "Настройки",
    en: "Units",
  },
  mainHeading: {
    ru: "Какая сегодня погода?",
    en: "How’s the sky looking today?",
  },
  inputPlaceholder: {
    ru: "Поиск места...",
    en: "Search for a place...",
  },
  searchButton: {
    ru: "Поиск",
    en: "Search",
  },
  t: {
    ru: "Температура",
    en: "Temperature",
  },
  feelsLike: {
    ru: "Ощущается",
    en: "Feels like",
  },
  humidity: {
    ru: "Влажность",
    en: "Humidity",
  },
  wind: {
    ru: "Ветер",
    en: "Wind",
  },
  precipitation: {
    ru: "Осадки",
    en: "Precipitation",
  },
  daily: {
    ru: "Посуточный прогноз",
    en: "Daily forecasts",
  },
  hourly: {
    ru: "Почасовой прогноз",
    en: "Hourly forecast",
  },
  ms: {
    ru: "м/c",
    en: "m/s",
  },
  mph: {
    ru: "миль/ч",
    en: "mp/h",
  },
  mm: {
    ru: "мм",
    en: "mm",
  },
  inch: {
    ru: "д",
    en: "in",
  },
  mmFull: {
    ru: "Миллиметры (мм)",
    en: "Millimeters (mm)",
  },
  inchFull: {
    ru: "Дюймы (д)",
    en: "Inches (in)",
  },
  celsius: {
    ru: "Цельсий (°C)",
    en: "Celsius (°C)",
  },
  fahrenheit: {
    ru: "Фаренгейт (°F)",
    en: "Fahrenheit (°F)",
  },
  searching: {
    ru: "Поиск...",
    en: "Search in progress...",
  },
} satisfies Translations;

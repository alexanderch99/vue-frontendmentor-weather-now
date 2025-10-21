import { WeatherCodeObj, type WeatherCode, type WeatherDescription } from "@/types/weather";

export const weatherCodeMap: Record<WeatherCode, WeatherDescription> = {
  [WeatherCodeObj.Clear]: { ru: "ясно", en: "clear sky", icon: "icon-sunny" },
  [WeatherCodeObj.MainlyClear]: { ru: "в основном ясно", en: "mainly clear", icon: "icon-sunny" },
  [WeatherCodeObj.PartlyCloudy]: {
    ru: "переменная облачность",
    en: "partly cloudy",
    icon: "icon-partly-cloudy",
  },
  [WeatherCodeObj.Overcast]: { ru: "облачно", en: "overcast", icon: "icon-overcast" },
  [WeatherCodeObj.Fog]: { ru: "туман", en: "fog", icon: "icon-fog" },
  [WeatherCodeObj.RimeFog]: { ru: "туман (изморозь)", en: "depositing rime fog", icon: "icon-fog" },
  [WeatherCodeObj.DrizzleLight]: {
    ru: "морось (слабая)",
    en: "light drizzle",
    icon: "icon-drizzle",
  },
  [WeatherCodeObj.DrizzleModerate]: {
    ru: "морось (умеренная)",
    en: "moderate drizzle",
    icon: "icon-drizzle",
  },
  [WeatherCodeObj.DrizzleDense]: {
    ru: "морось (сильная)",
    en: "dense drizzle",
    icon: "icon-drizzle",
  },
  [WeatherCodeObj.FreezingDrizzleLight]: {
    ru: "ледяная морось (слабая)",
    en: "light freezing drizzle",
    icon: "icon-drizzle",
  },
  [WeatherCodeObj.FreezingDrizzleDense]: {
    ru: "ледяная морось (сильная)",
    en: "dense freezing drizzle",
    icon: "icon-drizzle",
  },
  [WeatherCodeObj.RainSlight]: { ru: "дождь (слабый)", en: "slight rain", icon: "icon-rain" },
  [WeatherCodeObj.RainModerate]: {
    ru: "дождь (умеренный)",
    en: "moderate rain",
    icon: "icon-rain",
  },
  [WeatherCodeObj.RainHeavy]: { ru: "дождь (сильный)", en: "heavy rain", icon: "icon-rain" },
  [WeatherCodeObj.FreezingRainLight]: {
    ru: "ледяной дождь (слабый)",
    en: "light freezing rain",
    icon: "icon-rain",
  },
  [WeatherCodeObj.FreezingRainHeavy]: {
    ru: "ледяной дождь (сильный)",
    en: "heavy freezing rain",
    icon: "icon-rain",
  },
  [WeatherCodeObj.SnowSlight]: { ru: "снег (слабый)", en: "slight snow fall", icon: "icon-snow" },
  [WeatherCodeObj.SnowModerate]: {
    ru: "снег (умеренный)",
    en: "moderate snow fall",
    icon: "icon-snow",
  },
  [WeatherCodeObj.SnowHeavy]: { ru: "снег (сильный)", en: "heavy snow fall", icon: "icon-snow" },
  [WeatherCodeObj.SnowGrains]: { ru: "снежные зёрна", en: "snow grains", icon: "icon-snow" },
  [WeatherCodeObj.RainShowersSlight]: {
    ru: "ливень (слабый)",
    en: "slight rain showers",
    icon: "icon-rain",
  },
  [WeatherCodeObj.RainShowersModerate]: {
    ru: "ливень (умеренный)",
    en: "moderate rain showers",
    icon: "icon-rain",
  },
  [WeatherCodeObj.RainShowersViolent]: {
    ru: "ливень (сильный)",
    en: "violent rain showers",
    icon: "icon-rain",
  },
  [WeatherCodeObj.SnowShowersSlight]: {
    ru: "снежный ливень (слабый)",
    en: "slight snow showers",
    icon: "icon-snow",
  },
  [WeatherCodeObj.SnowShowersHeavy]: {
    ru: "снежный ливень (сильный)",
    en: "heavy snow showers",
    icon: "icon-snow",
  },
  [WeatherCodeObj.Thunderstorm]: { ru: "гроза", en: "thunderstorm", icon: "icon-storm" },
  [WeatherCodeObj.ThunderstormWithSlightHail]: {
    ru: "гроза с небольшим градом",
    en: "thunderstorm with slight hail",
    icon: "icon-storm",
  },
  [WeatherCodeObj.ThunderstormWithHeavyHail]: {
    ru: "гроза с сильным градом",
    en: "thunderstorm with heavy hail",
    icon: "icon-storm",
  },
} as const;

export const weekdayObj = {
  ru: ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"],
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
} as const;

export const weekdayShortObj = {
  ru: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
} as const;

export const monthObj = {
  ru: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
} as const;

export const MOSCOW = {
  lat: "55.625578",
  lon: "37.6063916",
  displayName: "Москва, Центральный федеральный округ, Россия",
  id: 406283398,
} as const;

export const langMap = {
  ru: "Русский (Russian)",
  en: "Английский (English)",
} as const;

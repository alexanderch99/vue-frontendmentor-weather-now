import type { DailyData, HourlyData } from "@/types/weather";
import { weatherCodeMap } from "./consts";
import type { Locale } from "@/types/locale";

export const correctWeatherIcon = function (index: number, data: DailyData | HourlyData): string {
  const weatherCode = data.weathercode[index];
  if (weatherCode != null) {
    return weatherCodeMap[weatherCode].icon;
  }
  return "";
};

export const correctWeatherTitle = function (
  index: number,
  data: DailyData | HourlyData,
  lang: Locale
): string {
  const weatherCode = data.weathercode[index];
  if (weatherCode != null) {
    return weatherCodeMap[weatherCode][lang];
  }
  return "";
};

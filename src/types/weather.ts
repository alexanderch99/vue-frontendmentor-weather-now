export interface DailyData {
  precipitation_sum: number[] | null[];
  temperature_2m_max: number[] | null[];
  temperature_2m_min: number[] | null[];
  time: string[] | null[];
  weathercode: WeatherCode[] | null[];
  windspeed_10m_max: number[] | null[];
}

export type DailyUnits = Record<keyof DailyData, string>;

export interface HourlyData {
  apparent_temperature: number[] | null[];
  precipitation: number[] | null[];
  relative_humidity_2m: number[] | null[];
  temperature_2m: number[] | null[];
  time: string[] | null[];
  weathercode: WeatherCode[] | null[];
  windspeed_10m: number[] | null[];
}

export type HourlyUnits = Record<keyof HourlyData, string>;

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindspeedUnit = "ms" | "mph";
export type PrecipitationUnit = "mm" | "inch" | "mmFull" | "inchFull";

export const WeatherCodeObj = {
  Clear: 0,
  MainlyClear: 1,
  PartlyCloudy: 2,
  Overcast: 3,
  Fog: 45,
  RimeFog: 48,
  DrizzleLight: 51,
  DrizzleModerate: 53,
  DrizzleDense: 55,
  FreezingDrizzleLight: 56,
  FreezingDrizzleDense: 57,
  RainSlight: 61,
  RainModerate: 63,
  RainHeavy: 65,
  FreezingRainLight: 66,
  FreezingRainHeavy: 67,
  SnowSlight: 71,
  SnowModerate: 73,
  SnowHeavy: 75,
  SnowGrains: 77,
  RainShowersSlight: 80,
  RainShowersModerate: 81,
  RainShowersViolent: 82,
  SnowShowersSlight: 85,
  SnowShowersHeavy: 86,
  Thunderstorm: 95,
  ThunderstormWithSlightHail: 96,
  ThunderstormWithHeavyHail: 99,
} as const;

export type WeatherCode = (typeof WeatherCodeObj)[keyof typeof WeatherCodeObj];

export interface WeatherDescription {
  ru: string;
  en: string;
  icon: string;
}

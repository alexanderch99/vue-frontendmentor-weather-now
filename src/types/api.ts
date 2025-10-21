import type { DailyData, DailyUnits, HourlyData, HourlyUnits } from "@/types/weather";

export interface ApiResponseWeather {
  daily: DailyData;
  daily_units: DailyUnits;
  elevation: number;
  generationtime_ms: number;
  hourly: HourlyData;
  hourly_units: HourlyUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export interface ApiResponseCity {
  addresstype: string;
  boundingbox: string[];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
}

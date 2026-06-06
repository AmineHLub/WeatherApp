import axios from "axios";
import type {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  WeatherLocation,
} from "../types/weather.types";

const baseURL = "https://api.weather-ai.co/v1";

const axiosInstanceGen = (token: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};

let readyInstance: ReturnType<typeof axiosInstanceGen> | null = null;


let weatherDataCache: Promise<{
  location: WeatherLocation;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}> | null = null;

export const getWeatherData = (
  token: string,
  lat: number,
  lon: number,
): Promise<{
  location: WeatherLocation;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
} | null> => {
  if (weatherDataCache) {
    return weatherDataCache;  // same Promise reference ✓
  }
  if (!readyInstance) {
    readyInstance = axiosInstanceGen(token);
  }
  const instance = readyInstance;
  weatherDataCache = instance
    .get("/weather", { params: { lat, lon } })
    .then((res) => res.data)
  return weatherDataCache;
};
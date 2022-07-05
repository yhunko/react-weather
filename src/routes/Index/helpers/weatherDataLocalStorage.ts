import { WeatherDataType } from "src/@types";

const WEATHER_DATA_STORAGE_KEY = "WEATHER_DATA";
const CITIES_IMAGES_STORAGE_KEY = "CITIES_IMAGES";

const getFromLocalStorage = (key: string, defaultValue: any) => {
  const data = window.localStorage.getItem(key);

  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return defaultValue;
    }
  }

  return defaultValue;
};

export const saveWeatherData = (data: any[]) => {
  window.localStorage.setItem(WEATHER_DATA_STORAGE_KEY, JSON.stringify(data));
};

export const getWeatherData = (): WeatherDataType[] =>
  getFromLocalStorage(WEATHER_DATA_STORAGE_KEY, []);

export const saveCitiesImagesData = (data: any) => {
  window.localStorage.setItem(CITIES_IMAGES_STORAGE_KEY, JSON.stringify(data));
};

export const getCitiesImagesData = () =>
  getFromLocalStorage(CITIES_IMAGES_STORAGE_KEY, {});

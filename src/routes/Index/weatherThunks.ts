import { createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherDataType } from "src/@types";
import { axiosInstance, unsplashAxiosInstance } from "src/lib";

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// eslint-disable-next-line import/prefer-default-export
export const fetchWeatherDataByCityName = createAsyncThunk<
  {
    weatherData: WeatherDataType;
    cityImage: string;
  },
  string
>("weatherData/fetch/byCityName", async (cityName) => {
  const weatherDataResponse = await axiosInstance.get<WeatherDataType>(
    `/weather?q=${cityName}&units=metric`
  );
  const weatherDataCityName = weatherDataResponse.data?.name;
  const cityImageResponse = await unsplashAxiosInstance.get<any>(
    `/search/photos?query=${weatherDataCityName}`
  );
  const results = cityImageResponse.data?.results;
  const imageUrl =
    results?.[getRandomNumber(0, results.length - 1)]?.urls?.regular;

  return {
    weatherData: weatherDataResponse.data,
    cityImage: imageUrl,
  };
});

export const fetchWeatherDataByCityId = createAsyncThunk<
  WeatherDataType,
  number
>("weatherData/fetch/byCityId", async (cityId) => {
  const response = await axiosInstance.get(
    `/weather?id=${cityId}&units=metric`
  );

  return response.data;
});

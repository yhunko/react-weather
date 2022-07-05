import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherDataType } from "src/@types";
import {
  getCitiesImagesData,
  getWeatherData,
} from "src/routes/Index/helpers/weatherDataLocalStorage";
import {
  fetchWeatherDataByCityId,
  fetchWeatherDataByCityName,
} from "src/routes/Index/weatherThunks";

const initialState: {
  searchCity: string;
  weatherData: WeatherDataType[];
  citiesImages: Record<number, string>;
} = {
  weatherData: getWeatherData(),
  searchCity: "",
  citiesImages: getCitiesImagesData(),
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCitySearch: (state, action: PayloadAction<string>) => ({
      ...state,
      searchCity: action.payload,
    }),
    deleteCity: (state, { payload }: PayloadAction<number>) => {
      state.weatherData = state.weatherData.filter(
        (item) => item.id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchWeatherDataByCityName.fulfilled,
      (state, { payload: { cityImage, weatherData } }) => {
        const cityAlreadyExists = state.weatherData.find(
          (item) => item.id === weatherData.id
        );

        if (cityAlreadyExists) return { ...state, searchCity: "" };

        return {
          ...state,
          citiesImages: {
            ...state.citiesImages,
            [weatherData.id]: cityImage,
          },
          weatherData: [...state.weatherData, weatherData],
          searchCity: "",
        };
      }
    );

    builder.addCase(
      fetchWeatherDataByCityId.fulfilled,
      (state, { payload }) => {
        const cityIndex = state.weatherData.findIndex(
          (item) => item.id === payload.id
        );

        if (cityIndex > -1) {
          state.weatherData[cityIndex] = payload;
        }
      }
    );
  },
});

export default weatherSlice;

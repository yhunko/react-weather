import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash.throttle";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  saveCitiesImagesData,
  saveWeatherData,
} from "src/routes/Index/helpers/weatherDataLocalStorage";
import weatherSlice from "src/routes/Index/weatherSlice";

const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer,
  },
});

store.subscribe(
  throttle(() => {
    const { weatherData, citiesImages } = store.getState().weather;

    saveWeatherData(weatherData);
    saveCitiesImagesData(citiesImages);
  }, 2000)
);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

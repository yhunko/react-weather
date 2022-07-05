import axios from "axios";

const { REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY } =
  process.env;

const axiosInstance = axios.create({
  baseURL: REACT_APP_WEATHER_API_BASE_URL,
  params: {
    appid: REACT_APP_WEATHER_API_KEY,
  },
});

export default axiosInstance;

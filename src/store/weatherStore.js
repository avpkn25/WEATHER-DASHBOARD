import { create } from 'zustand';
import axios from 'axios';

const API_KEY = '00ed8033f41d25a3b4634e37e429affa'; // Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const useWeatherStore = create((set) => ({
  currentWeather: null,
  hourlyForecast: [],
  weeklyForecast: [],
  loading: false,
  error: null,
  unit: 'celsius',

  setUnit: (unit) => set({ unit }),

  fetchWeather: async (city) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
      set({ currentWeather: response.data });
      
      // Fetch forecast data
      const forecastResponse = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      set({ 
        hourlyForecast: forecastResponse.data.list.slice(0, 24),
        weeklyForecast: forecastResponse.data.list.filter((item, index) => index % 8 === 0)
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchWeatherByLocation: async (lat, lon) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      set({ currentWeather: response.data });
      
      const forecastResponse = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      set({ 
        hourlyForecast: forecastResponse.data.list.slice(0, 24),
        weeklyForecast: forecastResponse.data.list.filter((item, index) => index % 8 === 0)
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));

export default useWeatherStore;
import React from 'react';
import useWeatherStore from '../store/weatherStore';
import { Sun, Cloud, CloudRain, Moon, Droplets, Wind, Gauge } from 'lucide-react';

const CurrentWeather = () => {
  const { currentWeather, unit } = useWeatherStore();

  if (!currentWeather) return null;

  const getWeatherIcon = (weatherCode) => {
    const iconClass = "w-20 h-20";
    switch (weatherCode) {
      case '01d': return <Sun className={`${iconClass} text-weather-sunny`} />;
      case '01n': return <Moon className={`${iconClass} text-weather-night`} />;
      case '02d':
      case '03d':
      case '04d': return <Cloud className={`${iconClass} text-weather-cloudy`} />;
      case '09d':
      case '10d':
      case '11d': return <CloudRain className={`${iconClass} text-weather-rainy`} />;
      default: return <Sun className={`${iconClass} text-weather-sunny`} />;
    }
  };

  const temp = unit === 'celsius' 
    ? currentWeather.main.temp 
    : (currentWeather.main.temp * 9/5) + 32;

  return (
    <div className="weather-card p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">{currentWeather.name}</h2>
          <p className="text-6xl font-bold mb-4">
            {Math.round(temp)}°{unit === 'celsius' ? 'C' : 'F'}
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-300 capitalize">
            {currentWeather.weather[0].description}
          </p>
        </div>
        <div className="flex items-center justify-center">
          {getWeatherIcon(currentWeather.weather[0].icon)}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 dark:bg-gray-700/50">
          <Droplets className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="text-xl font-semibold">{currentWeather.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-gray-700/50">
          <Wind className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
            <p className="text-xl font-semibold">{currentWeather.wind.speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-purple-50 dark:bg-gray-700/50">
          <Gauge className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
            <p className="text-xl font-semibold">{currentWeather.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
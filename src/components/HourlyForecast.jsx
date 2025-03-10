import React from 'react';
import useWeatherStore from '../store/weatherStore';

const HourlyForecast = () => {
  const { hourlyForecast, unit } = useWeatherStore();

  if (!hourlyForecast.length) return null;

  return (
    <div className="weather-card p-6">
      <h2 className="text-2xl font-bold mb-6">Hourly Forecast</h2>
      <div className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4">
        {hourlyForecast.map((hour, index) => {
          const temp = unit === 'celsius' 
            ? hour.main.temp 
            : (hour.main.temp * 9/5) + 32;

          return (
            <div 
              key={index} 
              className="flex flex-col items-center min-w-[100px] p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-transform hover:scale-105"
            >
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit' })}
              </p>
              <img 
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
                className="w-12 h-12 my-2"
              />
              <p className="text-lg font-semibold">
                {Math.round(temp)}°{unit === 'celsius' ? 'C' : 'F'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
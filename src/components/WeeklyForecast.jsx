import React from 'react';
import useWeatherStore from '../store/weatherStore';

const WeeklyForecast = () => {
  const { weeklyForecast, unit } = useWeatherStore();

  if (!weeklyForecast.length) return null;

  return (
    <div className="weather-card p-6">
      <h2 className="text-2xl font-bold mb-6">7-Day Forecast</h2>
      <div className="space-y-4">
        {weeklyForecast.map((day, index) => {
          const temp = unit === 'celsius' 
            ? day.main.temp 
            : (day.main.temp * 9/5) + 32;

          return (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-all hover:shadow-md"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                {new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'long' })}
              </p>
              <div className="flex items-center gap-6">
                <img 
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="w-12 h-12"
                />
                <p className="text-xl font-semibold w-20 text-right">
                  {Math.round(temp)}°{unit === 'celsius' ? 'C' : 'F'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;
import React, { useEffect } from 'react';
import useWeatherStore from './store/weatherStore';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import { Sun, Moon } from 'lucide-react';

function App() {
  const { fetchWeatherByLocation, unit, setUnit, currentWeather } = useWeatherStore();
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
      }, () => {
        fetchWeatherByLocation("London");
      });
    }
  }, [fetchWeatherByLocation]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
            Weather Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              °{unit === 'celsius' ? 'C' : 'F'}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <SearchBar />
        </div>
        
        <div className="space-y-6">
          <CurrentWeather />
          <HourlyForecast />
          <WeeklyForecast />
        </div>
      </div>
    </div>
  );
}

export default App;
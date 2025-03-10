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
          <div className='flex gap-6 text-xl'>
            <a href='https://avpkn.vercel.app/' target='_black' >About</a>
            <a href='mailto:praveenkumarnaidu88@gmail.com?%20subject=Contact%20to%20Praveen!' target='_black' >Contact</a>
          </div>
        </div>
        
        <div className="mb-8 flex items-center gap-4">
        <SearchBar />
        <button
          onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
          className="px-5 py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
        >
          °{unit === 'celsius' ? 'C' : 'F'}
        </button>
          
        </div>
        
        <div className="space-y-6">
          <CurrentWeather />
          <HourlyForecast />
          <WeeklyForecast />
        </div>
      </div>
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 p-4 rounded-lg bg-gray-700 dark:bg-[#9ca3af]
                  text-gray-200 dark:text-[#ffd734] hover:bg-gray-400 dark:hover:bg-[#bb8f34]
                  transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 z-50"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
    
  );
}

export default App;
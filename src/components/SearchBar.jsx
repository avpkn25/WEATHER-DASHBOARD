import React, { useState } from 'react';
import { Search } from 'lucide-react';
import useWeatherStore from '../store/weatherStore';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const fetchWeather = useWeatherStore(state => state.fetchWeather);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all duration-300 text-lg glass-effect dark:border-gray-700 dark:focus:border-blue-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
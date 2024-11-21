import { useState, useEffect } from 'react';
import { CloudSun } from 'lucide-react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { fetchWeather } from './services/weatherApi';
import { getBackgroundImage } from './utils/backgroundImages';
import type { WeatherData } from './types';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [background, setBackground] = useState<string>('');

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchWeather(city);
      setWeatherData(data);
      const newBackground = getBackgroundImage(
        data.current.description,
        data.current.isDay,
        data.city
      );
      setBackground(newBackground);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center py-12 px-4 transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <div className="flex items-center gap-2 text-white mb-4">
          <CloudSun className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Weather App</h1>
        </div>

        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="w-full bg-red-500/80 text-white p-4 rounded-lg backdrop-blur-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          weatherData && (
            <>
              <CurrentWeather data={weatherData} />
              <Forecast data={weatherData} />
            </>
          )
        )}
      </div>
    </div>
  );
}

export default App;
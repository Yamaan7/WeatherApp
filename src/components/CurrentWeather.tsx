import { Cloud, Droplets, Wind } from 'lucide-react';
import type { WeatherData } from '../types';

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-1">{data.city}</h2>
        <div className="flex items-center justify-center gap-2">
          <img
            src={`https:${data.current.icon}`}
            alt={data.current.description}
            className="w-16 h-16"
          />
          <p className="text-5xl font-bold text-white">
            {Math.round(data.current.temp)}°C
          </p>
        </div>
        <p className="text-xl text-white/90 capitalize">{data.current.description}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-white/90">
        <div className="flex flex-col items-center">
          <Cloud className="h-6 w-6 mb-2" />
          <span className="text-sm">Conditions</span>
          <span className="font-medium capitalize">{data.current.description}</span>
        </div>
        <div className="flex flex-col items-center">
          <Wind className="h-6 w-6 mb-2" />
          <span className="text-sm">Wind Speed</span>
          <span className="font-medium">{Math.round(data.current.windSpeed)} km/h</span>
        </div>
        <div className="flex flex-col items-center">
          <Droplets className="h-6 w-6 mb-2" />
          <span className="text-sm">Humidity</span>
          <span className="font-medium">{data.current.humidity}%</span>
        </div>
      </div>
    </div>
  );
}
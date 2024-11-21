import type { WeatherData } from '../types';

interface ForecastProps {
  data: WeatherData;
}

export default function Forecast({ data }: ForecastProps) {
  return (
    <div className="w-full max-w-md grid grid-cols-5 gap-2">
      {data.forecast.map((day) => (
        <div
          key={day.date}
          className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 
                   flex flex-col items-center"
        >
          <span className="text-white/90 text-sm mb-1">
            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
          </span>
          <img
            src={`https:${day.icon}`}
            alt={day.description}
            className="w-12 h-12"
          />
          <span className="text-white font-medium">{Math.round(day.temp)}°C</span>
        </div>
      ))}
    </div>
  );
}
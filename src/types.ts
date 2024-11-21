export interface WeatherData {
  city: string;
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    isDay: boolean;
  };
  forecast: Array<{
    date: string;
    temp: number;
    description: string;
    icon: string;
  }>;
}

export interface City {
  name: string;
  country: string;
}
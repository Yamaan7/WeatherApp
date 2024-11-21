const API_KEY = 'bf8900eba2db43c2a4d114305242111';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchWeather(city: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch weather data');
    }

    const data = await response.json();
    
    return {
      city: data.location.name,
      current: {
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        description: data.current.condition.text,
        icon: data.current.condition.icon,
        isDay: data.current.is_day === 1
      },
      forecast: data.forecast.forecastday.map((day: any) => ({
        date: day.date,
        temp: day.day.avgtemp_c,
        description: day.day.condition.text,
        icon: day.day.condition.icon
      }))
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch weather data');
  }
}

export async function searchCities(query: string) {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }

    const data = await response.json();
    return data.map((city: any) => ({
      name: city.name,
      country: city.country
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
}
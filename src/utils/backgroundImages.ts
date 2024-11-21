interface WeatherBackgrounds {
  [key: string]: string;
}

interface CityBackgrounds {
  [key: string]: {
    default: string;
    sunny?: string;
    cloudy?: string;
    rainy?: string;
    snowy?: string;
    night?: string;
  };
}

// City-specific backgrounds
export const cityBackgrounds: CityBackgrounds = {
  'london': {
    default: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2560&q=80',
    sunny: 'https://images.unsplash.com/photo-1517394834181-95ed159986c7?auto=format&fit=crop&w=2560&q=80',
    cloudy: 'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?auto=format&fit=crop&w=2560&q=80',
    rainy: 'https://images.unsplash.com/photo-1508711046474-2f9d98813524?auto=format&fit=crop&w=2560&q=80',
    night: 'https://images.unsplash.com/photo-1494922275507-58dc039ed337?auto=format&fit=crop&w=2560&q=80'
  },
  'paris': {
    default: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2560&q=80',
    sunny: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2560&q=80',
    rainy: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=2560&q=80',
    night: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?auto=format&fit=crop&w=2560&q=80'
  },
  'new york': {
    default: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2560&q=80',
    sunny: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=2560&q=80',
    rainy: 'https://images.unsplash.com/photo-1574786198875-762712c5d969?auto=format&fit=crop&w=2560&q=80',
    night: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2560&q=80'
  },
  'tokyo': {
    default: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=2560&q=80',
    sunny: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&w=2560&q=80',
    rainy: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=2560&q=80',
    night: 'https://images.unsplash.com/photo-1595924733523-c97e51237e13?auto=format&fit=crop&w=2560&q=80'
  },
  'dubai': {
    default: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2560&q=80',
    sunny: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=2560&q=80',
    night: 'https://images.unsplash.com/photo-1540866225557-9e4c58100c67?auto=format&fit=crop&w=2560&q=80'
  }
};

// Generic weather backgrounds for cities without specific images
export const weatherBackgrounds: WeatherBackgrounds = {
  // Sunny conditions
  'sunny': 'https://images.unsplash.com/photo-1622278647429-71b91559f87e?auto=format&fit=crop&w=2560&q=80',
  'clear': 'https://images.unsplash.com/photo-1617142108319-66c7ab45c711?auto=format&fit=crop&w=2560&q=80',

  // Cloudy conditions
  'cloudy': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2560&q=80',
  'partly cloudy': 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=2560&q=80',
  'overcast': 'https://images.unsplash.com/photo-1483977399921-6cf94f6fdc3a?auto=format&fit=crop&w=2560&q=80',

  // Rainy conditions
  'rain': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=2560&q=80',
  'light rain': 'https://images.unsplash.com/photo-1518803194621-27188ba362c9?auto=format&fit=crop&w=2560&q=80',
  'moderate rain': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=2560&q=80',

  // Stormy conditions
  'thunderstorm': 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=2560&q=80',
  'thunder': 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?auto=format&fit=crop&w=2560&q=80',

  // Snowy conditions
  'snow': 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&w=2560&q=80',
  'light snow': 'https://images.unsplash.com/photo-1544273677-c433136021d4?auto=format&fit=crop&w=2560&q=80',

  // Night conditions
  'night clear': 'https://images.unsplash.com/photo-1532978379173-523e16f371f9?auto=format&fit=crop&w=2560&q=80',
  'night cloudy': 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&w=2560&q=80',

  // Default
  'default': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2560&q=80'
};

function getCityBackground(city: string, condition: string, isDay: boolean): string | null {
  const cityKey = city.toLowerCase();
  const cityData = cityBackgrounds[cityKey];

  if (!cityData) return null;

  if (!isDay && cityData.night) {
    return cityData.night;
  }

  if (condition.includes('rain') && cityData.rainy) {
    return cityData.rainy;
  }

  if ((condition.includes('sunny') || condition.includes('clear')) && cityData.sunny) {
    return cityData.sunny;
  }

  if (condition.includes('cloud') && cityData.cloudy) {
    return cityData.cloudy;
  }

  if (condition.includes('snow') && cityData.snowy) {
    return cityData.snowy;
  }

  return cityData.default;
}

export function getBackgroundImage(description: string, isDay: boolean, city: string): string {
  const condition = description.toLowerCase();

  // Try to get city-specific background first
  const cityBackground = getCityBackground(city, condition, isDay);
  if (cityBackground) {
    return cityBackground;
  }

  // Fallback to weather-based backgrounds
  // Check for night-specific images first
  if (!isDay && weatherBackgrounds[`night ${condition}`]) {
    return weatherBackgrounds[`night ${condition}`];
  }

  // Check for exact condition match
  if (weatherBackgrounds[condition]) {
    return weatherBackgrounds[condition];
  }

  // Check for partial matches
  for (const key of Object.keys(weatherBackgrounds)) {
    if (condition.includes(key)) {
      return weatherBackgrounds[key];
    }
  }

  return weatherBackgrounds.default;
}
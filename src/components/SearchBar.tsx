import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchCities } from '../services/weatherApi';
import type { City } from '../types';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        const cities = await searchCities(query);
        setSuggestions(cities);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (city: City) => {
    onSearch(`${city.name}, ${city.country}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg 
                   backdrop-blur-md text-white placeholder-white/70 focus:outline-none 
                   focus:ring-2 focus:ring-white/30"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-white/10 backdrop-blur-md border 
                      border-white/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={`${city.name}-${city.country}-${index}`}
              onClick={() => handleSuggestionClick(city)}
              className="w-full px-4 py-2 text-left text-white hover:bg-white/20 
                       transition-colors duration-150 ease-in-out"
            >
              {city.name}, {city.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
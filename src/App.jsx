import React, { useState } from "react";

function WeatherDashboard() {

  // Mock weather data
  const mockWeatherData = {
    "New York": {
      temperature: "22°C",
      humidity: "56%",
      windSpeed: "15 km/h",
    },
    "Los Angeles": {
      temperature: "27°C",
      humidity: "45%",
      windSpeed: "10 km/h",
    },
    London: {
      temperature: "15°C",
      humidity: "70%",
      windSpeed: "20 km/h",
    },
  };

  const [city, setCity] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchResult, setSearchResult] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [weatherList, setWeatherList] = useState(mockWeatherData);

  const handleCitySearch = (city) => {
    setCity(city);
  }

  const handleSearch = () => {
    // filter search data from weatherList
      
    const normalizedCity = city.trim().toLowerCase();
    const matchedCity = Object.keys(weatherList).find(
      key => key.toLowerCase() === normalizedCity
    );
    const result = matchedCity ? weatherList[matchedCity] : null;
    setSearchResult(result);
    setSearchList(prev => [...prev, city]);
    setHasSearched(true);
    setCity("");
  }

  return (
    <div>
      <input type="text" value={city} onChange={(e) => handleCitySearch(e.target.value)} id="citySearch" placeholder="Search for a city..." />
      <button id="searchButton" onClick={handleSearch}>Search</button>
      <div id="weatherData">
        {hasSearched && (searchResult?.temperature ? (
          <>
            <div>Temperature: {searchResult?.temperature} </div>
            <div>Humidity: {searchResult?.humidity}</div>
            <div>Wind Speed: {searchResult?.windSpeed}</div>
          </>
        ) : (
            <div>City not found.</div>
        ))}
      </div>
      <div id="previousSearches">
        <h4>Previous Searches:</h4>
        {searchList?.join(', ')}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Weather Dashboard</h1>
      <WeatherDashboard />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
      
        const city = "Pune";
        const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f652964084c552e8c0492237a3fabd9c`)
      
   console.log(response)
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error("Error fetching weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      {weatherData && (
        <div>
          <h2>Weather Information for {weatherData.name}</h2>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;

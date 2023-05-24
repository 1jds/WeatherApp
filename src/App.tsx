import { useEffect, useState } from "react";
import "./index.css";
import LocationWeather from "./components/LocationWeather";
const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

function App() {
  const [forecastData, setForecastData] = useState<APIData | null>(null);

  const [todayDayName, setTodayDayName] = useState<string>("");
    const [currentTime, setCurrentTime] = useState<string>("00:00");
  console.log(currentTime);
  
  

  

  const getForecastDataForLocation = async (lat: number, lon: number) => {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setForecastData(data);
  };

  const emojis = {
    cloudy: "☁️",
    sunny: "☀️",
    stormy: "⛈️",
    rainy: "🌧️",
  };

  
  const [temp, setTemp] = useState();
  // console.log(temp)
  // useEffect(() => {
  //   forecastData?.forecast.forecastday
  //     ? isUseCelcius
  //       ? forecastData.forecast.forecastday.map(
  //           (item: forecastdayType) => item.day.maxtemp_c
  //         )
  //       : forecastData.forecast.forecastday.map(
  //           (item: forecastdayType) => item.day.maxtemp_f
  //         )
  //     : null;
  // }, [forecastData]);
  const [wind, setWind] = useState();
  useEffect(() => {
    forecastData
      ? forecastData.forecast.forecastday.map(
          (item: forecastdayType) => item.day.maxwind_kph
        )
      : null;
  }, [forecastData]);


  // const [isTempScaleCelcius, setIsTempScaleCelcius] = useState(true);

  const [locationNameSearchString, setLocationNameSearchString] =
    useState<string>("");

  type searchSuggestionResultsType = {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
  };

  const [searchSuggestionResults, setSearchSuggestionResults] = useState<
    searchSuggestionResultsType[]
  >([]);

  useEffect(() => {
    const autoCompleteSuggestions = async (str: string) => {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${str}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      setSearchSuggestionResults(data);
    };
    autoCompleteSuggestions(locationNameSearchString);
  }, [locationNameSearchString]);
  // console.log(searchSuggestionResults);

  const [autoGeoFind, setAutoGeoFind] = useState<string>("");

  function geoFindDeviceLocation() {
    function success(position: {
      coords: { latitude: number; longitude: number };
    }) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setAutoGeoFind("");
      getForecastDataForLocation(latitude, longitude);
      setLocationNameSearchString("");
    }

    function error() {
      setAutoGeoFind("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      setAutoGeoFind("Geolocation is not supported by your browser");
    } else {
      setAutoGeoFind("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <div className="page-center">
      <div className="location-search-container">
        <button className="blank-btn" onClick={geoFindDeviceLocation}>
          Auto
        </button>
        {autoGeoFind ? <p className="auto-geo-find-status"></p> : null}
        <input
          type="text"
          value={locationNameSearchString}
          onChange={(e) => {
            setLocationNameSearchString(e.target.value);
          }}
        />
        {searchSuggestionResults.length > 0 ? (
          <div className="auto-complete-search-results-btns-container">
            {searchSuggestionResults.map(
              (item: searchSuggestionResultsType) => {
                return (
                  <button
                    key={item.id}
                    className="blank-btn"
                    onClick={() => {
                      getForecastDataForLocation(item.lat, item.lon);
                      setLocationNameSearchString("");
                    }}
                  >
                    {item.name ? `${item.name}, ` : null}
                    {item.region ? `${item.region}, ` : null}
                    {item.country ? `${item.country}` : null}
                  </button>
                );
              }
            )}
          </div>
        ) : null}
      </div>
      {forecastData ? (
        <LocationWeather
          forecastData={{ ...forecastData }}
        />
      ) : null}
    </div>
  );
}

export default App;

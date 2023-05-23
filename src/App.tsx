import { useEffect, useState } from "react";
import "./index.css";
import LocationWeather from "./components/LocationWeather";
const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

function App() {

  const [forecastData, setForecastData] = useState<APIData | null>(null);
  
  const [dateObjectAtStartUp, setDateObjectAtStartUp] = useState<Date>();
  const [todaysDateInLondon, setTodaysDateInLondon] = useState<string>("");
  const [todayDayName, setTodayDayName] = useState<string>("");
  const [isUseCelcius, setIsUseCelcius] = useState<boolean>(true);
  const [currentHourIndex, setCurrentHourIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  // console.log(todaysDateInLondon)
  // console.log(todayDayName)
  console.log(currentHourIndex);
  console.log(currentTime);
  useEffect(() => {
    const date = new Date();
    setCurrentTime(`${date.getHours()}:${date.getMinutes()}`);
    setCurrentHourIndex(date.getHours());
  }, []);

  useEffect(() => {
    const newDate: Date = new Date();
    setDateObjectAtStartUp(newDate);

    setTodaysDateInLondon(
      newDate.toLocaleDateString("en-CA", { timeZone: "Europe/London" })
    );
  }, []);

  const getDayName = (date: string): string => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(date);
    const dayName = dateObjectAtStartUp
      ? days[dateObjectAtStartUp.getDay()]
      : "Loading";
    return dayName;
  };

  

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

  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dayName, setDayName] = useState("Monday");
  const [dayHour, setDayHour] = useState(9);
  const [amPm, setAmPm] = useState("am");
  const [temp, setTemp] = useState();
  // console.log(temp)
  useEffect(() => {  
    forecastData?.forecast.forecastday ?
    (isUseCelcius
      ? forecastData.forecast.forecastday.map((item: forecastdayType) => item.day.maxtemp_c)
      : forecastData.forecast.forecastday.map((item: forecastdayType) => item.day.maxtemp_f))
      : null
  }, [forecastData])
  const [wind, setWind] = useState();
  useEffect(() => {  
    forecastData ? forecastData.forecast.forecastday.map((item: forecastdayType) => item.day.maxwind_kph) : null
  }, [forecastData])

  useEffect(() => {
    const date = new Date();
    const dayofWeek = date.getDay();
    let dayofWeekName = "Monday";
    switch (dayofWeek) {
      case 0:
        dayofWeekName = "Sunday";
        break;
      case 1:
        dayofWeekName = "Monday";
        break;
      case 2:
        dayofWeekName = "Tuesday";
        break;
      case 3:
        dayofWeekName = "Wednesday";
        break;
      case 4:
        dayofWeekName = "Thursday";
        break;
      case 5:
        dayofWeekName = "Friday";
        break;
      case 6:
        dayofWeekName = "Saturday";
        break;
      default:
        dayofWeekName = "Monday";
    }
    setDayName(dayofWeekName);

    const hourofDay = date.getHours();
    const amPmValue = hourofDay > 11 ? "pm" : "am";
    let hourValue;
    switch (hourofDay) {
      case 0:
        hourValue = 12;
        break;
      case 13:
        hourValue = 1;
        break;
      case 14:
        hourValue = 2;
        break;
      case 15:
        hourValue = 3;
        break;
      case 16:
        hourValue = 4;
        break;
      case 17:
        hourValue = 5;
        break;
      case 18:
        hourValue = 6;
        break;
      case 19:
        hourValue = 7;
        break;
      case 20:
        hourValue = 8;
        break;
      case 21:
        hourValue = 9;
        break;
      case 22:
        hourValue = 10;
        break;
      case 23:
        hourValue = 11;
        break;
      default:
        hourValue = hourofDay;
    }
    setDayHour(hourValue);
    setAmPm(amPmValue);
  }, []);
  // const [isTempScaleCelcius, setIsTempScaleCelcius] = useState(true);

  

  const daysWeather = forecastData?.forecast.forecastday ? forecastData.forecast.forecastday.map((item: forecastdayType, index: number) => {
    return (
      <div
        key={`${index}`}
        className="day-tile"
        onClick={() => setCurrentDataIndex(index)}
      >
        <p className="day-tile-day">{getDayName(item.date).slice(0, 3)}</p>
        {/* <p className="day-tile-emoji">
            {item.day.condition.text}
          </p> */}
        <img src={item.day.condition.icon} />
        <p>
          {isUseCelcius
            ? Math.round(item.day.mintemp_c)
            : Math.round(item.day.mintemp_f)}
          ° -{" "}
          {isUseCelcius
            ? Math.round(item.day.maxtemp_c)
            : Math.round(item.day.maxtemp_f)}
          °
        </p>
      </div>
    );
  }) : null;
  // console.log(daysWeather)

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

  const [autoGeoFind, setAutoGeoFind] = useState<string>('');

  function geoFindDeviceLocation() {
    function success(position: { coords: { latitude: number; longitude: number; }; }) {
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
        <button className="blank-btn" onClick={geoFindDeviceLocation}>Auto</button>
        {autoGeoFind ? <p className="auto-geo-find-status"></p> : null}
      <input
        type="text"
        value={locationNameSearchString}
        onChange={(e) => {
          setLocationNameSearchString(e.target.value);
        }}
      />
      {searchSuggestionResults.length > 0
        ? <div className="auto-complete-search-results-btns-container">{searchSuggestionResults.map((item: searchSuggestionResultsType) => {
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
          })}</div>
        : null}</div>
      {forecastData ? <LocationWeather forecastData={{...forecastData}} isUseCelcius={isUseCelcius} currentDataIndex={currentDataIndex} currentHourIndex={currentHourIndex}/> : null }
    </div>
  );
}

export default App;

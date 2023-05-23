import React from "react";
import { useEffect, useState } from "react";
// import forecastData from "./data/forecastData.ts";
import "./index.css";
const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

function App() {
  // interface weatherDataInterface {
  //   day: string;
  //   conditions: string;
  //   maxTempDegC: number;
  //   windKmH: number;
  //   hourlyTemp: number[];
  // }

  type AstroType = {
    is_moon_up: number;
    is_sun_up: number;
    moon_illumination: string;
    moon_phase: string;
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
  };

  type DayType = {
    avghumidity: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avgvis_km: number;
    avgvis_miles: number;
    condition: { text: string; icon: string; code: number };
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    daily_will_it_rain: number;
    daily_will_it_snow: number;
    maxtemp_c: number;
    maxtemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    mintemp_c: number;
    mintemp_f: number;
    totalprecip_in: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    uv: number;
  };

  type HourType = {
    chance_of_rain: number;
    chance_of_snow: number;
    cloud: number;
    condition: { text: string; icon: string; code: number };
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    heatindex_c: number;
    heatindex_f: number;
    humidity: number;
    is_day: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    time: string;
    time_epoch: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    will_it_rain: number;
    will_it_snow: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
    windchill_c: number;
    windchill_f: number;
  }[];

  type APIData = {
    astro: AstroType;
    date: string;
    date_epoch: number;
    day: DayType;
    hour: HourType;
  };

  const [forecastData, setForecastData] = useState<APIData[]>([]);
  const [locationData, setLocationData] = useState<{
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  }>();
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
    setLocationData(data.location);
    setForecastData(data.forecast.forecastday);
    console.log(data);
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
  const [temp, setTemp] = useState(
    isUseCelcius
      ? forecastData.map((item: APIData) => item.day.maxtemp_c)
      : forecastData.map((item: APIData) => item.day.maxtemp_f)
  );
  // console.log(temp)
  const [wind, setWind] = useState(
    forecastData.map((item: APIData) => item.day.maxwind_kph)
  );
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

  const styles = {
    celcius: {
      color: isUseCelcius ? "black" : "#adb1b6",
    },
    fahrenheit: {
      color: isUseCelcius ? "#adb1b6" : "black",
    },
  };

  // const handleTempScaleChange = (e: React.MouseEvent<HTMLElement>) => {
  //   // console.log(e.target);
  //   if ((e.target as HTMLElement).dataset.name === "fahrenheit") {
  //     if (isTempScaleCelcius === true) {
  //       setIsTempScaleCelcius(false);
  //       setTemp((prevState: number[]) => {
  //         return prevState.map((item) => {
  //           return Math.floor((item * 9) / 5 + 32);
  //         });
  //       });
  //     } else {
  //       return;
  //     }
  //   } else {
  //     if (isTempScaleCelcius !== true) {
  //       setIsTempScaleCelcius(true);
  //       setTemp((prevState) => {
  //         return prevState.map((item: number) => {
  //           return Math.ceil(((item - 32) * 5) / 9);
  //         });
  //       });
  //     } else {
  //       return;
  //     }
  //   }
  // };

  const daysWeather = forecastData.map((item, index) => {
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
  });
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
      {forecastData.length !== 0 ? (
        <div className="app-wrapper">
          <div className="focus-day-section">
            <p className="focus-day-emoji">
              {forecastData.length !== 0 ? (
                <img src={forecastData[currentDataIndex].day.condition.icon} />
              ) : null}
            </p>
            <p>
              {isUseCelcius
                ? Math.round(
                    forecastData[currentDataIndex].hour[currentHourIndex].temp_c
                  )
                : Math.round(
                    forecastData[currentDataIndex].hour[currentHourIndex].temp_f
                  )}
            </p>
            <div className="focus-day-temp-switcher">
              <p
                data-name="celcius"
                onClick={() => setIsUseCelcius((prevState) => !prevState)}
                style={styles.celcius}
              >
                °C
              </p>
              <span></span>
              <p
                data-name="fahrenheit"
                onClick={() => setIsUseCelcius((prevState) => !prevState)}
                style={styles.fahrenheit}
              >
                °F
              </p>
            </div>
            <div className="focus-day-more-details">
              <p>
                Chance of rain:{" "}
                {forecastData[currentDataIndex].day.daily_chance_of_rain}%
              </p>
              <p>
                Chance of snow:{" "}
                {forecastData[currentDataIndex].day.daily_chance_of_snow}%
              </p>
              <p>
                Wind:{" "}
                {isUseCelcius
                  ? `${forecastData[currentDataIndex].day.maxwind_kph} km/h`
                  : `${forecastData[currentDataIndex].day.maxwind_mph} mph`}
              </p>
              {isUseCelcius
                ? forecastData[currentDataIndex].day.maxtemp_c > 35 && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      Heatwave Warning
                    </p>
                  )
                : forecastData[currentDataIndex].day.maxtemp_f > 95 && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      Heatwave Warning
                    </p>
                  )}
              {forecastData.length !== 0
                ? forecastData[currentDataIndex].day.maxwind_kph > 30 && (
                    <p style={{ color: "orange", fontWeight: "bold" }}>
                      Strong wind warning
                    </p>
                  )
                : null}
            </div>
            <div className="focus-day-summary">
              <p>{locationData ? locationData.name : "Weather"}</p>
              <p>
                {dayName} {dayHour}:00 {amPm}
              </p>
              <p>{forecastData[currentDataIndex].day.condition.text}</p>
            </div>
          </div>
          <div className="hourly-temp-section">
            <p>Hourly Temp</p>
            {forecastData[currentDataIndex].hour.map((item, index) => {
              const amPm = index < 12 ? "am" : "pm";
              const modifiedIndex =
                index === 0
                  ? 12
                  : index === 12
                  ? 12
                  : index > 11
                  ? index - 12
                  : index;
              return (
                <p key={`${item} ${index}`}>
                  {modifiedIndex} {amPm} -{" "}
                  {isUseCelcius ? item.temp_c : item.temp_f}°
                </p>
              );
            })}
          </div>
          <div className="days-summary-section flex-row">{daysWeather}</div>
        </div>
      ) : null}
    </div>
  );
}

export default App;

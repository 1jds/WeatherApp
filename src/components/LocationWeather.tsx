import { useState, useEffect } from "react";

export default function LocationWeather(props: LocationWeatherPropsType) {
  console.log(props);

  const [isUseCelcius, setIsUseCelcius] = useState<boolean>(true);
  const [currentHourIndex, setCurrentHourIndex] = useState<number>(0);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dateObjectAtStartUp, setDateObjectAtStartUp] = useState<Date>();
  const [todaysDateInLondon, setTodaysDateInLondon] = useState<string>("");
  const [dayName, setDayName] = useState<string>('');
  const [dayHour, setDayHour] = useState<string>('');
  const [dayMins, setDayMins] = useState<string>('')
  const [amPm, setAmPm] = useState<string>('');

  const styles = {
    celcius: {
      color: isUseCelcius ? "black" : "#adb1b6",
    },
    fahrenheit: {
      color: isUseCelcius ? "#adb1b6" : "black",
    },
  };

  useEffect(() => {
    setDayMins(props.forecastData.location.localtime.slice(-2))
    const date = new Date(props.forecastData.location.localtime);
    console.log(date)
    const dayofWeek = date.getDay();
    console.log(dayofWeek)
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
    setDayHour(hourValue + '');
    setAmPm(amPmValue);
  }, [props.forecastData]);


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

  const daysWeather = props.forecastData.forecast.forecastday.map(
    (item: forecastdayType, index: number) => {
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
    }
  );
  // console.log(daysWeather)

  

//   useEffect(() => {
//     const date = new Date();
//     setCurrentTime(`${date.getHours()}:${date.getMinutes()}`);
//     setCurrentHourIndex(date.getHours());
//   }, []);

  
  return (
    <div className="app-wrapper">
      <div className="focus-day-section">
        <p className="focus-day-emoji">
          {props ? (
            <img
              src={
                props.forecastData.forecast.forecastday[currentDataIndex]
                  .day.condition.icon
              }
            />
          ) : null}
        </p>
        <p>
          {isUseCelcius
            ? Math.round(
                props.forecastData.forecast.forecastday[currentDataIndex]
                  .hour[currentHourIndex].temp_c
              )
            : Math.round(
                props.forecastData.forecast.forecastday[currentDataIndex]
                  .hour[currentHourIndex].temp_f
              )}
        </p>
        <div className="focus-day-temp-switcher">
          <p
            data-name="celcius"
            onClick={() => setIsUseCelcius((prevState: boolean) => !prevState)}
            style={styles.celcius}
          >
            °C
          </p>
          <span></span>
          <p
            data-name="fahrenheit"
            onClick={() => setIsUseCelcius((prevState: boolean) => !prevState)}
            style={styles.fahrenheit}
          >
            °F
          </p>
        </div>
        <div className="focus-day-more-details">
          <p>
            Chance of rain:{" "}
            {
              props.forecastData.forecast.forecastday[currentDataIndex]
                .day.daily_chance_of_rain
            }
            %
          </p>
          <p>
            Chance of snow:{" "}
            {
              props.forecastData.forecast.forecastday[currentDataIndex]
                .day.daily_chance_of_snow
            }
            %
          </p>
          <p>
            Wind:{" "}
            {isUseCelcius
              ? `${
                  props.forecastData.forecast.forecastday[
                    currentDataIndex
                  ].day.maxwind_kph
                } km/h`
              : `${
                  props.forecastData.forecast.forecastday[
                    currentDataIndex
                  ].day.maxwind_mph
                } mph`}
          </p>
          {isUseCelcius
            ? props.forecastData.forecast.forecastday[currentDataIndex]
                .day.maxtemp_c > 35 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Heatwave Warning
                </p>
              )
            : props.forecastData.forecast.forecastday[currentDataIndex]
                .day.maxtemp_f > 95 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Heatwave Warning
                </p>
              )}
          {props
            ? props.forecastData.forecast.forecastday[currentDataIndex]
                .day.maxwind_kph > 30 && (
                <p style={{ color: "orange", fontWeight: "bold" }}>
                  Strong wind warning
                </p>
              )
            : null}
        </div>
        <div className="focus-day-summary">
          <p>{props.forecastData.location.name}</p>
          <p>{dayName} {dayHour}:{dayMins}{amPm}</p>
          <p>
            {
              props.forecastData.forecast.forecastday[currentDataIndex]
                .day.condition.text
            }
          </p>
        </div>
      </div>
      <div className="hourly-temp-section">
        <p>Hourly Temp</p>
        {props.forecastData.forecast.forecastday[
          currentDataIndex
        ].hour.map((item, index) => {
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
  );
}

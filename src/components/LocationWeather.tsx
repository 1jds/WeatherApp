import { useState, useEffect } from "react";

export default function LocationWeather(props: LocationWeatherPropsType) {
  console.log(props);

  const [isUseCelcius, setIsUseCelcius] = useState<boolean>(true);
  const [currentHourIndex, setCurrentHourIndex] = useState<number>(0);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);

  const [dayNumber, setDayNumber] = useState<number>(0);
  const [dayName, setDayName] = useState<string>("");
  const [dayHour, setDayHour] = useState<string>("");
  const [dayMins, setDayMins] = useState<string>("");
  const [amPm, setAmPm] = useState<string>("");
  console.log(
    "dayNumber",
    dayNumber,
    "dayName",
    dayName,
    "dayHour",
    dayHour,
    "dayMins",
    dayMins,
    "amPM",
    amPm
  );

  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    // This is two week's worth, otherwise I run off the end of the array when getting the day names for the tiles.
    // Of course, this problem could be solved in another way, but this works too
  ];

  const convertTo12HourTime = (num: number): string => {
    const hourValue = num === 0 ? 12 : num > 12 ? num - 12 : num;
    return hourValue + "";
  };

  const styles = {
    celcius: {
      color: isUseCelcius ? "black" : "#adb1b6",
    },
    fahrenheit: {
      color: isUseCelcius ? "#adb1b6" : "black",
    },
  };

  useEffect(() => {
    const date = new Date(props.forecastData.location.localtime_epoch * 1000);
    setDayNumber(date.getDay());
    setDayName(days[date.getDay()]);
    setCurrentHourIndex(Number(props.forecastData.location.localtime.slice(-5, -3)));
    setDayHour(
      convertTo12HourTime(
        Number(props.forecastData.location.localtime.slice(-5, -3))
      )
    );
    setDayMins(props.forecastData.location.localtime.slice(-2));
    setAmPm(
      Number(props.forecastData.location.localtime.slice(-5, -3)) > 11
        ? "pm"
        : "am"
    );
  }, [props.forecastData]);

  const daysWeather = props.forecastData.forecast.forecastday.map(
    (item: forecastdayType, index: number) => {
      return (
        <div
          key={`${index}`}
          className="day-tile"
          onClick={() => {setCurrentDataIndex(index); setDayName(days[dayNumber + index])}}
        >
          <p className="day-tile-day">{days[dayNumber + index].slice(0, 3)}</p>
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

  return (
    <div className="app-wrapper">
      <div className="focus-day-section">
        <p className="focus-day-emoji">
          {props ? (
            <img
              src={
                props.forecastData.forecast.forecastday[currentDataIndex].day
                  .condition.icon
              }
            />
          ) : null}
        </p>
        <p>
          {isUseCelcius
            ? Math.round(
                props.forecastData.forecast.forecastday[currentDataIndex].hour[
                  currentHourIndex
                ].temp_c
              )
            : Math.round(
                props.forecastData.forecast.forecastday[currentDataIndex].hour[
                  currentHourIndex
                ].temp_f
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
              props.forecastData.forecast.forecastday[currentDataIndex].day
                .daily_chance_of_rain
            }
            %
          </p>
          <p>
            Chance of snow:{" "}
            {
              props.forecastData.forecast.forecastday[currentDataIndex].day
                .daily_chance_of_snow
            }
            %
          </p>
          <p>
            Wind:{" "}
            {isUseCelcius
              ? `${props.forecastData.forecast.forecastday[currentDataIndex].day.maxwind_kph} km/h`
              : `${props.forecastData.forecast.forecastday[currentDataIndex].day.maxwind_mph} mph`}
          </p>
          {isUseCelcius
            ? props.forecastData.forecast.forecastday[currentDataIndex].day
                .maxtemp_c > 35 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Heatwave Warning
                </p>
              )
            : props.forecastData.forecast.forecastday[currentDataIndex].day
                .maxtemp_f > 95 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Heatwave Warning
                </p>
              )}
          {props
            ? props.forecastData.forecast.forecastday[currentDataIndex].day
                .maxwind_kph > 30 && (
                <p style={{ color: "orange", fontWeight: "bold" }}>
                  Strong wind warning
                </p>
              )
            : null}
        </div>
        <div className="focus-day-summary">
          <p>{props.forecastData.location.name}</p>
          <p>
            {dayName} {currentDataIndex === 0 ? `${dayHour}:${dayMins} ${amPm}` : null}
          </p>
          <p>
            {
              props.forecastData.forecast.forecastday[currentDataIndex].day
                .condition.text
            }
          </p>
        </div>
      </div>
      <div className="hourly-temp-section">
        <p>Hourly Temp</p>
        {props.forecastData.forecast.forecastday[currentDataIndex].hour.map(
          (item, index) => {
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
          }
        )}
      </div>
      <div className="days-summary-section flex-row">{daysWeather}</div>
    </div>
  );
}

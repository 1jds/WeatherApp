import { useState, useEffect } from 'react'

export default function LocationWeather(props: LocationWeatherPropsType) {
    console.log(props)

    const styles = {
        celcius: {
          color: props.isUseCelcius ? "black" : "#adb1b6",
        },
        fahrenheit: {
          color: props.isUseCelcius ? "#adb1b6" : "black",
        },
      };


    return (
            <div className="app-wrapper">
              <div className="focus-day-section">
                <p className="focus-day-emoji">
                  {props? (
                    <img src={props.forecastData.forecast.forecastday[props.currentDataIndex].day.condition.icon} />
                  ) : null}
                </p>
                <p>
                  {props.isUseCelcius
                    ? Math.round(
                        props.forecastData.forecast.forecastday[props.currentDataIndex].hour[props.currentHourIndex].temp_c
                      )
                    : Math.round(
                        props.forecastData.forecast.forecastday[props.currentDataIndex].hour[props.currentHourIndex].temp_f
                      )}
                </p>
                <div className="focus-day-temp-switcher">
                  <p
                    data-name="celcius"
                    // onClick={() => setIsUseCelcius((prevState) => !prevState)}
                    style={styles.celcius}
                  >
                    °C
                  </p>
                  <span></span>
                  <p
                    data-name="fahrenheit"
                    // onClick={() => setIsUseCelcius((prevState) => !prevState)}
                    style={styles.fahrenheit}
                  >
                    °F
                  </p>
                </div>
                <div className="focus-day-more-details">
                  <p>
                    Chance of rain:{" "}
                    {props.forecastData.forecast.forecastday[props.currentDataIndex].day.daily_chance_of_rain}%
                  </p>
                  <p>
                    Chance of snow:{" "}
                    {props.forecastData.forecast.forecastday[props.currentDataIndex].day.daily_chance_of_snow}%
                  </p>
                  <p>
                    Wind:{" "}
                    {props.isUseCelcius
                      ? `${props.forecastData.forecast.forecastday[props.currentDataIndex].day.maxwind_kph} km/h`
                      : `${props.forecastData.forecast.forecastday[props.currentDataIndex].day.maxwind_mph} mph`}
                  </p>
                  {props.isUseCelcius
                    ? props.forecastData.forecast.forecastday[props.currentDataIndex].day.maxtemp_c > 35 && (
                        <p style={{ color: "red", fontWeight: "bold" }}>
                          Heatwave Warning
                        </p>
                      )
                    : props.forecastData.forecast.forecastday[props.currentDataIndex].day.maxtemp_f > 95 && (
                        <p style={{ color: "red", fontWeight: "bold" }}>
                          Heatwave Warning
                        </p>
                      )}
                  {props
                    ? props.forecastData.forecast.forecastday[props.currentDataIndex].day.maxwind_kph > 30 && (
                        <p style={{ color: "orange", fontWeight: "bold" }}>
                          Strong wind warning
                        </p>
                      )
                    : null}
                </div>
                <div className="focus-day-summary">
                  <p>{props.forecastData.location.name}</p>
                  <p>
                    {/* {dayName} {dayHour}:00 {amPm} */}
                  </p>
                  <p>{props.forecastData.forecast.forecastday[props.currentDataIndex].day.condition.text}</p>
                </div>
              </div>
              <div className="hourly-temp-section">
                <p>Hourly Temp</p>
                {props.forecastData.forecast.forecastday[props.currentDataIndex].hour.map((item, index) => {
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
                      {props.isUseCelcius ? item.temp_c : item.temp_f}°
                    </p>
                  );
                })}
              </div>
              {/* <div className="days-summary-section flex-row">{daysWeather}</div> */}
            </div>
    )
}
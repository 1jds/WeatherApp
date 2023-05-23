/// <reference types="vite/client" />

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

  type forecastdayType = {
    astro: AstroType;
    date: string;
    date_epoch: number;
    day: DayType;
    hour: HourType;
  };

  type APIData = {
    current: {
      last_updated_epoch: number;
      last_updated: string;
      temp_c: number;
      temp_f: number;
      is_day: number;
      condition: {
          text: string;
          icon: string;
          code: number;
      },
      wind_mph: number;
      wind_kph: number;
      wind_degree: number;
      wind_dir: string;
      pressure_mb: number;
      pressure_in: number;
      precip_mm: number;
      precip_in: number;
      humidity: number;
      cloud: number;
      feelslike_c: number;
      feelslike_f: number;
      vis_km: number;
      vis_miles: number;
      uv: number;
      gust_mph: number;
      gust_kph: number;
  };
  forecast: {
    forecastday: forecastdayType[];
  };
    location: {
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
      tz_id: string;
      localtime_epoch: number;
      localtime: string;
  };
  }


type LocationWeatherPropsType = { 
    forecastData: APIData;
    isUseCelcius: boolean;
    currentDataIndex: number;
    currentHourIndex: number;
}
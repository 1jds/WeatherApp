interface weatherDataInterface {
  day: string,
  conditions: string,
  maxTempDegC: number,
  windKmH: number,
  hourlyTemp: number[]
}

const forecastData: weatherDataInterface[] = [
  {
    day: "Mon",
    conditions: "sunny",
    maxTempDegC: 36,
    windKmH: 14,
    hourlyTemp: [17, 17, 17, 17, 18, 19,
      20, 21, 22, 23, 24, 25,
      26, 37, 38, 33, 32, 30,
      28, 26, 24, 21, 19, 18]
  },
  {
    day: "Tue",
    conditions: "cloudy",
    maxTempDegC: 20,
    windKmH: 18,
    hourlyTemp: [12, 12, 12, 13, 13, 14,
      14, 15, 16, 17, 18, 19,
      20, 20, 20, 20, 20, 20,
      19, 17, 15, 14, 13, 13]
  },
  {
    day: "Wed",
    conditions: "sunny",
    maxTempDegC: 25,
    windKmH: 24,
    hourlyTemp: [17, 17, 17, 17, 18, 19,
      20, 22, 24, 27, 29, 32,
      34, 35, 34, 33, 32, 30,
      28, 26, 24, 21, 19, 18]
  },
  {
    day: "Thu",
    conditions: "rainy",
    maxTempDegC: 18,
    windKmH: 20,
    hourlyTemp: [17, 17, 17, 17, 18, 19,
      20, 22, 24, 27, 29, 32,
      34, 35, 34, 33, 32, 30,
      28, 26, 24, 21, 19, 18]
  },
  {
    day: "Fri",
    conditions: "stormy",
    maxTempDegC: 19,
    windKmH: 40,
    hourlyTemp: [17, 17, 17, 17, 18, 19,
      20, 22, 24, 27, 29, 32,
      34, 35, 34, 33, 32, 30,
      28, 26, 24, 21, 19, 18]
  },
  {
    day: "Sat",
    conditions: "cloudy",
    maxTempDegC: 22,
    windKmH: 23,
    hourlyTemp: [12, 12, 12, 13, 13, 14,
      14, 15, 16, 17, 18, 19,
      20, 21, 22, 21, 21, 20,
      19, 17, 15, 14, 13, 13]
  },
  {
    day: "Sun",
    conditions: "sunny",
    maxTempDegC: 37,
    windKmH: 19,
    hourlyTemp: [17, 18, 18, 19, 20, 20,
      21, 22, 24, 27, 29, 32,
      34, 35, 37, 36, 34, 30,
      28, 26, 24, 21, 19, 18]
  },
];


export default forecastData

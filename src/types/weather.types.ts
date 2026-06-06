export type WeatherConditionCode =
  | '0' | '1' | '2' | '3'
  | '45' | '48'
  | '51' | '53' | '55'
  | '61' | '63' | '65'
  | '71' | '73' | '75'
  | '77'
  | '80' | '81' | '82'
  | '85' | '86'
  | '95'
  | '96' | '99'

export type WeatherLocation = {
  lat: number
  lon: number
  timezone: string
  requested_lat: number
  requested_lon: number
  country: string
}

export type CurrentWeather = {
  time: string
  temperature: number
  wind_speed: number
  wind_direction: number
  condition_code: WeatherConditionCode
  icon: string
  icon_path: string
}

export type HourlyWeather = {
  time: string
  temperature: number
  precipitation_probability: number
  wind_speed: number
  condition_code: WeatherConditionCode
  icon: string
  humidity: number
  feels_like: number
  wind_gust: number
  uv_index: number
  icon_path: string
}

export type DailyWeather = {
  date: string
  temp_min: number
  temp_max: number
  precipitation_sum: number
  sunrise: string
  sunset: string
  condition_code: WeatherConditionCode
  icon: string
  precipitation_probability: number
  wind_max: number
  icon_path: string
}

export type ClientGeo = {
  country: string
  ip_hash: string
}

export type WeatherResponse = {
  location: WeatherLocation
  current: CurrentWeather
  hourly: HourlyWeather[]
  daily: DailyWeather[]
  client_geo: ClientGeo
}
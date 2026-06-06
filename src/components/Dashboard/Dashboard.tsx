import { WeatherDashboard } from './parts/WeatherDashboard'
import type { WeatherResponse } from './types/weather'
import data from './dummy/weather.dummy.json' with { type: 'json' }

// Paste your API response here, or fetch it:
const weatherData: WeatherResponse = {
  ...data,
} as unknown as WeatherResponse

export default function Dashboard() {
  return <WeatherDashboard data={weatherData} />
}
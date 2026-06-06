// import type { WeatherResponse } from '../types/weather'
import { WeatherHero } from './WeatherHero'
import { HourlyForecast } from './HourlyForecast'
import { AirConditions } from './AirConditions'
import { WeeklyForecast } from './WeeklyForecast'
import { use } from 'react'
import { getWeatherData } from '../../api/weather-ai'
import { useLocation, useSearchParams } from 'react-router-dom'


export default function WeatherDashboard() {

  const getOnlyThirdDecimal = (num: number) => {
    return Math.round(num * 1000) / 1000
  }

  const locationReact = useLocation()
  const [searchParams] = useSearchParams()
  const predefinedLocation = locationReact?.state?.location || {}

  const lat = getOnlyThirdDecimal(parseFloat(predefinedLocation.lat || searchParams.get('lat') || '0'))
  const lon = getOnlyThirdDecimal(parseFloat(predefinedLocation.lon || searchParams.get('lon') || '0'))
  const token = searchParams.get('token')
  const label = searchParams.get('label') || predefinedLocation.label || ''

  const data = use(getWeatherData(token ?? '', lat ?? 0, lon ?? 0))

  const { location, current, hourly, daily } = data || {}

  const now = new Date()
  const currentHourly =
    hourly?.find((h) => new Date(h.time) >= now) ?? hourly?.[0]

  const today = daily?.[0]

  return (
    <div className="flex h-full md:h-auto flex-col md:flex-row gap-5 w-full max-w-[920px]">
      <div className="flex flex-col gap-5 w-full h-full max-w-[600px]">
        <WeatherHero location={location} current={current} today={today} countrySearchedName={label} />
        <HourlyForecast hourly={hourly || []} count={6} />
        <AirConditions current={currentHourly} />
      </div>
      <div className="flex flex-col gap-5">
        <WeeklyForecast daily={daily} />
      </div>
    </div>
  )
}

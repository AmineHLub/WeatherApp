import type { WeatherResponse } from '../types/weather'
import { WeatherHero } from './WeatherHero'
import { HourlyForecast } from './HourlyForecast'
import { AirConditions } from './AirConditions'
import { WeeklyForecast } from './WeeklyForecast'

type Props = {
  data: WeatherResponse
}

export function WeatherDashboard({ data }: Props) {
  const { location, current, hourly, daily } = data

  // Find the hourly slot closest to now for air conditions
  const now = new Date()
  const currentHourly =
    hourly.find((h) => new Date(h.time) >= now) ?? hourly[0]

  const today = daily[0]

  return (
    <div className="w-full h-full overflow-x-hidden c-scrollbar-thin pr-3 -mr-3 flex items-center justify-center">
      <div className="flex h-full md:h-auto flex-col md:flex-row gap-5 w-full max-w-[920px]">
        <div className="flex flex-col gap-5 w-full h-full max-w-[600px]">
          <WeatherHero location={location} current={current} today={today} />
          <HourlyForecast hourly={hourly} count={6} />
          <AirConditions current={currentHourly} />
        </div>
        <div className="flex flex-col gap-5">
          <WeeklyForecast daily={daily} />
        </div>
      </div>
    </div>
  )
}

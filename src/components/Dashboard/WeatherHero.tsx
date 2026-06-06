import SVGParser from '../../utils/SVGParser'
import type { WeatherLocation, CurrentWeather, DailyWeather } from '../../types/weather.types'

type Props = {
  location: WeatherLocation | undefined
  current: CurrentWeather | undefined
  today: DailyWeather | undefined
}

const conditionLabel: Record<string, string> = {
  '0': 'Clear sky',
  '1': 'Mainly clear',
  '2': 'Partly cloudy',
  '3': 'Overcast',
  '45': 'Foggy',
  '48': 'Icy fog',
  '51': 'Light drizzle',
  '53': 'Drizzle',
  '55': 'Heavy drizzle',
  '61': 'Light rain',
  '63': 'Rain',
  '65': 'Heavy rain',
  '71': 'Light snow',
  '73': 'Snow',
  '75': 'Heavy snow',
  '80': 'Rain showers',
  '95': 'Thunderstorm',
}

export function WeatherHero({ location, current, today }: Props) {
  const label = current?.condition_code ? conditionLabel[current?.condition_code] : 'Unknown'
  const rainChance = today?.precipitation_probability

  const url = current?.icon

  return (
    <div className="flex items-center justify-between px-7 py-6 bg-secondary-bg rounded-2xl min-h-[160px] font-syne">
      <div className="flex flex-col gap-4">
        <div className="hero-location">
          <h1 className="text-[28px] font-[800] leading-[1] text-text">{location?.country}</h1>
          <p className="text-[13px] font-[400] text-text-secondary">Chance of rain: {rainChance}%</p>
        </div>
        <div className="text-[48px] md:text-[64px] font-[700] text-text leading-[1] mt-1">{Math.round(current?.temperature ?? 0)}°</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <SVGParser url={url || ''} className="w-24 h-24 drop-shadow-[0_8px_24px_rgba(240,192,96,0.35)]" name={label} fill="var(--color-text)" />
        <span className="text-[13px] font-[400] text-text">{label}</span>
      </div>
    </div>
  )
}

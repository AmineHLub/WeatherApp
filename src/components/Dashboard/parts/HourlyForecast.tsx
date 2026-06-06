import SVGParser from '../../../utils/SVGParser'
import type { HourlyWeather } from '../types/weather'

type Props = {
  hourly: HourlyWeather[]
  /** How many slots to show, default 6 */
  count?: number
}

function formatHour(isoTime: string): string {
  const date = new Date(isoTime)
  const h = date.getHours()
  const period = h >= 12 ? 'PM' : 'AM'
  const display = h % 12 === 0 ? 12 : h % 12
  return `${display}:00 ${period}`
}

export function HourlyForecast({ hourly, count = 6 }: Props) {
  // Start from the next whole hour
  const now = new Date()
  const upcoming = hourly
    .filter((h) => new Date(h.time) >= now)
    .slice(0, count)

  return (
    <div className="px-7 py-6 bg-secondary-bg rounded-2xl">
      <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-text-secondary mb-4">TODAY'S FORECAST</p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {upcoming.map((slot) => (
          <div key={slot.time} className="flex flex-col items-center gap-2 px-3 py-6 rounded-lg transition-colors hover:bg-primary-bg/50 cursor-pointer">
            <span className="text-[11px] text-text-secondary font-medium whitespace-nowrap">{formatHour(slot.time)}</span>
            <SVGParser url={slot.icon} className="w-15 h-15 object-contain" fill="var(--color-text)" />
            <span className="font-syne text-[18px] font-bold text-text">{Math.round(slot.temperature)}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}

import SVGParser from '../../../utils/SVGParser'
import type { DailyWeather } from '../types/weather'

type Props = {
  daily: DailyWeather[]
}

const conditionLabel: Record<string, string> = {
  '0': 'Sunny',
  '1': 'Sunny',
  '2': 'Partly cloudy',
  '3': 'Cloudy',
  '45': 'Foggy',
  '48': 'Foggy',
  '51': 'Drizzle',
  '53': 'Drizzle',
  '55': 'Drizzle',
  '61': 'Rainy',
  '63': 'Rainy',
  '65': 'Rainy',
  '71': 'Snowy',
  '73': 'Snowy',
  '75': 'Snowy',
  '80': 'Rainy',
  '95': 'Storm',
  '96': 'Storm',
  '99': 'Storm',
}

function dayLabel(dateStr: string, index: number): string {
  if (index === 0) return 'Today'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export function WeeklyForecast({ daily }: Props) {
  return (
    <div className="h-full flex flex-col px-7 py-6 bg-secondary-bg rounded-2xl weekly-card">
      <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-text-secondary mb-[16px]">7-DAY FORECAST</p>
      <div className="flex flex-col gap-2 flex-1">
        {daily.map((day, i) => (
          <div key={day.date} className="grid grid-cols-[48px_32px_1fr_auto] items-center gap-[10px] px-[8px] py-[10px] rounded-sm transition-colors hover:bg-primary-bg/50 cursor-pointer">
            <span className="text-[13px] font-weight-500 text-text-secondary">{dayLabel(day.date, i)}</span>
            <SVGParser url={day.icon} className="w-[24px] h-[24px] object-contain" name={day.condition_code} fill="var(--color-text)" />
            <span className="text-[13px] font-weight-500 text-text">{conditionLabel[day.condition_code] ?? '—'}</span>
            <span className="flex items-baseline gap-[2px] font-syne">
              <span className="text-[15px] font-weight-500 text-text">{Math.round(day.temp_max)}</span>
              <span className="text-[13px] font-weight-500 text-text-secondary">/{Math.round(day.temp_min)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

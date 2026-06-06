import type { HourlyWeather } from '../../types/weather.types'

type Props = {
  current: HourlyWeather | undefined
}

export function AirConditions({ current }: Props) {
  return (
    <div className="px-7 py-6 bg-secondary-bg rounded-2xl">
      <div className="flex items-center justify-between mb-[16px]">
        <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-text-secondary mb-4">AIR CONDITIONS</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium">
            <svg className="opacity-60 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            Real Feel
          </div>
          <div className="font-syne text-[22px] font-bold text-text leading-[1]">{Math.round(current?.feels_like ?? 0)}°</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium">
            <svg className="opacity-60 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
            </svg>
            Wind
          </div>
          <div className="font-syne text-[22px] font-bold text-text leading-[1]">{current?.wind_speed ?? 0} km/h</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium">
            <svg className="opacity-60 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
            Chance of rain
          </div>
          <div className="font-syne text-[22px] font-bold text-text leading-[1]">{current?.precipitation_probability ?? 0}%</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium">
            <svg className="opacity-60 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
            </svg>
            UV Index
          </div>
          <div className="font-syne text-[22px] font-bold text-text leading-[1]">{current?.uv_index ?? 0}</div>
        </div>
      </div>
    </div>
  )
}

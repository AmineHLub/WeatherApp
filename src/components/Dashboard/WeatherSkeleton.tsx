
export default function WeatherSkeleton() {
  return (
    <div className="flex h-full md:h-auto flex-col md:flex-row gap-5 w-full max-w-[920px]">
      <div className="flex flex-col gap-5 w-full h-full max-w-[600px]">
        <div className="flex items-center justify-between px-7 py-6 bg-secondary-bg rounded-2xl min-h-[160px] animate-pulse">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-7 w-32 rounded-md bg-text-secondary/10" />
              <div className="h-3 w-24 rounded-md bg-text-secondary/10" />
            </div>

            <div className="h-16 w-28 rounded-md bg-text-secondary/10" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-text-secondary/10" />
            <div className="h-3 w-20 rounded-md bg-text-secondary/10" />
          </div>
        </div>
        <div className="px-7 py-6 bg-secondary-bg rounded-2xl animate-pulse">
          <div className="h-3 w-32 rounded bg-text-secondary/10 mb-4" />

          <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 px-3 py-6 rounded-lg"
              >
                <div className="h-3 w-12 rounded bg-text-secondary/10" />

                <div className="w-15 h-15 rounded-full bg-text-secondary/10" />

                <div className="h-6 w-10 rounded bg-text-secondary/10" />
              </div>
            ))}
          </div>
        </div>
        <div className="px-7 py-6 bg-secondary-bg rounded-2xl animate-pulse">
          <div className="h-3 w-28 rounded bg-text-secondary/10 mb-[16px]" />

          <div className="grid grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-[14px] h-[14px] rounded-full bg-text-secondary/10 shrink-0" />
                  <div className="h-3 w-20 rounded bg-text-secondary/10" />
                </div>

                <div className="h-7 w-16 rounded bg-text-secondary/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="h-full flex flex-col px-7 py-6 bg-secondary-bg rounded-2xl animate-pulse">
          <div className="h-3 w-32 rounded bg-text-secondary/10 mb-[16px]" />

          <div className="flex flex-col gap-2 flex-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[48px_32px_1fr_auto] items-center gap-[10px] px-[8px] py-[10px]"
              >
                {/* Day */}
                <div className="h-4 w-10 rounded bg-text-secondary/10" />

                {/* Weather icon */}
                <div className="w-[24px] h-[24px] rounded-full bg-text-secondary/10" />

                {/* Condition */}
                <div
                  className={`h-4 rounded bg-text-secondary/10 ${i % 3 === 0
                      ? 'w-16'
                      : i % 3 === 1
                        ? 'w-20'
                        : 'w-12'
                    }`}
                />

                {/* Temperature */}
                <div className="h-4 w-12 rounded bg-text-secondary/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

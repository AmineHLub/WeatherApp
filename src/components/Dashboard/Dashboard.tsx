import { Suspense } from 'react'
import WeatherSkeleton from './WeatherSkeleton'
import WeatherDashboard from './WeatherDashboard'
import { ErrorBoundary } from './ErrorBoundary'


export default function Dashboard() {

  return (
    <div className="w-full h-full overflow-x-hidden c-scrollbar-thin pr-3 -mr-3 flex items-center justify-center">
      <ErrorBoundary>
        <Suspense fallback={<WeatherSkeleton />}>
          <WeatherDashboard />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

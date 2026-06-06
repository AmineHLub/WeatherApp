import { Suspense } from 'react'
import WeatherSkeleton from './WeatherSkeleton'
import WeatherDashboard from './WeatherDashboard'
import { ErrorBoundary } from './ErrorBoundary'
import { Link } from 'react-router-dom'


export default function Dashboard() {

  return (
    <div className="w-full h-full overflow-x-hidden c-scrollbar-thin pr-3 -mr-3 flex items-center justify-center relative">
      <Link to='/' className='absolute top-0 left-0 p-1 rounded-full text-text font-syne cursor-pointer hover:underline'>
        {
          '← BACK'
        }
      </Link>
      <ErrorBoundary>
        <Suspense fallback={<WeatherSkeleton />}>
          <WeatherDashboard />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

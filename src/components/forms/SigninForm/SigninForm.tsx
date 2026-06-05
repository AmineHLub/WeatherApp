import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

type LocationData = {
  lat: number
  lon: number
  city?: string
  country?: string
  label: string
}

type LocationStatus = 'idle' | 'loading' | 'success' | 'error' | 'manual'

type SearchResult = {
  display_name: string
  lat: string
  lon: string
}

function SigninForm() {
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle')
  const [location, setLocation] = useState<LocationData | null>(null)
  const [locationError, setLocationError] = useState<string>('')
  const [token, setToken] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showManualSearch, setShowManualSearch] = useState(false)
  const [tokenError, setTokenError] = useState<string>('')
  const searchRef = useRef<HTMLDivElement>(null)
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useNavigate()
  const isReady = location !== null && token.trim().length > 0

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function requestLocation() {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by your browser.')
      setLocationStatus('error')
      return
    }
    setLocationStatus('loading')
    setLocationError('')
    setLocation(null)

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await res.json()
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            ''
          const country = data.address?.country || ''
          setLocation({
            lat: latitude,
            lon: longitude,
            city,
            country,
            label: city && country ? `${city}, ${country}` : data.display_name,
          })
          setLocationStatus('success')
          setShowManualSearch(false)
        } catch {
          // fallback: just show coords
          setLocation({
            lat: latitude,
            lon: longitude,
            label: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          })
          setLocationStatus('success')
          setShowManualSearch(false)
        }
      },
      (err) => {
        setLocationError(
          err.code === 1
            ? 'Location access denied. Search manually below.'
            : 'Could not determine location.'
        )
        setLocationStatus('error')
        setShowManualSearch(true)
      },
      { timeout: 10000 }
    )
  }

  function handleSearchInput(value: string) {
    setSearchQuery(value)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    if (value.trim().length < 2) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }
    setIsSearching(true)
    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5`
        )
        const data: SearchResult[] = await res.json()
        setSearchResults(data)
        setShowDropdown(data.length > 0)
      } catch {
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 400)
  }

  function selectSearchResult(result: SearchResult) {
    const parts = result.display_name.split(', ')
    const label = parts.slice(0, 2).join(', ')
    setLocation({
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
      label,
    })
    setLocationStatus('manual')
    setShowDropdown(false)
    setSearchQuery('')
  }

  const locationDisplay = () => {
    if (locationStatus === 'idle') return null
    if (locationStatus === 'loading') {
      return (
        <div className="flex items-center gap-2 text-text/40 text-sm">
          <span className="inline-block w-3.5 h-3.5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          Detecting location…
        </div>
      )
    }
    if (locationStatus === 'error') {
      return (
        <div className="flex items-center gap-2 text-red-400/80 text-sm">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {locationError}
        </div>
      )
    }
    if ((locationStatus === 'success' || locationStatus === 'manual') && location) {
      return (
        <div className="flex items-center gap-2 text-text/90 text-sm max-w-full">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="truncate">{location.label}</span>
          <span className="text-text/30 text-xs ml-auto shrink-0">
            {location.lat.toFixed(3)}, {location.lon.toFixed(3)}
          </span>
        </div>
      )
    }
    return null
  }

  const validateToken = (token: string) => {
    const pattern = /^wai_[a-z0-9]+\.[a-z0-9]+$/i
    console.log('Validating token:', token, 'Result:', pattern.test(token.trim()))
    return pattern.test(token.trim())
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isReady) return
    if (!validateToken(token)) {
      setTokenError('Invalid token format.')
      return
    }
    navigate(`/weather?lat=${location!.lat}&lon=${location!.lon}&token=${encodeURIComponent(token.trim())}`)
  }

  return (
    <form
      className="w-full h-full flex flex-col items-center rounded-[20px] justify-center gap-5"
      onSubmit={handleSubmit}
    >
      {/* Location card */}
      <div className="w-full max-w-sm flex flex-col gap-2">
        <label className="text-xs font-medium text-text/40 tracking-widest uppercase">
          Location
        </label>

        {/* Display tile */}
        <div
          className={[
            'w-full rounded-xl border px-4 py-3 min-h-[48px] flex items-center transition-all duration-300',
            locationStatus === 'idle' || locationStatus === 'loading'
              ? 'border-white/10 bg-white/5'
              : locationStatus === 'error'
                ? 'border-red-500/30 bg-red-500/5'
                : 'border-white/15 bg-white/8',
          ].join(' ')}
        >
          {locationStatus === 'idle' ? (
            <span className="text-text/25 text-sm italic">Waiting for location…</span>
          ) : (
            locationDisplay()
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2 mt-0.5">
          <button
            type="button"
            onClick={requestLocation}
            disabled={locationStatus === 'loading'}
            className="flex items-center gap-1.5 text-xs text-text/40 hover:text-text/70 transition-colors disabled:opacity-30 disabled:cursor-default"
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.5 8A5.5 5.5 0 1 1 8 2.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M13.5 2.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Use my location
          </button>
          <span className="text-text/20 text-xs">or</span>
          <button
            type="button"
            onClick={() => setShowManualSearch((v) => !v)}
            className="text-xs text-text/40 hover:text-text/70 transition-colors"
          >
            Search manually
          </button>
        </div>

        {/* Manual search */}
        {showManualSearch && (
          <div ref={searchRef} className="relative mt-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder="City, address, or coordinates…"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-text placeholder-white/25 outline-none focus:border-white/30 focus:bg-white/8 transition-all pr-8"
              />
              {isSearching && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-white/20 border-t-white/50 rounded-full animate-spin" />
              )}
            </div>

            {showDropdown && (
              <ul className="absolute z-50 mt-1 w-full rounded-xl border border-white/15 bg-[#0e0e14] shadow-2xl overflow-hidden">
                {searchResults.map((r, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => selectSearchResult(r)}
                      className="w-full text-left px-4 py-2.5 text-sm text-text/70 hover:bg-white/8 hover:text-text transition-colors flex items-start gap-2"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-text/30">
                        <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                      <span className="truncate">{r.display_name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-full max-w-sm h-px bg-white/8" />

      {/* Bearer token */}
      <div className="w-full max-w-sm flex flex-col gap-2">
        <label className="text-xs font-medium text-text/40 tracking-widest uppercase">
          Bearer Token
        </label>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your token…"
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-text placeholder-white/25 outline-none focus:border-white/30 focus:bg-white/8 transition-all font-mono tracking-wider"
          autoComplete="off"
        />
        {token.length > 0 && !tokenError ? (
          <p className="text-xs text-text/30 flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Token received
          </p>
        ) : tokenError ? (
          <p className="text-xs text-red-400/80 flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {tokenError}
          </p>
        ) : (
          <p className="text-xs text-text/30">Your token should start with "wai_"</p>
        )}
      </div>

      {/* Go button */}
      <div className="w-full max-w-sm mt-2">
        <button
          type="submit"
          disabled={!isReady}
          className={[
            'w-full rounded-xl py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300',
            isReady
              ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_24px_rgba(255,255,255,0.15)] cursor-pointer'
              : 'bg-white/8 text-text/20 cursor-default',
          ].join(' ')}
        >
          Go
        </button>
        {!isReady && (
          <p className="text-center text-xs text-text/20 mt-2">
            {!location && !token
              ? 'Set location and token to continue'
              : !location
                ? 'Location required'
                : 'Token required'}
          </p>
        )}
      </div>
    </form>
  )
}

export default SigninForm

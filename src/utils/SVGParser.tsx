import { useEffect, useState, createElement } from 'react'

type SVGParserProps = { url: string } & React.SVGProps<SVGSVGElement>

function SVGParser({ url, ...props }: SVGParserProps) {

  console.log(url)

  const [svg, setSvg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then((r) => r.text())
      .then(setSvg)
      .catch((e) => {
        console.error('Failed to fetch SVG:', e)
        setSvg('')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [url])

  const sanitizer = (svg: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svg, 'image/svg+xml')
    const svgElement = doc.querySelector('svg')

    if (svgElement) {
      return createElement('svg', {
        ...props,
        viewBox: svgElement.getAttribute('viewBox') || '0 0 24 24',
        dangerouslySetInnerHTML: { __html: svgElement.innerHTML },
      })
    }

    return ''
  }

  if (loading) {
    return (
      <div className="w-24 h-24 animate-pulse text-text-secondary/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="var(--color-text-secondary)"
          className="w-full h-full"
        >
          <path d="M22 50h22c8.8 0 16-7.2 16-16 0-7.8-5.6-14.3-13-15.7C45.7 10.1 38.6 4 30 4c-10.1 0-18.4 8.1-18.8 18.2C5.2 24.6 0 30.6 0 38c0 6.6 5.4 12 12 12h10z" />
        </svg>
      </div>
    )
  }

  return (
    svg ?
      (
        sanitizer(svg)
      ) : (
        <svg {...props} viewBox="0 0 54 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5938 40.9688H39.1875C47.025 40.9688 53.4375 34.5563 53.4375 26.7188C53.4375 19.7719 48.45 13.9828 41.8594 12.7359C40.7016 5.43281 34.3781 0 26.7188 0C17.7234 0 10.3312 7.21406 9.975 16.2094C4.63125 18.3469 0 23.6906 0 30.2812C0 36.1594 4.80938 40.9688 10.6875 40.9688H19.5938Z" fill="white" />
          <path d="M23.1562 24.9375C24.14 24.9375 24.9375 24.14 24.9375 23.1562C24.9375 22.1725 24.14 21.375 23.1562 21.375C22.1725 21.375 21.375 22.1725 21.375 23.1562C21.375 24.14 22.1725 24.9375 23.1562 24.9375Z" fill="black" />
          <path d="M33.8438 24.9375C34.8275 24.9375 35.625 24.14 35.625 23.1562C35.625 22.1725 34.8275 21.375 33.8438 21.375C32.86 21.375 32.0625 22.1725 32.0625 23.1562C32.0625 24.14 32.86 24.9375 33.8438 24.9375Z" fill="black" />
          <path d="M23.1562 32.0625C24.9375 30.2812 32.0625 30.2812 33.8438 32.0625" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <path d="M39.1875 16.9219C39.1875 14.25 40.9688 12.4688 43.6406 12.4688C46.3125 12.4688 48.0938 14.25 48.0938 16.9219C48.0938 20.4844 43.6406 20.4844 43.6406 24.0469" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <path d="M43.1953 29.3906C43.9331 29.3906 44.5312 28.7925 44.5312 28.0547C44.5312 27.3169 43.9331 26.7188 43.1953 26.7188C42.4575 26.7188 41.8594 27.3169 41.8594 28.0547C41.8594 28.7925 42.4575 29.3906 43.1953 29.3906Z" fill="black" />
        </svg>
      )
  )
}

export default SVGParser
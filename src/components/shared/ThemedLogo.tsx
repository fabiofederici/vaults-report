import { useState, useEffect, useRef } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface ThemedLogoProps {
  slug: string
  name: string
  className?: string
  isDark?: boolean // Kept for backward compatibility but ignored
}

export function ThemedLogo({ slug, name, className = 'size-6' }: ThemedLogoProps) {
  const lightSrc = `${import.meta.env.BASE_URL}assets/logos/normalized/${slug}-light.svg`
  const darkSrc = `${import.meta.env.BASE_URL}assets/logos/normalized/${slug}-dark.svg`

  const [lightLoaded, setLightLoaded] = useState(false)
  const [darkLoaded, setDarkLoaded] = useState(false)
  const lightRef = useRef<HTMLImageElement>(null)
  const darkRef = useRef<HTMLImageElement>(null)

  // Check if images are already loaded (from cache)
  useEffect(() => {
    if (lightRef.current?.complete) setLightLoaded(true)
    if (darkRef.current?.complete) setDarkLoaded(true)
  }, [])

  const loaded = lightLoaded && darkLoaded

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-sm" />}
      <img
        ref={lightRef}
        src={lightSrc}
        alt={name}
        className={`w-full h-full object-contain dark:hidden ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        onLoad={() => setLightLoaded(true)}
      />
      <img
        ref={darkRef}
        src={darkSrc}
        alt={name}
        className={`w-full h-full object-contain hidden dark:block absolute inset-0 ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        onLoad={() => setDarkLoaded(true)}
      />
    </div>
  )
}

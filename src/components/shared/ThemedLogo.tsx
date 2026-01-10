import { useState, useEffect, useRef } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface ThemedLogoProps {
  slug: string
  name: string
  isDark: boolean
  className?: string
}

export function ThemedLogo({ slug, name, isDark, className = 'size-6' }: ThemedLogoProps) {
  const [loaded, setLoaded] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(isDark)
  const imgRef = useRef<HTMLImageElement>(null)

  const src = `${import.meta.env.BASE_URL}assets/logos/normalized/${slug}-${isDark ? 'dark' : 'light'}.svg`

  // Reset loaded state when theme changes
  useEffect(() => {
    if (isDark !== currentTheme) {
      setLoaded(false)
      setCurrentTheme(isDark)
    }
  }, [isDark, currentTheme])

  // Check if image is already loaded (from cache)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true)
    }
  }, [src])

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-sm" />}
      <img
        ref={imgRef}
        src={src}
        alt={name}
        className={`w-full h-full object-contain ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

import { useState, useEffect, useCallback } from 'react'

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number>) => void
    }
  }
}
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { ProjectHoverContent } from '@/components/shared/ProjectHoverContent'
import { ThemedLogo } from '@/components/shared/ThemedLogo'
import type { DirectoryEntry } from '@/lib/directory'

type ItemTileProps = {
  entry: DirectoryEntry
  category: string
  size?: number // default 64
}

export function ItemTile({ entry, category, size = 64 }: ItemTileProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    // Mirror Layout.astro logic
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') return true
    if (stored === 'light') return false
    // System preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const handleCardView = useCallback(() => {
    window.umami?.track('project_card_view', { project: entry.name, category })
  }, [entry.name, category])

  // Get first word only
  const shortName = entry.name.split(' ')[0]

  // Check if this is a dummy item (for dev testing)
  const isDummy = entry.slug.startsWith('dummy-')

  // Scale factor for logo and text based on size
  const scale = size / 64
  const logoSize = Math.floor(28 * scale) // base 28px (w-7)
  const fontSize = Math.max(6, Math.floor(8 * scale)) // base 8px, min 6px

  // Render simple tile for dummy items (no hover card)
  if (isDummy) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-0.5 p-1"
        style={{ width: size, height: size }}
        title={entry.name}
      >
        <div
          className="bg-red-500 border-2 border-dashed border-red-700"
          style={{ width: logoSize, height: logoSize }}
        />
        <span
          className="text-red-500 w-full text-center leading-tight truncate mt-1"
          style={{ fontSize: `${fontSize}px` }}
        >
          {shortName}
        </span>
      </div>
    )
  }

  return (
    <HoverCard openDelay={200} closeDelay={100} onOpenChange={(open) => open && handleCardView()}>
      <HoverCardTrigger asChild>
        <div
          className="flex flex-col items-center justify-center gap-0.5 p-1 cursor-pointer"
          style={{ width: size, height: size }}
          title={entry.name}
        >
          <div style={{ width: logoSize, height: logoSize }}>
            <ThemedLogo
              slug={entry.slug}
              name={entry.name}
              isDark={isDark}
              className="w-full h-full"
            />
          </div>
          <span
            className="text-muted-foreground w-full text-center leading-tight truncate mt-1"
            style={{ fontSize: `${fontSize}px` }}
          >
            {shortName}
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" align="center">
        <ProjectHoverContent entry={entry} category={category} isDark={isDark} />
      </HoverCardContent>
    </HoverCard>
  )
}

import { useState, useEffect } from 'react'
import { Minus, Plus } from '@phosphor-icons/react'

export type TileMode = 'squarify' | 'binary' | 'slice' | 'dice' | 'sliceDice'

const TILE_MODES: TileMode[] = ['squarify', 'binary', 'slice', 'dice', 'sliceDice']

type CategoryInfo = {
  name: string
  count: number
  originalCount: number
}

type DevToolbarProps = {
  tileMode: TileMode
  onTileModeChange: (mode: TileMode) => void
  categories: CategoryInfo[]
  onCountChange: (categoryName: string, delta: number) => void
  scale: number
  onScaleChange: (scale: number) => void
  innerPadding: number
  onInnerPaddingChange: (padding: number) => void
}

export function DevToolbar({
  tileMode,
  onTileModeChange,
  categories,
  onCountChange,
  scale,
  onScaleChange,
  innerPadding,
  onInnerPaddingChange,
}: DevToolbarProps) {
  const [isDebug, setIsDebug] = useState(false)

  useEffect(() => {
    setIsDebug(document.documentElement.dataset.debug === 'true')
  }, [])

  if (!isDebug) return null

  return (
    <div className="mt-4 p-4 border-2 border-dashed border-red-500 bg-background text-xs space-y-4">
      <div className="font-bold text-red-500">Dev Toolbar (localhost only)</div>

      {/* Tile Mode Selector */}
      <div className="flex items-center gap-2">
        <span className="font-medium w-24">Tile Mode:</span>
        <select
          value={tileMode}
          onChange={(e) => onTileModeChange(e.target.value as TileMode)}
          className="border px-2 py-1 bg-background"
        >
          {TILE_MODES.map((mode) => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
      </div>

      {/* Scale Control */}
      <div className="flex items-center gap-2">
        <span className="font-medium w-24">Scale:</span>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => onScaleChange(parseFloat(e.target.value))}
          className="w-32"
        />
        <span className="w-8">{scale.toFixed(1)}</span>
      </div>

      {/* Inner Padding Control */}
      <div className="flex items-center gap-2">
        <span className="font-medium w-24">Inner Padding:</span>
        <input
          type="range"
          min="0"
          max="24"
          step="2"
          value={innerPadding}
          onChange={(e) => onInnerPaddingChange(parseInt(e.target.value))}
          className="w-32"
        />
        <span className="w-8">{innerPadding}px</span>
      </div>

      {/* Category Item Controls */}
      <div className="space-y-1">
        <span className="font-medium">Category Items:</span>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <span className="w-32 truncate" title={cat.name}>{cat.name}</span>
              <button
                onClick={() => onCountChange(cat.name, -1)}
                disabled={cat.count <= 0}
                className="w-6 h-6 flex items-center justify-center border hover:bg-muted disabled:opacity-30"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center">
                {cat.count}
                {cat.count !== cat.originalCount && (
                  <span className="text-red-500 ml-0.5">
                    ({cat.count - cat.originalCount > 0 ? '+' : ''}{cat.count - cat.originalCount})
                  </span>
                )}
              </span>
              <button
                onClick={() => onCountChange(cat.name, 1)}
                className="w-6 h-6 flex items-center justify-center border hover:bg-muted"
              >
                <Plus className="size-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

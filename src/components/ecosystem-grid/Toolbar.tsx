import { DownloadSimple } from '@phosphor-icons/react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'

export type ExportFormat = 'png' | 'jpeg'

type ToolbarProps = {
  onExport: (format: ExportFormat) => void
}

export function Toolbar({ onExport }: ToolbarProps) {
  return (
    <div className="flex items-center gap-1">
      <Menubar className="border-0 bg-transparent p-0 h-auto">
        <MenubarMenu>
          <MenubarTrigger
            className="h-8 px-2 border rounded-none bg-background hover:bg-muted flex items-center justify-center cursor-pointer"
            title="Download"
          >
            <DownloadSimple className="size-4" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => onExport('png')}>PNG</MenubarItem>
            <MenubarItem onClick={() => onExport('jpeg')}>JPEG</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

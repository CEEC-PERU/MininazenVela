import { SidebarTrigger } from "@/components/ui/sidebar"

interface AdminPageLayoutProps {
  children: React.ReactNode
  title: string
}

export function AdminPageLayout({ children, title }: AdminPageLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold">{title}</h1>
      </header>
      <div className="flex-1 overflow-auto p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}
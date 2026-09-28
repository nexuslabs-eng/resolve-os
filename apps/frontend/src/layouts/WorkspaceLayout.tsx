import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WorkspaceHeader } from "@/features/workspace/components/WorkspaceHeader";
import { WorkspaceSidebar } from "@/features/workspace/components/WorkspaceSidebar";

export const WorkspaceLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-svh overflow-hidden bg-background text-foreground">
        <div className={`relative hidden h-full shrink-0 border-r border-border transition-[width] duration-200 md:block ${collapsed ? "w-18" : "w-62"}`}>
          <WorkspaceSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-71.5 border-r border-border bg-surface-inset p-0">
            <SheetTitle className="sr-only">Workspace navigation</SheetTitle>
            <WorkspaceSidebar collapsed={false} mobile onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <WorkspaceHeader
            onOpenNavigation={() => setMobileOpen(true)}
            collapsed={collapsed}
            onToggleSidebar={() => setCollapsed((value) => !value)}
          />
          <main className="min-h-0 flex-1 overflow-y-auto bg-background scrollbar-thin">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

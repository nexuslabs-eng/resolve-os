import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { ResolutionNode } from "@/features/landing/brand/ResolutionNode";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/use-theme-store";
import { useUiStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why ResolveOS", href: "#why-resolveos" },
  { label: "Security", href: "#security" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen);
  const toggleMobileNav = useUiStore((s) => s.toggleMobileNav);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full pt-3 sm:pt-4">
      <div className="mx-auto w-full max-w-310 px-4 sm:px-8">
        <div
          className={cn(
            "rounded-xl border transition-[background-color,border-color,box-shadow] duration-300",
            scrolled
              ? "border-border-strong bg-surface/85 shadow-(--shadow-panel) backdrop-blur-xl"
              : "border-border bg-surface/55 backdrop-blur-md",
          )}
        >
          <div className="flex h-14 items-center gap-6 px-3 pr-2 sm:px-4 sm:pr-3">
            <a href="#top" className="flex shrink-0 items-center gap-2.5 text-primary-bright">
              <ResolutionNode className="h-6" title="ResolveOS" />
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                ResolveOS
              </span>
            </a>

            <nav aria-label="Main" className="hidden min-w-0 flex-1 items-center gap-0.5 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-surface-raised hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="ml-auto hidden items-center gap-1.5 md:flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Sign in
              </Button>
              <Button size="sm" variant="default">
                Request Access
              </Button>
            </div>

            <Button
              type="button"
              variant="subtle"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="group relative ml-auto overflow-hidden border-primary/15 bg-surface-inset text-muted-foreground shadow-[inset_0_1px_0_var(--hairline)] hover:border-primary/35 hover:text-primary-bright md:ml-0"
            >
              <span className="relative h-4 w-4" aria-hidden="true">
                <Sun
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-300 ease-out",
                    theme === "light"
                      ? "rotate-0 scale-100 opacity-100"
                      : "rotate-90 scale-0 opacity-0",
                  )}
                />
                <Moon
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-300 ease-out",
                    theme === "dark"
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-0 opacity-0",
                  )}
                />
              </span>
            </Button>

            <button
              type="button"
              onClick={toggleMobileNav}
              aria-expanded={mobileNavOpen}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground md:hidden"
            >
              {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {mobileNavOpen && (
            <div className="border-t border-border md:hidden">
              <nav aria-label="Mobile" className="flex flex-col p-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                  <Button variant="brand" size="sm">
                    Get started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

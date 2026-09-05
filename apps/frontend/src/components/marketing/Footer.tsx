import { ResolutionNode } from "@/components/brand/ResolutionNode";

const GROUPS = [
  { title: "Product", links: ["Product", "How it works", "Why ResolveOS", "Security"] },
  { title: "Resources", links: ["Documentation", "Architecture", "Guides"] },
  { title: "Company", links: ["About", "Contact", "GitHub"] },
  { title: "Legal", links: ["Privacy", "Terms"] },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface-inset/50">
      <div className="mx-auto w-full max-w-310 px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 text-primary-bright">
              <ResolutionNode className="h-6" title="ResolveOS" />
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                ResolveOS
              </span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              Evidence-aware incident investigation and controlled remediation for engineering teams. Investigate competing hypotheses, challenge assumptions, and act with human authorization.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} ResolveOS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
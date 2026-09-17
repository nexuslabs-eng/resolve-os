import { Link } from "react-router-dom";
import { ResolutionNode } from "@/components/brand/ResolutionNode";
import { cn } from "@/lib/utils";

interface AuthBrandProps {
    className?: string;
}

export const AuthBrand = ({ className }: AuthBrandProps) => {

    return (
        <Link
            to="/"
            aria-label="ResolveOS home"
            className={cn(
                "inline-flex items-center gap-3 text-primary-bright",
                className
            )}
        >
            <ResolutionNode className="h-6" />
            <span className="text-lg font-semibold text-foreground">ResolveOS</span>
        </Link>
    )
}
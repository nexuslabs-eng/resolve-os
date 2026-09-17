import { 
    FaGithub as Github, 
    FaGoogle as Google 
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";

export type SocialProvider = "google" | "github";

interface SocialAuthButtonsProps {
  mode: "login" | "signup";
  disabled?: boolean;
  onSelect: (provider: SocialProvider) => void;
}

export const SocialAuthButtons = ({
  mode,
  disabled = false,
  onSelect,
}: SocialAuthButtonsProps) => {
    const action = mode === "login" ? "Continue" : "Sign up";

    return (
        <>
        <div className="grid grid-cols-2 gap-3">
            <Button
            type="button"
            variant="subtle"
            disabled={disabled}
            className="h-11"
            onClick={() => onSelect("google")}
            >
            <Google aria-hidden="true" />
            {action} with Google
            </Button>

            <Button
            type="button"
            variant="subtle"
            className="h-11"
            onClick={() => onSelect("github")}
            disabled={disabled}
            >
            <Github aria-hidden="true" />
            {action} with GitHub
            </Button>
        </div>

        <div className="my-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
            or continue with email
            </span>
            <span className="h-px flex-1 bg-border" />
        </div>
        </>
    );
};

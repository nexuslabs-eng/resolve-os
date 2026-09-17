import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordFormSchema, PasswordResetTokenSchema, type ResetPasswordForm } from "contracts";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { AuthFormHeader } from "@/features/auth/components/AuthFormHeader";
import { AuthStatusPanel } from "@/features/auth/components/AuthStatusPanel";
import { AuthAlternateAction } from "@/features/auth/components/AuthAlternateAction";
import { AuthBackButton } from "@/features/auth/components/AuthBackButton";
import { AuthSubmitButton } from "@/features/auth/components/AuthSubmitButton";
import { resetPassword } from "@/features/auth/api/password-recovery";
import { isApiClientError } from "@/lib/api/api-client-error";

const ResetPassword = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = PasswordResetTokenSchema.safeParse(params.get("token"));

    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { errors, isSubmitting } } = useForm<ResetPasswordForm>({
        resolver: zodResolver(ResetPasswordFormSchema), 
        defaultValues: { password: "", confirmPassword: "" }, 
        mode: "onSubmit",
    });

    const submit = async (values: ResetPasswordForm) => {
        if (!token.success) return;

        try {
            await resetPassword({ token: token.data, password: values.password });
            navigate("/password-updated", {
                replace: true,
                state: { passwordUpdated: true },
            });
        } catch (error: unknown) {
            const code = isApiClientError(error) ? error.code : undefined;
            
            if (code === "PASSWORD_RESET_TOKEN_EXPIRED") {
                setError("root", {
                    message: "This reset link has expired. Request a new one.",
                });
                return;
            }

            if (code === "PASSWORD_RESET_TOKEN_INVALID") {
                setError("root", {
                    message: "This reset link is invalid or has already been used.",
                })
                return;
            }

            setError("root", { 
                message: "Unable to reset your password. Please try again.", 
            }); 
        }
    };

    if (!token.success) 
        return (
            <>
                <AuthFormHeader 
                    title="Invalid reset link" 
                    description="Request a new password reset link." 
                />
                
                <AuthAlternateAction 
                    message="" 
                    linkLabel="Request new link" 
                    to="/forgot-password" 
                />
            </>
        );
    
    return ( 
        <>
            <AuthBackButton disabled={isSubmitting} />

            <AuthFormHeader 
                title="Reset your password" 
                description="Choose a new password for your account." 
            />

            <form noValidate onSubmit={handleSubmit(submit)}>

                <div className="space-y-5">
                    {(["password", "confirmPassword"] as const).map(name =>
                        <Field key={name} name={name} invalid={Boolean(errors[name])}>
                            <FieldLabel>
                                {name === "password" 
                                    ? "New password" 
                                    : "Confirm password"
                                }
                            </FieldLabel>
                            
                            <PasswordInput 
                                autoComplete="new-password" 
                                disabled={isSubmitting} 
                                {...register(name)} 
                            />
                            
                            <FieldError match={Boolean(errors[name])}>
                                {errors[name]?.message}
                            </FieldError>
                        </Field>
                    )}
                </div>
                
                {errors.root && 
                    <p role="alert" className="mt-4 text-sm text-destructive">
                        {errors.root.message}
                    </p>
                }

                <AuthSubmitButton 
                    loading={isSubmitting} 
                    loadingLabel="Updating password"
                >
                    Update password
                </AuthSubmitButton>

            </form>
            
            <AuthAlternateAction 
                message="" 
                linkLabel="Request new link" 
                to="/forgot-password" 
            />
        </>
    );
};

export const PasswordUpdated = () => {
    const location = useLocation();

    if (location.state?.passwordUpdated !== true) {
        return <Navigate to="/forgot-password" replace />;
    }
    
    return (
        <AuthStatusPanel 
            icon={Check} 
            tone="success" 
            title="Password updated" 
            description="You can now sign in with your new password."
        >
            <AuthAlternateAction message="" linkLabel="Sign in" to="/login" />
        </AuthStatusPanel>
    );
};

export default ResetPassword;
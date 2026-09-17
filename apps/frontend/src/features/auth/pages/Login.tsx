import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MOCK_AUTH_DESTINATION } from "@/features/auth/fixtures/auth.constant";
import { AuthAlternateAction } from "@/features/auth/components/AuthAlternateAction";
import { AuthFormHeader } from "@/features/auth/components/AuthFormHeader";
import { AuthBackButton } from "@/features/auth/components/AuthBackButton";
import { AuthSubmitButton } from "@/features/auth/components/AuthSubmitButton";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { SocialAuthButtons } from "@/features/auth/components/SocialAuthButtons";
import { LoginSchema, type LoginValues } from "@/features/auth/schemas/auth.schemas";
import { login } from "@/features/auth/api/auth";
import { isApiClientError } from "@/lib/api/api-client-error"; 

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginValues>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
        defaultValues: { email: "", password: "" },
    });

    const completeLogin = async (values: LoginValues) => {
        try {
            const response = await login(values);

            if (response.onboarding.status === "COMPLETED") {
                navigate(MOCK_AUTH_DESTINATION, { replace: true });
                return;
            }

            const routes = {
                VERIFY_EMAIL: "/signup/verify-email",
                CREATE_WORKSPACE: "/signup/workspace",
                PROFILE: "/signup/profile",
                COMPLETE: "/signup/complete",
            } as const;

            navigate(routes[response.onboarding.nextStep]);
        } catch (error: unknown) {
            const code = isApiClientError(error) ? error.code : undefined;

            setError("root", {
                message:
                    code === "EMAIL_NOT_VERIFIED"
                        ? "Verify your email before signing in."
                        : code === "INVALID_CREDENTIALS"
                            ? "Invalid email or password."
                            : "Unable to sign in. Please try again.",
            });
        }
    };

    return (
        <>
            <AuthBackButton onClick={() => navigate("/")} disabled={isSubmitting} />

            <AuthFormHeader
                title="Welcome back"
                description="Sign in to your ResolveOS workspace."
            />

            <SocialAuthButtons mode="login" disabled onSelect={() => undefined} />

            <form noValidate onSubmit={handleSubmit(completeLogin)}>
                <div className="space-y-5">
                    <Field name="email" invalid={Boolean(errors.email)}>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                        type="email"
                        autoComplete="email"
                        placeholder="name@company.com"
                        {...register("email")}
                        />
                        <FieldError match={Boolean(errors.email)}>
                        {errors.email?.message}
                        </FieldError>
                    </Field>

                    <Field name="password" invalid={Boolean(errors.password)}>
                        <div className="flex items-center justify-between gap-4">
                            <FieldLabel>Password</FieldLabel>
                        
                            <Link
                                to="/forgot-password"
                                className="text-xs font-medium text-primary-bright"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        
                        <PasswordInput
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        
                        <FieldError match={Boolean(errors.password)}>
                        {errors.password?.message}
                        </FieldError>
                    </Field>
                </div>

                {errors.root?.message && (
                    <p role="alert" className="mt-4 text-sm text-destructive">
                        {errors.root.message}
                    </p>
                )}

                <AuthSubmitButton disabled={!isValid} loading={isSubmitting} loadingLabel="Signing in">
                    Sign in
                </AuthSubmitButton>
            </form>

            <AuthAlternateAction
                message="New to ResolveOS?"
                linkLabel="Create an account"
                to="/signup/account"
            />
        </>
    );
};

export default Login;

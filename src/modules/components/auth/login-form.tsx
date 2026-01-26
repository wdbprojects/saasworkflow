"use client";

import { ComponentProps, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/schemas/auth-schemas";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from "lucide-react";
import { loginAction } from "@/_actions/auth-actions";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { FaGoogle, FaGithub } from "react-icons/fa";

const LoginForm = ({ className, ...props }: ComponentProps<"div">) => {
  const [pendingLogin, startLoginTransition] = useTransition();
  const [pendingGithubLogin, startGithubLoginTransition] = useTransition();
  const [pendingGoogleLogin, startGoogleLoginTransition] = useTransition();
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: LoginSchemaType) => {
    startLoginTransition(async () => {
      const response = await loginAction(data);
      if (response.success) {
        toast.success(response.message);
        reset();
        router.push(routes.home);
      } else {
        toast.error(response.message);
      }
    });
  };

  const signInGithub = () => {
    startGithubLoginTransition(async () => {
      await authClient.signIn.social(
        {
          provider: "github",
          callbackURL: routes.dashboard,
        },
        {
          onSuccess: () => {
            toast.success("Successfully logged in with Github");
          },
        },
      );
    });
  };

  const signInGoogle = () => {
    startGoogleLoginTransition(async () => {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: routes.dashboard,
        },
        {
          onSuccess: () => {
            toast.success("Successfully logged in with Google");
          },
        },
      );
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* LEFT SIDE */}
          <form
            id="login-user"
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8"
          >
            <FieldGroup className="gap-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to login to your account
                </p>
              </div>

              {/* EMAIL */}
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-2">
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="text"
                        placeholder="a@example.com"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs italic"
                      />
                    </Field>
                  );
                }}
              />

              {/* PASSWORD */}
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-2">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Your password here"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs italic"
                      />
                    </Field>
                  );
                }}
              />

              {/* ACTION BUTTONS */}
              <FieldGroup className="mt-4 flex w-full flex-col items-center justify-between gap-0!">
                <Button
                  variant="default"
                  size="default"
                  className="w-full"
                  type="submit"
                  form="login-user"
                  disabled={pendingLogin}
                >
                  {pendingLogin ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Pending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LogIn className="size-3.5" />
                      <span className="font-semibold">Login</span>
                    </div>
                  )}
                </Button>
                <div className="flex w-full justify-end">
                  <Button
                    size="sm"
                    className="text-xs"
                    type="button"
                    variant="link"
                    disabled={pendingLogin}
                    onClick={() => {
                      reset();
                    }}
                  >
                    Reset Form
                  </Button>
                </div>
              </FieldGroup>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                or continue with
              </FieldSeparator>
              <Field className="my-4 grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" onClick={signInGithub}>
                  {pendingGithubLogin ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaGithub className="size-3.5" />
                      <span className="sr-only">Sign in with Github</span>
                    </div>
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={signInGoogle}
                  disabled={pendingGoogleLogin}
                >
                  {pendingGoogleLogin ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaGoogle className="size-3.5" />
                      <span className="sr-only">Sign up with Google</span>
                    </div>
                  )}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Button variant="link" size="sm">
                  <Link href={routes.register} className="font-semibold">
                    Register
                  </Link>
                </Button>
              </FieldDescription>
            </FieldGroup>
          </form>
          {/* RIGHT SIDE */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/login-bg.jpg"
              width={1000}
              height={1000}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              placeholder="blur"
              blurDataURL="/placeholder.svg"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
};

export default LoginForm;

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { USER_ALREADY_EXISTS } from "@/config/error-codes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { signUp } from "@/lib/auth-client";

import { TFunction } from "@/types/general";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormField } from "../ui/form";
import { FormInput } from "../ui/form-input";
import { GitHubButton } from "./github-button";
import { GoogleButton } from "./google-button";

export const signUpSchema = (t: TFunction) =>
  z
    .object({
      name: z.string({ required_error: t("formFields.name.errors.required") }).min(3, t("formFields.name.errors.tooShort", { min: 3 })),
      email: z.string({ required_error: t("formFields.email.errors.required") }).email(t("formFields.email.errors.invalid")),
      password: z
        .string({ required_error: t("formFields.password.errors.required") })
        .min(8, t("formFields.password.errors.tooShort", { min: 8 })),
      confirmPassword: z.string({ required_error: t("formFields.confirmPassword.errors.required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("formFields.confirmPassword.errors.noMatch"),
      path: ["confirmPassword"],
    });

export type SignUpFormSchemaType = z.infer<ReturnType<typeof signUpSchema>>;

export const SignUpForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormSchemaType) => {
    const request = signUp.email({ ...data, callbackURL: "/sign-in?verified=1" });

    /**
     * Wrap toast.promise in a Promise to keep form state (e.g. isSubmitting) accurate.
     * Without this, the form may reset before the toast's async handlers complete.
     */
    await new Promise((_, reject) => {
      toast.promise(request, {
        loading: t("forms.signUp.toast.loading.message"),
        success: async (data) => {
          if (!data.data?.user) {
            throw new Error("Sign up error: ", {
              cause: data.error?.code,
            });
          }

          setTimeout(() => {
            router.push("/confirmation-email-sent");
          }, 10);

          return (
            <div className="flex w-full items-center justify-between">
              <div>{t("forms.signUp.toast.success.message")}</div>
            </div>
          );
        },
        error: (err: { cause?: string }) => {
          console.log(err.cause);

          reject();

          if (err.cause === USER_ALREADY_EXISTS) {
            return t("forms.signUp.toast.error.userAlreadyExists");
          }

          return t("forms.signUp.toast.error.generalMessage");
        },
      });
    });
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">{t("forms.signUp.title")}</CardTitle>
        <CardDescription>{t("forms.signUp.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput
                  field={field}
                  label={t("formFields.name.label")}
                  placeholder={t("formFields.name.placeholder")}
                  // description={t("formFields.name.description")}
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  field={field}
                  label={t("formFields.email.label")}
                  placeholder={t("formFields.email.placeholder")}
                  // description={t("formFields.email.description")}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormInput
                  field={field}
                  label={t("formFields.password.label")}
                  placeholder={t("formFields.password.placeholder")}
                  // description={t("formFields.password.description")}
                  type="password"
                />
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormInput
                  field={field}
                  label={t("formFields.confirmPassword.label")}
                  placeholder={t("formFields.confirmPassword.placeholder")}
                  // description={t("formFields.confirmPassword.description")}
                  type="password"
                />
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {t("forms.signUp.button.label")}
            </Button>
          </form>
        </Form>
        <div className="after:border-border relative my-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">{t("forms.shared.orContinueWith")}</span>
        </div>
        <div className="flex flex-col gap-2">
          <GoogleButton />
          <GitHubButton />
        </div>
        <div className="mt-4 text-center text-sm">
          {t.rich("forms.signUp.bottomText", {
            link: (chunks) => (
              <Link href="/sign-in" className="text-blue-link hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </div>
      </CardContent>
    </Card>
  );
};

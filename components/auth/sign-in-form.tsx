"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { EMAIL_NOT_VERIFIED, INVALID_EMAIL_OR_PASSWORD } from "@/config/error-codes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { signIn } from "@/lib/auth-client";

import { TFunction } from "@/types/general";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormField } from "../ui/form";
import { FormInput } from "../ui/form-input";
import { GitHubButton } from "./github-button";
import { GoogleButton } from "./google-button";

export const signInSchema = (t: TFunction) =>
  z.object({
    email: z.string({ required_error: t("formFields.email.errors.required") }).email(t("formFields.email.errors.invalid")),
    password: z
      .string({ required_error: t("formFields.password.errors.required") })
      .min(8, t("formFields.password.errors.tooShort", { min: 8 })),
  });

export type SignInFormSchemaType = z.infer<ReturnType<typeof signInSchema>>;

export const SignInForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Once user click on the email verification link, he will be redirected to this page and the search params will
  // include "verified=1", in that case show toaster with the success message and remove the param from the URL
  useEffect(() => {
    // TODO cover the case when passwordReset=1
    if (verified === "1") {
      toast.success(
        <div>
          {t("forms.signIn.toast.verified.message")}
          <br />
          {t("forms.signIn.toast.verified.description")}
        </div>
      );

      const params = new URLSearchParams(searchParams.toString());
      params.delete("verified");

      router.replace(`/sign-in?${params.toString()}`, { scroll: false });
    }
  }, [verified, router, searchParams, t]);

  const onSubmit = async (data: SignInFormSchemaType) => {
    const request = signIn.email(data);

    /**
     * Wrap toast.promise in a Promise to keep form state (e.g. isSubmitting) accurate.
     * Without this, the form may reset before the toast's async handlers complete.
     */
    await new Promise((_, reject) => {
      toast.promise(request, {
        loading: t("forms.signIn.toast.loading.message"),
        success: async (data) => {
          if (!data.data?.user) {
            throw new Error("Sign up error: ", {
              cause: data.error?.code,
            });
          }

          setTimeout(() => {
            router.push("/");
          }, 10);

          return (
            <div className="flex w-full items-center justify-between">
              <div>{t("forms.signIn.toast.success.message")}</div>
            </div>
          );
        },
        error: (err: { cause?: string }) => {
          console.log("err.cause", err.cause);

          reject();

          if (err.cause === INVALID_EMAIL_OR_PASSWORD) {
            return t("forms.signIn.toast.error.invalidEmailOrPassword");
          }

          if (err.cause === EMAIL_NOT_VERIFIED) {
            return t("forms.signIn.toast.error.emailNotVerified");
          }

          return t("forms.signIn.toast.error.message");
        },
      });
    });
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">{t("forms.signIn.title")}</CardTitle>
        <CardDescription>{t("forms.signIn.description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-blue-link text-sm hover:underline">
                {t("forms.signIn.forgotPassword")}
              </Link>
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {t("forms.signIn.button.label")}
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
          {t.rich("forms.signIn.bottomText", {
            link: (chunks) => (
              <Link href="/sign-up" className="text-blue-link hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </div>
      </CardContent>
    </Card>
  );
};

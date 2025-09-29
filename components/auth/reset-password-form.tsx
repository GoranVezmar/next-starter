"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { resetPassword } from "@/lib/auth-client";

import { TFunction } from "@/types/general";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormField } from "../ui/form";
import { FormInput } from "../ui/form-input";

export const signInSchema = (t: TFunction) =>
  z
    .object({
      password: z
        .string({ required_error: t("formFields.password.errors.required") })
        .min(8, { message: t("formFields.password.errors.tooShort", { min: 8 }) }),
      confirmPassword: z
        .string({ required_error: t("formFields.confirmPassword.errors.required") })
        .min(8, { message: t("formFields.confirmPassword.errors.tooShort", { min: 8 }) }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("formFields.confirmPassword.errors.noMatch"),
      path: ["confirmPassword"],
    });

export type ResetPasswordFormSchemaType = z.infer<ReturnType<typeof signInSchema>>;

export const ResetPasswordForm = () => {
  const router = useRouter();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(signInSchema(t)),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormSchemaType) => {
    const request = resetPassword({
      newPassword: data.password,
      token: token || "",
    });

    /**
     * Wrap toast.promise in a Promise to keep form state (e.g. isSubmitting) accurate.
     * Without this, the form may reset before the toast's async handlers complete.
     */
    await new Promise((_, reject) => {
      toast.promise(request, {
        loading: t("forms.resetPassword.toast.loading.message"),
        success: async (data) => {
          if (!data.data?.status) {
            throw new Error("Reset password error: ", {
              cause: data.error?.code,
            });
          }

          setTimeout(() => {
            router.push("/sign-in");
          }, 10);

          return (
            <div className="flex w-full items-center justify-between">
              <div>{t("forms.resetPassword.toast.success.message")}</div>
            </div>
          );
        },
        error: (err: { cause?: string }) => {
          console.log("err.cause", err.cause);

          reject();

          return t("forms.resetPassword.toast.error.message");
        },
      });
    });
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Reset {t("forms.resetPassword.title")}</CardTitle>
        <CardDescription>{t("forms.resetPassword.description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              {t("forms.resetPassword.button.label")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

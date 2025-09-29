"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { requestPasswordReset } from "@/lib/auth-client";

import { TFunction } from "@/types/general";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormField } from "../ui/form";
import { FormInput } from "../ui/form-input";

export const signInSchema = (t: TFunction) =>
  z.object({
    email: z.string({ required_error: t("formFields.email.errors.required") }).email(t("formFields.email.errors.invalid")),
  });

export type ForgotPasswordFormSchemaType = z.infer<ReturnType<typeof signInSchema>>;

export const ForgotPasswordForm = () => {
  const t = useTranslations();

  const form = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(signInSchema(t)),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormSchemaType) => {
    const request = requestPasswordReset({ ...data, redirectTo: "/reset-password" });

    /**
     * Wrap toast.promise in a Promise to keep form state (e.g. isSubmitting) accurate.
     * Without this, the form may reset before the toast's async handlers complete.
     */
    await new Promise((_, reject) => {
      toast.promise(request, {
        loading: t("forms.forgotPassword.toast.loading.message"),
        success: async (data) => {
          if (!data.data?.status) {
            throw new Error("Reset password error: ", {
              cause: data.error?.code,
            });
          }

          form.reset();

          return (
            <div className="flex w-full flex-col">
              <div>{t("forms.forgotPassword.toast.success.message")}</div>
              <div className="text-muted-foreground text-sm font-normal">{t("forms.forgotPassword.toast.success.description")}</div>
            </div>
          );
        },
        error: (err: { cause?: string }) => {
          console.log("err.cause", err.cause);

          reject();

          return t("forms.forgotPassword.toast.error.message");
        },
      });
    });
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">{t("forms.forgotPassword.title")}</CardTitle>
        <CardDescription>{t("forms.forgotPassword.description")}</CardDescription>
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
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {t("forms.forgotPassword.button.label")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

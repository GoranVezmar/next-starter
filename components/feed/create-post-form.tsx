"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { User } from "@/server/schemas/auth.schema";
import { type CreatePostFormSchemaType, createPostSchema } from "@/server/schemas/post.schema";

import { Link } from "@/i18n/navigation";

import { api } from "@/lib/api";

import { Button } from "./ui/button";
import { Form, FormField } from "./ui/form";
import { FormDatepicker } from "./ui/form-datepicker";
import { FormInput } from "./ui/form-input";
import { FormTextarea } from "./ui/form-textarea";
import { Switch } from "./ui/switch";

type CreatePostFormProps = {
  user: User;
};

export const CreatePostForm = ({ user }: CreatePostFormProps) => {
  const [enableScheduling, setEnableScheduling] = useState(false);
  const t = useTranslations("createPostForm");

  // `scheduledAt` defaults to 1 minute from now, and it is in ISO (string) format becuase the backend expects it in that format.
  const scheduledAt = new Date(Date.now() + 60000).toISOString();
  const form = useForm<CreatePostFormSchemaType>({
    resolver: zodResolver(createPostSchema(t)),
    defaultValues: {
      title: "",
      content: "",
      scheduledAt,
    },
  });

  const onSubmit = async (data: CreatePostFormSchemaType) => {
    const request = api.posts.$post({ json: { ...data, scheduledAt: enableScheduling ? data.publishedAt : undefined } });

    /**
     * Wrap toast.promise in a Promise to keep form state (e.g. isSubmitting) accurate.
     * Without this, the form may reset before the toast's async handlers complete.
     */
    await new Promise((_, reject) => {
      toast.promise(request, {
        loading: t("toast.loading.message"),
        success: async (data) => {
          if (data.status === 500) {
            throw new Error("Post not created");
          }

          form.reset();
          form.setValue("scheduledAt", scheduledAt);

          const { post } = await data.json();

          return (
            <div className="flex w-full items-center justify-between">
              <div>{t("toast.success.message")}</div>
              <Button asChild variant="secondary" size="sm">
                <Link href={`/posts/${post.id}`} target="_blank">
                  {t("toast.success.linkLabel")}
                </Link>
              </Button>
            </div>
          );
        },
        error: (err: unknown) => {
          console.error(err);
          reject(err);
          return t("toast.error.message");
        },
      });
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <h1 className="mb-6 scroll-m-20 text-3xl font-bold tracking-tight">{t("message", { name: user.name })}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormInput field={field} label={t("title.label")} placeholder={t("title.placeholder")} description={t("title.description")} />
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormTextarea
                field={field}
                label={t("content.label")}
                placeholder={t("content.placeholder")}
                description={t("content.description")}
              />
            )}
          />
          <div className="flex items-center space-x-2">
            <Switch checked={enableScheduling} onCheckedChange={(checked) => setEnableScheduling(checked as boolean)} />
            <label className="select-none">Enable scheduling</label>
          </div>
          {enableScheduling && (
            <FormField
              control={form.control}
              name="scheduledAt"
              render={({ field }) => <FormDatepicker name={field.name} label="Select desired date and time" />}
            />
          )}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {t("button.label")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

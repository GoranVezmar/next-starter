import { interpolate as i } from "@/utils";
import { z } from "zod";

import enJson from "@/messages/en.json";

import { TFunction } from "@/types/general";

import { postInsertSchema, postSelectSchema } from "../db/schemas/post.schema";

export const postSchema = postSelectSchema;

export type Post = z.infer<typeof postSchema>;

/**
 * I can't extend the schema with validation options in `postInsertSchema` because it depends on the curent selected locale.
 * So instead I am using the `createPostSchema` in a form of function that accepts a translation function as an argument (FE case),
 * or nothing (BE case) but then it just reads the messsages from the default locale.
 * Also I do not want to use any here but I do not have idea how to type the t function from use-intl.
 */
export const createPostSchema = (t?: TFunction) => {
  const { title, content } = enJson.createPostForm;
  const titleMin = 3;
  const titleMax = 30;
  const contentMin = 10;
  const contentMax = 500;

  return postInsertSchema.omit({ id: true }).extend({
    title: z
      .string()
      .min(titleMin, {
        message: t?.("title.validation.minLength", { min: titleMin }) || i(title.validation.minLength, { min: titleMin }),
      })
      .max(titleMax, {
        message: t?.("title.validation.maxLength", { max: titleMax }) || i(title.validation.maxLength, { max: titleMax }),
      }),
    content: z
      .string()
      .min(contentMin, {
        message: t?.("content.validation.minLength", { min: contentMin }) || i(content.validation.minLength, { min: contentMin }),
      })
      .max(contentMax, {
        message: t?.("content.validation.maxLength", { max: contentMax }) || i(content.validation.maxLength, { max: contentMax }),
      }),
    scheduledAt: z
      .string()
      .refine(
        (date) => {
          const parsedDate = new Date(date);
          return parsedDate.getTime() > Date.now() + 60000;
        },
        // TODO - translate this message
        { message: "Date must be at least one minute in the future" }
      )
      .optional(),
  });
};

export type CreatePostFormSchemaType = z.infer<ReturnType<typeof createPostSchema>>;

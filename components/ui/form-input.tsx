import { HTMLInputTypeAttribute } from "react";

import { type ControllerRenderProps, type FieldValues, type Path } from "react-hook-form";

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "./input";

type FormInputProps<TFieldValues extends FieldValues> = {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  label: string;
  placeholder: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
};

export const FormInput = <TFieldValues extends FieldValues>({
  field,
  label,
  description,
  placeholder,
  type = "text",
}: FormInputProps<TFieldValues>) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} type={type} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

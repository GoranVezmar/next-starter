import { type ControllerRenderProps, type FieldValues, type Path } from "react-hook-form";

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "./textarea";

type FormInputProps<TFieldValues extends FieldValues> = {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  label: string;
  placeholder: string;
  description?: string;
};

export const FormTextarea = <TFieldValues extends FieldValues>({
  field,
  label,
  description,
  placeholder,
}: FormInputProps<TFieldValues>) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea placeholder={placeholder} className="resize-none" {...field} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

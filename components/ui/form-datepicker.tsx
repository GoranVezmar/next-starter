import { cn } from "@/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type FieldValues, type Path, type PathValue, useController, useFormContext } from "react-hook-form";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

type FormDatepickerProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  name: TName;
  label?: string;
  placeholder?: string;
  description?: string;
};

type DateChangeData =
  | {
      value: Date | undefined;
      type: "day";
    }
  | {
      value: string;
      type: "hour" | "minute";
    };

const getHours = (selectedDateAsString: string) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const now = new Date();
  const selectedDate = new Date(selectedDateAsString);

  if (
    selectedDate.getDate() === now.getDate() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getFullYear() === now.getFullYear()
  ) {
    return hours.filter((hour) => hour >= now.getHours());
  } else {
    return hours;
  }
};

const getMinutes = (selectedDateAsString: Date) => {
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const now = new Date();
  const selectedDate = new Date(selectedDateAsString);

  if (
    selectedDate.getDate() === now.getDate() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getHours() === now.getHours()
  ) {
    return minutes.filter((minute) => minute > now.getMinutes());
  } else {
    return minutes;
  }
};

export const FormDatepicker = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  label,
  placeholder,
  description,
}: FormDatepickerProps<TFieldValues, TName>) => {
  const { control, setValue, clearErrors } = useFormContext<TFieldValues>();
  const { field } = useController({ control, name });

  const hours = getHours(field.value);
  const minutes = getMinutes(field.value);

  const date = field.value ? new Date(field.value) : undefined;

  const handleDateChange = ({ value, type }: DateChangeData) => {
    if (!value) return;

    let newDate = new Date(field.value);

    if (type === "day") {
      newDate.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
    } else if (type === "hour") {
      newDate.setHours(value ? parseInt(value, 10) : 0);
    } else if (type === "minute") {
      newDate.setMinutes(value ? parseInt(value, 10) : 0);
    }

    // Ensure the date is not in the past
    if (newDate < new Date()) {
      newDate = new Date(Date.now() + 60000);
    }

    setValue(field.name, newDate.toISOString() as PathValue<TFieldValues, TName>);
    clearErrors(field.name);
  };

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
              {date ? format(date, "MM/dd/yyyy HH:mm") : <span>{placeholder}</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex gap-4 px-4 pt-4">
            <div className="flex w-[50%] flex-col gap-2">
              <FormLabel htmlFor={`${field.name}Hours`}>Hours:</FormLabel>
              <Select
                onValueChange={(newHour) => handleDateChange({ value: newHour, type: "hour" })}
                value={date ? date.getHours().toString() : "1"}
              >
                <SelectTrigger className="w-full" id={`${field.name}Hours`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hours?.map((hour) => (
                    <SelectItem key={hour} className="shrink-0 sm:w-full" value={hour.toString()}>
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[50%] flex-col gap-2">
              <FormLabel htmlFor={`${field.name}Minutes`}>Minutes:</FormLabel>
              <Select
                onValueChange={(newMinute) => handleDateChange({ value: newMinute, type: "minute" })}
                value={date ? date.getMinutes().toString() : "0"}
              >
                <SelectTrigger className="w-full" id={`${field.name}Minutes`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((minute) => (
                    <SelectItem key={minute} className="shrink-0 sm:w-full" value={minute.toString()}>
                      {minute.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => handleDateChange({ value: newDate, type: "day" })}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

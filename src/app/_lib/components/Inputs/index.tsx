"use client";

import { useController } from "react-hook-form";

type InputProps = {
  control: any;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: any;
  placeholder?: string;
}
export default function Input(InputProps: InputProps) {
  const { control, name, defaultValue, placeholder, type, required } = InputProps;
  const {
    fieldState: {
      error,
    },
    field: {
      value,
      onChange,
    }
  } = useController({
    name,
    control,
    defaultValue,
  });

  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const isValidNumber = Number(e.target.value);
      if (isNaN(isValidNumber)) {
        e.target.value = value;
        return;
      }
      if (e.target.value?.length > 1 && e.target.value?.startsWith("0")) {
        e.target.value = e.target.value.slice(1);
      }
    }
    return onChange(e);
  }

  return (
    <>
      <input
        type={type === "number" ? "text" : type ?? "text"}
        className="block w-full rounded-md border border-gray-300 h-[35px] focus:border-transparent focus:ring-transparent sm:text-sm mb-1 px-2"
        value={value}
        onChange={customOnChange}
        placeholder={placeholder}
        required={required}
      />
      {error?.message && <p className="mt-2 text-sm text-red-600">
        {error.message}
      </p>}
    </>
  )
}
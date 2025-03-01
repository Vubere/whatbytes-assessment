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

  return (
    <>
      <input
        type={type || "text"}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-1"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error?.message && <p className="mt-2 text-sm text-red-600">
        {error.message}
      </p>}
    </>
  )
}
"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import LoadingSpinner from "./LoadingSpinner";
import React from "react";
import { Dialog } from "@headlessui/react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
function SubmitButton({ children, ...attribute }: Props) {
  const { pending } = useFormStatus();
  const { disabled } = attribute;
  return (
    <button
      className={`w-full rounded-3xl px-4 py-2 text-lg bg-blue  hover:bg-opacity-90 font-bold flex items-center justify-center disabled:bg-blue/50 ${
        pending || disabled ? "text-gray-400" : ""
      }`}
      type="submit"
      {...attribute}
      disabled={pending || disabled}
    >
      {pending ? <LoadingSpinner /> : children}
    </button>
  );
}

export default SubmitButton;

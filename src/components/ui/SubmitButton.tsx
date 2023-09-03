"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import LoadingSpinner from "./LoadingSpinner";
import React from "react";

function SubmitButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  const { disabled } = props;
  return (
    <button
      className="w-full rounded-3xl px-4 py-2 text-lg bg-blue  hover:bg-opacity-90 font-bold flex items-center justify-center disabled:bg-blue/50"
      type="submit"
      disabled={pending || disabled}
    >
      {pending ? <LoadingSpinner /> : "Post"}
    </button>
  );
}

export default SubmitButton;

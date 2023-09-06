"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong :(</h1>
        {/* <p className="text-lg mb-4">Try Again</p> */}
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-dark focus:outline-none"
        >
          Try Again
        </button>
        <Link
          href="/home"
          className="px-4 py-2 mx-3 bg-blue text-white rounded hover:bg-blue-dark focus:outline-none"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

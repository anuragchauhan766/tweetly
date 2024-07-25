"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-6">
      <div className="flex w-full items-center justify-center">
        <button
          type="button"
          className="flex w-full items-center justify-evenly rounded-lg bg-white px-2 py-3 transition duration-200 hover:scale-105 hover:bg-white/90 sm:py-1"
          onClick={async () => signIn("google", { callbackUrl: "/home" })}
        >
          <FcGoogle className="h-8 w-8" />
          <div className="sm:text-md text-lg font-medium text-black">
            Sign in with Google
          </div>
        </button>
      </div>
      <div className="flex w-full items-center justify-center">
        <button
          type="button"
          className="flex w-full items-center justify-evenly rounded-lg bg-white px-2 py-3 transition duration-200 hover:scale-105 hover:bg-white/90 sm:py-1"
          onClick={async () => signIn("github", { callbackUrl: "/home" })}
        >
          <FaGithub className="h-8 w-8 fill-black" />
          <div className="sm:text-md text-lg font-medium text-black">
            Sign in with Github
          </div>
        </button>
      </div>
    </div>
  );
}

export default Login;

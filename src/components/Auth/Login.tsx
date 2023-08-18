"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-6 ">
      <h2 className="font-bold text-4xl">Join Now</h2>
      <div className="w-full flex items-center justify-start ">
        <button
          type="button"
          className="w-56 rounded-full px-2 py-1 bg-white flex items-center justify-around
                hover:bg-white/90 hover:scale-105 transition duration-200"
          onClick={async () => signIn("google", { callbackUrl: "/home" })}
        >
          <FcGoogle className="w-8 h-8 " />
          <div className="text-black text-md font-medium">
            Sign in with Google
          </div>
        </button>
      </div>
      <div className="w-full flex items-center justify-start ">
        <button
          type="button"
          className="w-56 rounded-full px-2 py-1 bg-white flex items-center justify-around
                hover:bg-white/90 hover:scale-105 transition duration-200"
          onClick={async () => signIn("github", { callbackUrl: "/home" })}
        >
          <FaGithub className="w-8 h-8 fill-black" />
          <div className="text-black text-md font-medium">
            Sign in with Github
          </div>
        </button>
      </div>
    </div>
  );
}

export default Login;

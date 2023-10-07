"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-6 ">
      <h2 className="font-bold text-4xl">Join Now</h2>
      <div className="w-full flex items-center justify-center sm:justify-start ">
        <button
          type="button"
          className="w-full sm:w-56 rounded-full px-2 py-3 sm:py-1 bg-white flex items-center justify-around
                hover:bg-white/90 hover:scale-105 transition duration-200"
          onClick={async () => signIn("google", { callbackUrl: "/home" })}
        >
          <FcGoogle className="w-8 h-8 " />
          <div className="text-black text-lg sm:text-md font-medium">
            Sign in with Google
          </div>
        </button>
      </div>
      <div className="w-full flex items-center justify-center sm:justify-start ">
        <button
          type="button"
          className="w-full sm:w-56 rounded-full px-2 py-3 sm:py-1 bg-white flex items-center justify-around
                hover:bg-white/90 hover:scale-105 transition duration-200"
          onClick={async () => signIn("github", { callbackUrl: "/home" })}
        >
          <FaGithub className="w-8 h-8 fill-black" />
          <div className="text-black text-lg sm:text-md font-medium">
            Sign in with Github
          </div>
        </button>
      </div>
      <div className="text-sm font-light">
        <p>
          This is a Twitter Clone created in Next.js by{" "}
          <span className="font-bold">Anurag Singh Chauhan</span>, designed for
          learning and knowledge acquisition. You can sign in with Google, and I
          assure you that your data will remain{" "}
          <span className="font-bold">secure</span> , as I will not misuse it.
          We only collect your email, photo, and name for authentication and
          account setup.
        </p>
      </div>
    </div>
  );
}

export default Login;

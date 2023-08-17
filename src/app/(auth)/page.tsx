"use client";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <div className="text-white w-screen h-screen">
      <div className="flex flex-row items-center justify-center gap-3 w-full h-full">
        <div className="w-1/2 h-full flex items-center justify-center">
          <Image
            src="/twitter.svg"
            alt="Twitter logo"
            width={200}
            height={100}
            priority={true}
            style={{
              width: "100%",
              maxHeight: "380px",
              height: "50%",
            }}
          ></Image>
        </div>
        <div className="w-1/2 h-full flex flex-col items-start justify-center gap-10">
          <h1 className="font-black text-7xl">Happening now</h1>
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
        </div>
      </div>
    </div>
  );
}

export default Home;

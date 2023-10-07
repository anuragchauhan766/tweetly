import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Login from "./_component/Login";

async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/home");
  return (
    <div className="text-white w-screen h-screen">
      <div className="grid grid-cols-1 grid-rows-5 sm:grid-cols-2 sm:grid-rows-none  place-items-center  w-full h-full p-12 sm:p-0 gap-y-20 sm:gap-y-0">
        <div className="w-full  sm:h-full grid place-items-start sm:place-items-center ">
          <div className="w-16 sm:w-60 lg:w-80">
            <Image
              src="/twitter.svg"
              alt="Twitter logo"
              width={200}
              height={100}
              priority={true}
              style={{
                width: "auto",
                maxHeight: "380px",
                height: "50%",
              }}
            ></Image>
          </div>
        </div>
        <div className="w-full h-full grid place-items-start sm:place-items-center row-span-4 sm:row-auto">
          <div className="flex flex-col items-start justify-center gap-10">
            <h1 className="font-black text-4xl sm:text-5xl  lg:text-7xl">
              Happening now
            </h1>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

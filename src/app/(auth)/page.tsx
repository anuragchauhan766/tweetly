import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Login from "@/components/Auth/Login";
async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/home");
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
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Home;

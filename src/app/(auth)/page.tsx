import Image from "next/image";
import Login from "./_component/Login";

function Home() {
  // const session = await getServerSession(authOptions);
  // if (session) redirect("/home");
  return (
    <div className="h-screen w-screen text-white">
      <div className="grid h-full w-full grid-cols-1 grid-rows-5 place-items-center gap-y-20 p-12 sm:grid-cols-2 sm:grid-rows-none sm:gap-y-0 sm:p-0">
        <div className="grid w-full place-items-start sm:h-full sm:place-items-center">
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
        <div className="row-span-4 grid h-full w-full place-items-start sm:row-auto sm:place-items-center">
          <div className="flex flex-col items-start justify-center gap-10">
            <h1 className="text-4xl font-black sm:text-5xl lg:text-7xl">
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

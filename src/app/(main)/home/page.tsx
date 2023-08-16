import TweetCard from "@/components/TweetCard";
import TweetComposer from "@/components/TweetComposer";


function Home() {
  return (
    <div className="max-w-screen-sm w-full  border-r-[0.5px] border-l-[0.5px] border-gray-600 ">
      <div className="w-full h-12 font-bold text-xl p-4 flex items-center justify-start backdrop-blur-sm bg-black/50 sticky top-0">
        Home
      </div>
      <TweetComposer />
      {Array.from({ length: 5 }).map((_, i) => (
        <TweetCard key={i} />
      ))}
    </div>
  );
}

export default Home;

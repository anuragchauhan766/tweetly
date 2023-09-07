import GoBackButton from "@/components/common/button/GoBackButton";

function TweetPage({ params }: { params: { tweetid: string } }) {
  
  return (
    <div className="w-full">
      <div className="w-full  font-bold text-xl p-1 flex items-center justify-start backdrop-blur-sm bg-black/50 sticky top-0 gap-6 ps-2">
        <GoBackButton />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold">Post</span>
        </div>
      </div>
    </div>
  );
}

export default TweetPage;

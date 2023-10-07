import Reply_Pair from "@/components/UserPage/Reply_Pair";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exception";
import { getRepliesWithParentTweet } from "@/utils/getRepliesWithParentTweet";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function With_replies({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthRequiredError();
  const tweets = await getRepliesWithParentTweet(
    params.username,
    session.user.id
  );
  if (tweets.length === 0) {
    notFound();
  }
  return (
    <div className="mb-16">
      {tweets.map((tweet) => (
        <Reply_Pair key={tweet.id} {...tweet} />
      ))}
    </div>
  );
}

export default With_replies;

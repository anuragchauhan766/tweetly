import { RepliesWithParentTweet } from "@/types/Tweet";
import TweetCard from "../TweetCard/TweetCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exception";

async function Reply_Pair(props: RepliesWithParentTweet) {
  const session = await getServerSession(authOptions);
  // if (!session) throw new AuthRequiredError();
  return (
    <div>
      <TweetCard
        {...props.parentTweet}
        currentUserId={session.user.id}
        isParentTweetwithReply={true}
      />
      <TweetCard {...props} currentUserId={session.user.id} />
    </div>
  );
}

export default Reply_Pair;

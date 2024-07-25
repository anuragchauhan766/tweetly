import TweetCard from "@/components/TweetCard/TweetCard";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exception";
import { getUserTweets } from "@/utils/getUserTweets";

import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function Posts({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);

  const tweets = await getUserTweets(params.username, session?.user.id);
  if (!tweets || tweets.length === 0) {
    notFound();
  }
  return (
    <div>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} {...tweet} currentUserId={session?.user.id} />
      ))}
    </div>
  );
}

export default Posts;

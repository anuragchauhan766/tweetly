import { db } from "@/lib/prisma";

import { tweetsWithAutherAndLikes } from "./Queries/tweet";
import { Prisma } from "@prisma/client";
export const userTweetsquery = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    tweets: {
      orderBy: {
        createdAt: "desc",
      },
      ...tweetsWithAutherAndLikes,
    },
  },
});
/**
 *
 * @param userId - user's username to fetch its tweet
 * @param currentUserId - id of current logged in user
 * @returns - array of tweet of user(visited)
 */
export const getUserTweets = async (
  username: string,
  currentUserId?: string
) => {
  "use server";
  try {
    const res = await db.user.findUnique({
      where: {
        username: username,
      },
      ...userTweetsquery,
    });
    if (!res) return;

    const tweetsWithLikes = res.tweets.map((tweet) => ({
      ...tweet,
      isLikedByCurrentUser: tweet.likes.some(
        (like) => like.LikedByUserId === currentUserId
      ),
    }));

    return tweetsWithLikes;
  } catch (error) {
    throw error;
  }
};

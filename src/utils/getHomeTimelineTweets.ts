"use server";
import { tweetsWithAutherAndLikes } from "@/utils/Queries/tweet";
import { db } from "@/lib/prisma";

export const getHomeTimelineTweets = async (
  options: { take: number; page: number },
  userId?: string,
) => {

  const res = await db.tweet.findMany({
    where: {
      isReply: false,
    },
    take: options.take,
    skip: (options.page - 1) * options.take,
    orderBy: {
      createdAt: "desc",
    },

    ...tweetsWithAutherAndLikes,
  });

  const tweetsWithLikes = res.map((tweet) => ({
    ...tweet,
    isLikedByCurrentUser: tweet.likes.some(
      (like) => like.LikedByUserId === userId
    ),
  }));

  return tweetsWithLikes;

};

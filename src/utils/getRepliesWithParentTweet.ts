import { db } from "@/lib/prisma";
import { TweetsWithAutherAndLikes } from "@/types/Tweet";
import { Prisma } from "@prisma/client";

// queries for relation field and select field
export const RepliesWithParentTweetQueries =
  Prisma.validator<Prisma.TweetDefaultArgs>()({
    include: {
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
      parentTweet: {
        include: {
          _count: {
            select: {
              likes: true,
              replies: true,
            },
          },
          likes: {
            select: {
              LikedByUserId: true,
            },
          },
          auther: {
            select: {
              username: true,
              image: true,
              name: true,
            },
          },
        },
      },
      likes: {
        select: {
          LikedByUserId: true,
        },
      },
      auther: {
        select: {
          username: true,
          image: true,
          name: true,
        },
      },
    },
  });
export const getRepliesWithParentTweet = async (
  username: string,
  currentuserId?: string
) => {
  "use server";

  const tweets = await db.tweet.findMany({
    where: {
      isReply: true,
      auther: {
        username: username,
      },
    },
    ...RepliesWithParentTweetQueries,
  });

  const repliesWithParentTweet = tweets.map((tweet) => ({
    ...tweet,
    parentTweet: {
      ...(tweet.parentTweet as TweetsWithAutherAndLikes),
      isLikedByCurrentUser: (
        tweet.parentTweet as TweetsWithAutherAndLikes
      ).likes.some((like) => like.LikedByUserId === currentuserId),
    },
    isLikedByCurrentUser: tweet.likes.some(
      (like) => like.LikedByUserId === currentuserId
    ),
  }));

  return repliesWithParentTweet;

};

"use server";
import { tweetsWithAutherAndLikes } from "@/utils/Queries/tweet";
import { db } from "@/lib/prisma";

export const getHomeTimelineTweets = async (
  userId: string,
  options: { take: number; page: number }
) => {
  let res;
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        following: true,
      },
    });
    if (user?.following.length === 0) {
      res = await db.tweet.findMany({
        take: options.take,
        orderBy: {
          createdAt: "desc",
        },

        ...tweetsWithAutherAndLikes,
      });
    } else {
      res = await db.tweet.findMany({
        take: options.take,
        skip: (options.page - 1) * options.take,
        where: {
          OR: [
            {
              auther: {
                follower: {
                  some: {
                    followerId: userId,
                  },
                },
              },
            },
            {
              likes: {
                some: {
                  LikedByUser: {
                    follower: {
                      some: {
                        followerId: userId,
                      },
                    },
                  },
                },
              },
            },
            {
              replies: {
                some: {
                  auther: {
                    follower: {
                      some: {
                        followerId: userId,
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },

        ...tweetsWithAutherAndLikes,
      });
    }

    const tweetsWithLikes = res.map((tweet) => ({
      ...tweet,
      isLikedByCurrentUser: tweet.likes.some(
        (like) => like.LikedByUserId === userId
      ),
    }));

    return tweetsWithLikes;
  } catch (error) {
    throw error;
  }
};

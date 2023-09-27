import { db } from "@/lib/prisma";

import { Prisma, Tweet } from "@prisma/client";

// queries for relation field and select field
export const tweetsWithAutherAndLikes =
  Prisma.validator<Prisma.TweetDefaultArgs>()({
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
  });
export const getHomeTimelineTweets = async (
  userId: string,
  options: Prisma.TweetFindManyArgs
) => {
  "use server";
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

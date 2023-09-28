import { Prisma } from "@prisma/client";

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

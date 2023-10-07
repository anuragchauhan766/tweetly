"use server";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const getUsersFollowsDetailsQueries =
  Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
      _count: {
        select: {
          follower: true,
          following: true,
          tweets: true,
        },
      },
      following: {
        select: {
          following: {
            include: {
              follower: {
                select: {
                  followerId: true,
                },
              },
            },
          },
        },
      },
      follower: {
        select: {
          follower: {
            include: {
              follower: {
                select: {
                  followerId: true,
                },
              },
            },
          },
        },
      },
    },
  });
export const getUsersFollowsDetails = async (
  username: string,
  currentUserId: string
) => {
  try {
    const res = await db.user.findUnique({
      where: {
        username: username,
      },
      ...getUsersFollowsDetailsQueries,
    });
    if (!res) return;
    const follower = res.follower.map((a) => {
      return {
        ...a.follower,
        isFollowingByCurrentUser: a.follower.follower.some(
          (follow) => follow.followerId === currentUserId
        ),
      };
    });
    const following = res.following.map((a) => {
      return {
        ...a.following,
        isFollowingByCurrentUser: a.following.follower.some(
          (follow) => follow.followerId === currentUserId
        ),
      };
    });
    return {
      ...res,
      following,
      follower,
    };
  } catch (error) {
    console.error(error);
  }
};

"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const UserDetailsRelationqueries = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    _count: {
      select: {
        follower: true,
        following: true,
        tweets: true,
      },
    },
    follower: {
      select: {
        followerId: true,
      },
    },
  },
});

export const getUserDetails = async (
  username: string,
  currentUserId?: string
) => {
  try {
    const res = await db.user.findUnique({
      where: {
        username: username,
      },
      ...UserDetailsRelationqueries,
    });
    if (!res) return;
    const userwithfollowers = {
      ...res,
      isFollowingByCurrentUser: res.follower.some(
        (follow) => follow.followerId === currentUserId
      ),
    };
    return userwithfollowers;
  } catch (error) {
    console.log(error);
  }
};

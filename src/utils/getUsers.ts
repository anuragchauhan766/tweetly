"use server";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const usersQueries = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    follower: {
      select: {
        followerId: true,
      },
    },
  },
});
export const getUsers = async (
  currentUserId: string,
  options: { page: number; take: number }
) => {
  try {
    const users = await db.user.findMany({
      where: {
        NOT: [
          { id: currentUserId },
          {
            follower: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        ],
      },
      skip: (options.page - 1) * options.take,
      take: options.take,
      orderBy: {
        createdAt: "desc",
      },
      ...usersQueries,
    });
    const userswithfollowers = users.map((user) => ({
      ...user,
      isFollowingByCurrentUser: user.follower.some(
        (follow) => follow.followerId === currentUserId
      ),
    }));
    return userswithfollowers;
  } catch (error) {
    console.log(error);
  }
};

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const usersQueries = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    follower: {
      select: {
        followerId: true,
      },
    },
  },
});
export const getUsers = async (currentUserId: string) => {
  try {
    const users = await db.user.findMany({
      where: {
        NOT: {
          follower: {
            some: {
              followerId: currentUserId,
            },
          },
        },
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

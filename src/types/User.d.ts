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
export type ProfileCardProps = Prisma.UserGetPayload<typeof usersQueries> & {
  currentUserId: string;
  isFollowingByCurrentUser: boolean;
};

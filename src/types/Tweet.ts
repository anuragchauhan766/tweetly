import { tweetsWithAutherAndLikes } from "@/utils/getUserTweets";
import { User, Prisma } from "@prisma/client";

export type TweetsWithAutherAndLikes = Prisma.TweetGetPayload<
  typeof tweetsWithAutherAndLikes
>;
export type TweetCardProps = TweetsWithAutherAndLikes & {
  currentUserId: User["id"];
  isLikedByCurrentUser: boolean;
};
export type LikeHandler = ({
  userId,
  tweetId,
}: {
  userId: string;
  tweetId: string;
}) => Promise<void | unknown>;

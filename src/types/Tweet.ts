import { getUserTweets, tweetsWithAutherAndLikes } from "@/utils/getUserTweets";
import { User, Prisma } from "@prisma/client";

// export interface TweetCardProps
//   extends UsersWithPosts,
//     Partial<Pick<User, "name" | "username" | "image">> {
//   currentUserId: User["id"];
//   isLikedByCurrentUser: boolean;
// }
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

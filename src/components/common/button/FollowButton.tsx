"use client";

import { handlefollow } from "@/utils/follow";
import { useRouter } from "next/navigation";
import { experimental_useOptimistic, useTransition } from "react";

function FollowButton(props: {
  currentUserId: string;
  userIdTofollow: string;
  isFollowing: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFollowingByCurrentUser, setIsFollowingByCurrentUser] =
    experimental_useOptimistic(props.isFollowing);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsFollowingByCurrentUser((prev) => !prev);

    // start transition for server request work
    startTransition(() => {
      handlefollow(props.currentUserId, props.userIdTofollow);
      router.refresh();
    });
  };
  return (
    <div>
      <button
        className="flex items-center justify-center px-4 py-1 bg-white rounded-full text-black
           font-medium hover:bg-white/90"
        onClick={toggleLike}
      >
        {isFollowingByCurrentUser ? "Unfollow" : "follow"}
      </button>
    </div>
  );
}

export default FollowButton;

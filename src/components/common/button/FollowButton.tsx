"use client";
import { useQueryClient } from "@tanstack/react-query";

import { handlefollow } from "@/utils/follow";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { useLoginDialog } from "@/context/LoginDialogContext";

function FollowButton(props: {
  currentUserId?: string;
  userIdTofollow: string;
  isFollowing: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setIsLoginDialogVisible } = useLoginDialog();
  const [, startTransition] = useTransition();
  const [isFollowingByCurrentUser, setIsFollowingByCurrentUser] = useOptimistic(
    props.isFollowing
  );

  const toggleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { currentUserId } = props;
    if (!currentUserId) {
      setIsLoginDialogVisible(true);
      return;
    }
    setIsFollowingByCurrentUser((prev) => !prev);

    // start transition for server request work
    startTransition(() => {
      handlefollow(currentUserId, props.userIdTofollow);
      queryClient.invalidateQueries({
        queryKey: ["whotofollow", props.currentUserId],
      });
      router.refresh();
    });
  };
  return (
    <div>
      <button
        className="flex items-center justify-center rounded-full bg-white px-4 py-1 font-medium text-black hover:bg-white/90"
        onClick={toggleFollow}
      >
        {isFollowingByCurrentUser ? "Unfollow" : "follow"}
      </button>
    </div>
  );
}

export default FollowButton;

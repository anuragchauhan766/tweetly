import ProfileCard from "@/components/rightSideBar/ProfileCard";
import { authOptions } from "@/lib/auth";
import { getUsersFollowsDetails } from "@/utils/getUsersFollowDetails";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function Followers({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);

  const userProfile = await getUsersFollowsDetails(
    params.username,
    session?.user.id
  );
  if (!userProfile) {
    notFound();
  }
  return (
    <div>
      {userProfile.follower.map((people) => (
        <ProfileCard
          key={people.id}
          {...people}
          currentUserId={session?.user.id}
        />
      ))}
    </div>
  );
}

export default Followers;

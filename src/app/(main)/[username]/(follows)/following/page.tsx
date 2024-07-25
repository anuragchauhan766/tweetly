import ProfileCard from "@/components/rightSideBar/ProfileCard";
import { authOptions } from "@/lib/auth";
import { getUsersFollowsDetails } from "@/utils/getUsersFollowDetails";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function Following({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);

  const userProfile = await getUsersFollowsDetails(
    params.username,
    session?.user.id
  );
  console.log(userProfile);
  if (!userProfile) {
    notFound();
  }
  return (
    <div>
      {userProfile.following.map((people) => (
        <ProfileCard
          key={people.id}
          {...people}
          currentUserId={session?.user.id}
        />
      ))}
    </div>
  );
}

export default Following;

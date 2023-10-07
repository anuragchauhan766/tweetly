import Navigation from "@/components/UserPage/Navigation";
import GoBackButton from "@/components/common/button/GoBackButton";
import { authOptions } from "@/lib/auth";
import { getUsersFollowsDetails } from "@/utils/getUsersFollowDetails";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const userProfile = await getUsersFollowsDetails(
    params.username,
    session.user.id
  );
  if (!userProfile) {
    notFound();
  }
  const navItems = {
    Followers: `/${params.username}/followers`,
    Following: `/${params.username}/following`,
  };
  return (
    <div className="w-full">
      <div className="w-full  font-bold text-base xs:text-xl p-1 flex items-center justify-start backdrop-blur-sm bg-black/50 sticky top-0 gap-6 ps-2 z-50">
        <GoBackButton />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold">{userProfile.name}</span>
          <span className="font-light text-gray-500 text-base">
            {userProfile.username}
          </span>
        </div>
      </div>
      <Navigation username={params.username} navItems={navItems} />
      <div>{children}</div>
    </div>
  );
}

export default Layout;

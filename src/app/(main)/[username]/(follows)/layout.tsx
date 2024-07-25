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

  const userProfile = await getUsersFollowsDetails(
    params.username,
    session?.user.id
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
      <div className="sticky top-0 z-50 flex w-full items-center justify-start gap-6 bg-black/50 p-1 ps-2 text-base font-bold backdrop-blur-sm xs:text-xl">
        <GoBackButton />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold">{userProfile.name}</span>
          <span className="text-base font-light text-gray-500">
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

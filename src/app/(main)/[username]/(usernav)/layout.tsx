import EditProfileButton from "@/components/common/button/EditProfileButton";
import FollowButton from "@/components/common/button/FollowButton";
import GoBackButton from "@/components/common/button/GoBackButton";
import ProfileImages from "@/components/common/ProfileImages";
import Navigation from "@/components/UserPage/Navigation";
import { authOptions } from "@/lib/auth";
import { getUserDetails } from "@/utils/getUserDetails";
import moment from "moment";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiCalendar } from "react-icons/bi";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);
  const userProfile = await getUserDetails(params.username, session?.user.id);

  if (!userProfile) {
    notFound();
  }
  const navItems = {
    Posts: `/${params.username}`,
    Replies: `/${params.username}/with_replies`,
    Likes: `/${params.username}/likes`,
  };
  return (
    <div className="w-full">
      {/* top header bar */}
      <div className="sticky top-0 z-50 flex w-full items-center justify-start gap-6 bg-black/50 p-1 ps-2 text-base font-bold backdrop-blur-sm xs:text-xl">
        <GoBackButton />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold">{userProfile.name}</span>
          <span className="text-xs font-light text-gray-500">
            {userProfile._count.tweets} Posts
          </span>
        </div>
      </div>

      <div className="w-fulll flex flex-col">
        {/* cover image */}
        <div className="h-52 w-full">
          <div className="h-full w-full bg-white/25"></div>
        </div>
        {/* Profile details */}
        <div
          className="flex flex-col items-start justify-center gap-2 p-4"
          data-testid="UserProfileInfo"
        >
          <div className="flex w-full items-start justify-between">
            <div className="relative h-full w-1/4">
              <div
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center overflow-visible pb-10"
                data-testid="user-Profile-photo"
              >
                <ProfileImages
                  ImgUrl={userProfile.image}
                  ImgSize="200"
                  className="h-24 w-24 min-w-[40px] border-2 xs:h-32 xs:w-32 xs:border-4"
                />
              </div>
            </div>
            <div>
              {userProfile.id === session?.user.id ? (
                <EditProfileButton />
              ) : (
                <FollowButton
                  currentUserId={session?.user.id}
                  userIdTofollow={userProfile.id}
                  isFollowing={userProfile.isFollowingByCurrentUser}
                />
              )}
            </div>
          </div>
          <div
            className="flex flex-col items-start justify-center"
            data-test-id="username"
          >
            <span className="text-xl font-bold">{userProfile.name}</span>
            <span className="text-base font-light text-gray-500">
              @{userProfile.username}
            </span>
          </div>
          {/* discription */}
          <div
            className="flex items-center justify-start break-words pe-5 text-base font-normal"
            data-testid="userDescription"
          >
            <span>{userProfile.discription ?? "Discription"}</span>
          </div>
          {/* joinded on */}
          <div className="flex items-center justify-start gap-2 text-gray-500">
            <BiCalendar />
            <span className="text-base font-light">
              {moment(userProfile.createdAt).format("[Joined] MMMM YYYY")}
            </span>
          </div>
          {/* followers Following */}
          <div
            className="flex items-center justify-start gap-2"
            data-testid="followers"
          >
            <Link
              href={`${params.username}/following`}
              className="flex items-center gap-1 decoration-1 hover:underline"
            >
              {userProfile._count.following}
              <span className="text-base font-light text-gray-500">
                Following
              </span>
            </Link>
            <Link
              href={`${params.username}/followers`}
              className="flex items-center gap-1 decoration-1 hover:underline"
            >
              {userProfile._count.follower}
              <span className="text-base font-light text-gray-500">
                Followers
              </span>
            </Link>
          </div>
        </div>
      </div>
      <nav>
        <Navigation username={params.username} navItems={navItems} />
      </nav>
      <div className="mb-16">{children}</div>
    </div>
  );
}

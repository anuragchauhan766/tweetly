"use client";
function FollowButton() {
  return (
    <div>
      <button
        className="flex items-center justify-center px-4 py-1 bg-white rounded-full text-black
           font-medium hover:bg-white/90"
        onClick={() => console.log("clicked")}
      >
        Follow
      </button>
    </div>
  );
}

export default FollowButton;

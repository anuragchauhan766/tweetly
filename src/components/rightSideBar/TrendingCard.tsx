import React from "react";

function TrendingCard() {
  return (
    <div className="w-full hover:bg-white/10 px-4 py-3 last:rounded-b-2xl transition duration-200 cursor-pointer">
      <div className="font-bold text-lg">#Trending1</div>
      <div className="text-sm text-gray-400">32.3K</div>
    </div>
  );
}

export default TrendingCard;

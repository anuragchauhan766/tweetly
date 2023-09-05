"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="hover:bg-white/10 p-2 rounded-full"
    >
      <IoMdArrowBack />
    </button>
  );
}

export default GoBackButton;

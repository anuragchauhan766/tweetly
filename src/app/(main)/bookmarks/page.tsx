"use client";
import UnderService from "@/components/common/UnderService";
import { usePathname } from "next/navigation";
import React from "react";

function Bookmarks() {
  const pathname = usePathname();
  return <UnderService pathname={pathname} />;
}

export default Bookmarks;

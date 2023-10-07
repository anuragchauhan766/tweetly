"use client";
import UnderService from "@/components/common/UnderService";
import { usePathname } from "next/navigation";
import React from "react";

function Explore() {
  const pathname = usePathname();
  return <UnderService pathname={pathname} />;
}

export default Explore;

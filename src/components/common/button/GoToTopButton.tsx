"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

function GoToTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if window is defined (client side)
      window.addEventListener("scroll", toggleVisible);
      return () => {
        window.removeEventListener("scroll", toggleVisible);
      };
    }
  });
  return (
    <button
      className={`w-10 h-10 rounded-full p-2 bg-blue fixed bottom-12 right-10 flex items-center justify-center animate-bounce ${
        visible ? "inline" : "hidden"
      }`}
    >
      <AiOutlineArrowUp
        onClick={scrollToTop}
        className="stroke-white w-8 h-8"
      />
    </button>
  );
}

export default GoToTopButton;

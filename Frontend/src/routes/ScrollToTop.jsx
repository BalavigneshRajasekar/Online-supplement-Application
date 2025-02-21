/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathName } = useLocation();

  useEffect(() => {
    console.log("scrollToTop");

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    scrollToTop();
  }, [pathName]);
  return null;
}

export default ScrollToTop;

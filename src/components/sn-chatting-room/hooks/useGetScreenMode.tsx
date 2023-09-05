"use client";

import useWindowSize from "hooks/useWindowSize";
import React from "react";

const useGetScreenMode = () => {
  const { width = 0, height = 0 } = useWindowSize();

  return {
    mobileMode: width < 600,
    ipadMode: width >= 600 && width <= 1024,
    desktopMode: width > 1024,
    extraDesktopMode: width > 1600,
    superDesktopMode: width >= 1920,

    size: {
      width,
      height,
    },
  };
};

export default useGetScreenMode;

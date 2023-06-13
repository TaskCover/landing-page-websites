"use client";

import { useCallback, useEffect, useState } from "react";
import useEventListener from "./useEventListener";
import { Breakpoint, useTheme } from "@mui/material";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | undefined>();
  const { breakpoints } = useTheme();

  const onGetBreakpoint = useCallback(() => {
    const currentBreakpoint = getCurrentBreakpoint(breakpoints.values) || "xs";
    setBreakpoint(currentBreakpoint);
  }, [breakpoints]);

  useEventListener("resize", onGetBreakpoint);

  useEffect(() => {
    onGetBreakpoint();
  }, [onGetBreakpoint]);

  return breakpoint;
};

export default useBreakpoint;

const getCurrentBreakpoint = (breakpoints: { [key: string]: number }) => {
  if (typeof window === "undefined") return;
  let currentBreakpoint;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(breakpoints)) {
    const breakpointValue = breakpoints[breakpoint];

    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }

  return currentBreakpoint as Breakpoint;
};

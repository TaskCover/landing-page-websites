"use client";

import { memo, useEffect } from "react";
import { Stack } from "@mui/material";
import { useHeaderConfig } from "store/app/selectors";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { onUpdateHeaderConfig } = useHeaderConfig();

  useEffect(() => {
    onUpdateHeaderConfig({
      title: "Projects management",
      searchPlaceholder: "Search project by name",
    });
    return () => {
      onUpdateHeaderConfig({
        title: undefined,
        searchPlaceholder: undefined,
        prevPath: undefined,
      });
    };
  }, [onUpdateHeaderConfig]);

  return <Stack flex={1}>{children}</Stack>;
};

export default memo(Wrapper);

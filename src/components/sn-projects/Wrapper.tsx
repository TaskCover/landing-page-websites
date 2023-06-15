"use client";

import { memo, useEffect } from "react";
import { Stack } from "@mui/material";
import { useHeaderConfig } from "store/app/selectors";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { onUpdateHeaderConfig } = useHeaderConfig();

  useEffect(() => {
    onUpdateHeaderConfig({
      title: "Quản lý dự án",
      searchPlaceholder: "Tìm kiếm dự án",
    });
    return () => {
      onUpdateHeaderConfig({ title: undefined, searchPlaceholder: undefined });
    };
  }, [onUpdateHeaderConfig]);

  return <Stack flex={1}>{children}</Stack>;
};

export default memo(Wrapper);

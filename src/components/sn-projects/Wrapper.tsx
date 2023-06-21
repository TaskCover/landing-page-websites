"use client";

import { memo, useEffect } from "react";
import { Stack } from "@mui/material";
import { useHeaderConfig } from "store/app/selectors";
import { useTranslations } from "next-intl";
import { NS_PROJECT } from "constant/index";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { onUpdateHeaderConfig } = useHeaderConfig();
  const projectT = useTranslations(NS_PROJECT);

  useEffect(() => {
    onUpdateHeaderConfig({
      title: projectT("list.title"),
      searchPlaceholder: "Search project by name",
    });
    return () => {
      onUpdateHeaderConfig({
        title: undefined,
        searchPlaceholder: undefined,
        prevPath: undefined,
      });
    };
  }, [onUpdateHeaderConfig, projectT]);

  return <Stack flex={1}>{children}</Stack>;
};

export default memo(Wrapper);

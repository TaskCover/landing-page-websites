"use client";

import { memo, useEffect } from "react";
import { Stack } from "@mui/material";
import { useHeaderConfig } from "store/app/selectors";
import { useTranslations } from "next-intl";
import { NS_COMMON, NS_PROJECT } from "constant/index";
import { Endpoint } from "api";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { onUpdateHeaderConfig } = useHeaderConfig();
  const projectT = useTranslations(NS_PROJECT);
  const commonT = useTranslations(NS_COMMON);

  useEffect(() => {
    onUpdateHeaderConfig({
      title: projectT("list.title"),
      searchPlaceholder: commonT("searchBy", { name: projectT("list.key") }),
      endpoint: Endpoint.PROJECTS,
      key: "name",
    });
    return () => {
      onUpdateHeaderConfig({
        title: undefined,
        searchPlaceholder: undefined,
        prevPath: undefined,
        endpoint: undefined,
        key: undefined,
      });
    };
  }, [commonT, onUpdateHeaderConfig, projectT]);

  return (
    <Stack flex={1} overflow="hidden">
      {children}
    </Stack>
  );
};

export default memo(Wrapper);

'use client';

import { Endpoint } from "api";
import Wrapper from "components/Wrapper";
import { NS_COMMON, NS_SALES } from "constant/index";
import { useTranslations } from "next-intl";
import React, { memo, useEffect } from "react";
import { useHeaderConfig } from "store/app/selectors";

interface IProps {
  children: React.ReactNode;
}

const SalesWrapper: React.FC<IProps> = ({ children }) => {
  const { onUpdateHeaderConfig } = useHeaderConfig();
  const commonT = useTranslations(NS_COMMON);
  const salesT = useTranslations(NS_SALES);

  useEffect(() => {
    onUpdateHeaderConfig({
      title: salesT("list.title"),
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
  }, [commonT, onUpdateHeaderConfig, salesT]);

  return (
    <Wrapper overflow="auto" inFrame>
      {children}
    </Wrapper>
  );
};
export default memo(SalesWrapper);

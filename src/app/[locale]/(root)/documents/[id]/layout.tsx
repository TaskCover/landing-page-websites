"use client";

import { useLayoutEffect } from "react";
import { useDocs } from "store/docs/selectors";

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const RootLayout = ({ children, params: { id } }: RootLayoutProps) => {
  const { handleGetDocDetail } = useDocs();
  useLayoutEffect(() => {
    if (id) {
      handleGetDocDetail(id);
    }
  }, []);

  return children;
};

export default RootLayout;

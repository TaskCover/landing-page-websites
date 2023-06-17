"use client";

import { memo, useEffect } from "react";
import { useAuth } from "store/app/selectors";
import { useCompany } from "store/company/selectors";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { item, onGetCompany, error, isFetching } = useCompany();

  useEffect(() => {
    if (!user?.id) return;
    onGetCompany(user.id);
  }, [onGetCompany, user?.id]);

  return children;
};

export default memo(Wrapper);

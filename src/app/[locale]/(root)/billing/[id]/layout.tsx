"use client";

import BillingDetailLayout from "layouts/BillingDetailLayout";

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const RootLayout = ({ children, params: { id } }: RootLayoutProps) => {
  return <BillingDetailLayout id={id}>{children}</BillingDetailLayout>;
};

export default RootLayout;

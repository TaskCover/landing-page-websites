"use client";
import DetailCareersPage from "components/sn-careers/detail-career";
type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

const RootLayout = ({ children, params: { id } }: RootLayoutProps) => {
  return <DetailCareersPage />;
};

export default RootLayout;

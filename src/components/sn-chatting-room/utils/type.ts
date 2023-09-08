import { MobileScreen } from "./constants";

export type MobileScreenType = `${MobileScreen}`;

export type HeaderMobileProps = {
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  title?: string;
  backgroundColor?: string;
};

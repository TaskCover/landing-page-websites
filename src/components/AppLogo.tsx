import React, { memo } from "react";
import Image, { ImageProps } from "next/image";
import AppLogoImage from "public/images/img-app-logo.webp";

const AppLogo = (props: Omit<ImageProps, "src" | "alt">) => {
  return <Image src={AppLogoImage} alt="App Logo" {...props} />;
};

export default memo(AppLogo);

import { Stack } from "@mui/material";
import { memo } from "react";
import Image, { ImageProps } from "next/image";
import LogoImage from "public/images/img-logo.webp";
import { Text } from "components/shared";
import FacebookIcon from "icons/FacebookIcon";
import InstagramIcon from "icons/InstagramIcon";
import LinkInIcon from "icons/LinkInIcon";
import PremiumIcon from "icons/PremiumIcon";
import TwitterIcon from "icons/TwitterIcon";

const FooterHeader = () => {
  return (
    <Stack>
      <Image
        src={LogoImage}
        alt="App Logo"
        style={{ margin: "auto" }}
        width={98}
        height={107}
      />
      <Text align="center">
        Slogan Our paper is sourced from <br /> FSC-certified mills.
      </Text>
      <Stack direction="row" justifyContent="center" spacing={3} mt={3}>
        <FacebookIcon />
        <InstagramIcon />
        <LinkInIcon />
        <PremiumIcon />
        <TwitterIcon />
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
        <Image width={135} height={40} src="/images/google-play-btn.svg" alt="google-play" />
        <Image width={120} height={40} src="/images/app-store-btn.svg" alt="app-store-btn" />
      </Stack>
    </Stack>
  );
};

export default memo(FooterHeader);

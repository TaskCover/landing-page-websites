import {
  Switch as MuiSwitch,
  Stack,
  StackProps,
  switchClasses,
  SxProps,
} from "@mui/material";
import { Locale } from "constant/types";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { memo, useRef } from "react";
import Link from "./Link";

const SwitchLanguage = (props: StackProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const linkRef = useRef<HTMLLinkElement | null>(null);

  const onChangeValue = () => {
    if (linkRef?.current?.href) {
      replace(linkRef.current.href);
    }
  };

  return (
    <Stack {...props}>
      <MuiSwitch
        disableRipple
        sx={defaultSx as SxProps}
        checked={locale === "vi"}
        onChange={onChangeValue}
      />
      <Link
        ref={linkRef}
        href={pathname}
        locale={locale === "vi" ? "en" : "vi"}
        sx={{ display: "none" }}
      />
    </Stack>
  );
};

export default memo(SwitchLanguage);

const defaultSx = {
  width: 62,
  height: 28,
  p: 0,
  borderRadius: 4,
  boxSizing: "border-box",
  [`&.${switchClasses.sizeSmall}`]: {
    height: 24,
    width: 48,
    [`& .${switchClasses.thumb}`]: {
      width: 20,
      height: 20,
    },
    [`& .${switchClasses.switchBase}`]: {
      [`&.${switchClasses.checked}`]: {
        left: 10,
      },
    },
  },
  [`& .${switchClasses.switchBase}`]: {
    p: 0,
    top: 2,
    left: 2,
    [`&.${switchClasses.disabled}`]: {
      opacity: 0.25,
    },
    [`&.${switchClasses.checked}`]: {
      top: 2,
      left: 14,
      [`&+.${switchClasses.track}`]: {
        borderColor: "grey.50",
        opacity: 1,
        backgroundColor: "grey.50",
      },
      [`&.${switchClasses.disabled}+.${switchClasses.track}`]: {
        opacity: 0.7,
      },
      [`& .${switchClasses.thumb}`]: {
        "&:before": {
          background: `url('/images/img-vn-flag.png') no-repeat center center`,
          backgroundSize: "cover",
        },
        "&:after": {
          content: "'VN'",
          left: -22,
        },
      },
    },
  },
  [`& .${switchClasses.track}`]: {
    border: "1px solid",
    borderColor: "grey.50",
    opacity: 1,
    backgroundColor: "grey.50",
    borderRadius: 4,
  },
  [`& .${switchClasses.thumb}`]: {
    width: 24,
    height: 24,
    backgroundColor: "grey.300",
    border: "1px solid",
    borderColor: "grey.300",
    borderRadius: "50%",
    boxSizing: "border-box",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      background: `url('/images/img-usa-flag.png') no-repeat center center`,
      backgroundSize: "cover",
    },
    "&:after": {
      content: "'ENG'",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 26,
      top: 0,
      fontSize: 14,
      color: "text.primary",
      fontWeight: 600,
    },
  },
};

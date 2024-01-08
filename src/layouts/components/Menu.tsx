import { Stack } from "@mui/material";
import Link from "components/Link";
import { Text } from "components/shared";
import { NS_LAYOUT } from "constant/index";
import useBreakpoint from "hooks/useBreakpoint";
import useTheme from "hooks/useTheme";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { memo, useMemo, useState } from "react";
import { useAuth, useSidebar } from "store/app/selectors";
import { MenuItemProps } from "./helpers";
import BarsIcon from "icons/BarsIcon";

const Menu = () => {
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack
      width={isMdSmaller ? "unset" : "100%"}
      gap={5}
      mb={0.652}
      ml={5}
      sx={{
        flexDirection: "row",
        justifyContent: isMdSmaller ? "space-between" : "flex-start",
      }}
    >
      {isMdSmaller ? <BarsIcon sx={{fontSize: 24}} /> : DATA.map((item) => {
        return <MenuItem key={item.label} {...item} />;
      })}
    </Stack>
  );
};

export default memo(Menu);

const MenuItem = (props: MenuItemProps) => {
  const { isExpandedSidebar } = useSidebar();
  const { isLgSmaller, isSmSmaller } = useBreakpoint();

  const isShowLarge = useMemo(
    () => isExpandedSidebar && !isLgSmaller,
    [isExpandedSidebar, isLgSmaller],
  );

  return <LinkItem {...props} />;
};

const LinkItem = (props: Omit<MenuItemProps, "children">) => {
  const { href, label } = props;

  const t = useTranslations(NS_LAYOUT);

  const { isExpandedSidebar } = useSidebar();
  const { isLgSmaller, isSmSmaller } = useBreakpoint();

  const isShowLarge = useMemo(
    () => isExpandedSidebar && !isLgSmaller,
    [isExpandedSidebar, isLgSmaller],
  );

  const pathname = usePathname();

  return (
    <Link
      href={href ?? "#"}
      // className={isActiveLink ? "active" : ""}
      underline="none"
      sx={{
        color: "grey.900",
        display: "inline-flex",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          fontSize: 14,
        }}
      >
        <Text
          color="grey.900"
          variant={{ xs: "body2", xl: "body1" }}
          fontWeight={500}
          noWrap
          textTransform="capitalize"
        >
          {label}
        </Text>
      </Stack>
    </Link>
  );
};

const DATA: MenuItemProps[] = [
  {
    label: "Product",
    href: "",
  },
  {
    label: "AI",
    href: "",
  },
  {
    label: "Pricing",
    href: "",
  },
  {
    label: "Use cases",
    href: "",
  },
  {
    label: "Resources",
    href: "",
  },
];

import { Stack } from "@mui/material";
import Link from "components/Link";
import { Text } from "components/shared";
import { NS_APPLICANTS } from "constant/index";
import {
  APPLICANTS_DETAIL_PATH,
  CAREER_DETAIL_PATH
} from "constant/paths";
import useBreakpoint from "hooks/useBreakpoint";
import useTheme from "hooks/useTheme";
import ChevronIcon from "icons/ChevronIcon";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useParams } from "next/navigation";
import { memo, useMemo } from "react";
import { useHeaderConfig } from "store/app/selectors";
import { getPath } from "utils/index";

type TabItemProps = {
  href: string;
  label: string;
};

const TabList = () => {
  const { prevPath, title } = useHeaderConfig();
  const { isSmSmaller } = useBreakpoint();
  const applicantsT = useTranslations(NS_APPLICANTS);

  const TABS = [
    {
      label: applicantsT("applicants.head.tab_title"),
      href: CAREER_DETAIL_PATH,
    },
    {
      label: applicantsT("applicants.head.tab_title_applicants"),
      href: APPLICANTS_DETAIL_PATH,
    },
  ];

  return (
    <Stack
      direction={{ md: "row" }}
      borderBottom={{ md: "1px solid" }}
      justifyContent="space-between"
      borderColor={{ md: "grey.100" }}
      width="100%"
      overflow="auto"
      spacing={4}
      position="sticky"
      top={{ xs: 0, md: 24 }}
      bgcolor="background.paper"
      zIndex={1}
      mb={{ xs: 2, md: 0 }}
    >
      {!!isSmSmaller && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          pb={2}
          pt={{ md: 2 }}
        >
          {!!prevPath && (
            <Link href={prevPath} sx={{ height: 24 }}>
              <ChevronIcon
                sx={{ color: "text.primary", transform: "rotate(90deg)" }}
                fontSize="medium"
              />
            </Link>
          )}
          <Text variant="h5">{title ?? ""}</Text>
        </Stack>
      )}
      <Stack direction="row" alignItems="center">
        {TABS.map((tab) => (
          <TabItem key={tab.label} {...tab} />
        ))}
      </Stack>
    </Stack>
  );
};

export default memo(TabList);

const TabItem = (props: TabItemProps) => {
  const { href, label } = props;
  const pathname = usePathname();
  const params = useParams();
  const { isDarkMode } = useTheme();

  const isActiveLink = useMemo(() => {
    const suffixPath = getSuffixPath(pathname);
    const suffixHref = getSuffixPath(href);
    return suffixPath === suffixHref;
  }, [href, pathname]);

  return (
    <Link
      href={getPath(href, undefined, { id: params.id as string })}
      underline="none"
      sx={{
        minWidth: 120,
        bgcolor: isActiveLink
          ? isDarkMode
            ? "grey.50"
            : "primary.light"
          : "transparent",
        "&:hover": {
          bgcolor: isDarkMode ? "grey.50" : "primary.light",
        },
        py: { xs: 2, sm: 2.5 },
        px: { xs: 2, sm: 3.5 },
        borderRadius: 1,
      }}
    >
      <Text
        variant="body2"
        color={isActiveLink ? "text.primary" : "grey.300"}
        fontWeight={500}
        whiteSpace="nowrap"
      >
        {label}
      </Text>
    </Link>
  );
};

const getSuffixPath = (path: string) => {
  const arrSplit = path.split("/");

  return arrSplit[3];
};

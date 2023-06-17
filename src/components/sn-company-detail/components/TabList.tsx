import { memo, useMemo } from "react";
import { Stack, StackProps } from "@mui/material";
import Link from "components/Link";
import { Text } from "components/shared";
import { COMPANY_DETAIL_PATH, COMPANY_EMPLOYEES_PATH } from "constant/paths";
import { useParams, usePathname } from "next/navigation";
import { getPath } from "utils/index";

type TabItemProps = {
  href: string;
  label: string;
};

const TabList = () => {
  return (
    <Stack
      direction={{ md: "row" }}
      borderBottom="1px solid"
      justifyContent="space-between"
      borderColor="grey.100"
      width="100%"
      overflow="auto"
      spacing={4}
    >
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

  const isActiveLink = useMemo(() => {
    const suffixPath = getSuffixPath(pathname);
    const suffixHref = getSuffixPath(href);
    return suffixPath === suffixHref;
  }, [href, pathname]);

  return (
    <Link
      href={getPath(href, undefined, { id: params.id })}
      underline="none"
      sx={{
        minWidth: 120,
        bgcolor: isActiveLink ? "primary.light" : "transparent",
        "&:hover": {
          bgcolor: "primary.light",
        },
        py: { xs: 2, sm: 2.5 },
        px: { xs: 2, sm: 3.5 },
        borderRadius: 1,
      }}
    >
      <Text variant="body2" fontWeight={600} whiteSpace="nowrap">
        {label}
      </Text>
    </Link>
  );
};

const TABS = [
  { label: "Company Information", href: COMPANY_DETAIL_PATH },
  { label: "Employee List", href: COMPANY_EMPLOYEES_PATH },
];

const getSuffixPath = (path: string) => {
  const arrSplit = path.split("/");

  return arrSplit[3];
};

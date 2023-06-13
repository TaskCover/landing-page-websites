import { memo, useMemo } from "react";
import { Stack } from "@mui/material";
import Link from "components/Link";
import { Text } from "components/shared";
import { usePathname } from "next/navigation";
import MenuDashboardIcon from "icons/MenuDashboardIcon";
import { COST_HISTORY_PATH, EMPLOYEES_PATH, HOME_PATH } from "constant/paths";
import MenuProjectIcon from "icons/MenuProjectIcon";
import MenuTaskIcon from "icons/MenuTaskIcon";
import MenuCompanyIcon from "icons/MenuCompanyIcon";
import Collapse from "./Collapse";

type MenuItemProps = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  subs?: MenuItemProps[];
};

const Menu = () => {
  return (
    <Stack width="100%" spacing={1.5}>
      {DATA.map((item) => (
        <MenuItem key={item.label} {...item} />
      ))}
    </Stack>
  );
};

export default memo(Menu);

const MenuItem = (props: MenuItemProps) => {
  const { icon, href, label, subs } = props;

  const pathname = usePathname();

  const isActiveLink = useMemo(
    () => checkIsActiveLink(pathname, href),
    [pathname, href],
  );

  if (subs) {
    return (
      <Collapse label={label} icon={icon}>
        {subs.map((subItem) => (
          <LinkItem key={subItem.label} {...subItem} />
        ))}
      </Collapse>
    );
  }

  return <LinkItem {...props} />;
};

const LinkItem = (props: Omit<MenuItemProps, "children">) => {
  const { icon, href, label } = props;

  const pathname = usePathname();

  const isActiveLink = useMemo(
    () => checkIsActiveLink(pathname, href),
    [pathname, href],
  );

  return (
    <Link
      href={href ?? "#"}
      className={isActiveLink ? "active" : ""}
      underline="none"
      sx={{
        width: "100%",
        color: "grey.400",
        borderRadius: 1,
        px: 2.5,
        py: 1.5,
        backgroundColor: { xs: "grey.50", sm: undefined },
        "&:hover, &.active": {
          backgroundColor: "primary.light",
        },
        display: "inline-flex",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          "& svg:first-of-type": {
            fontSize: 24,
          },
        }}
      >
        {icon}
        <Text color="grey.400" ml={icon ? undefined : 4.5} noWrap>
          {label}
        </Text>
      </Stack>
    </Link>
  );
};

const DATA: MenuItemProps[] = [
  { label: "Dashboard", href: HOME_PATH, icon: <MenuDashboardIcon /> },
  {
    label: "Project",
    icon: <MenuProjectIcon />,
    subs: [
      { label: "Employees", href: EMPLOYEES_PATH },
      { label: "Cost History", href: COST_HISTORY_PATH },
    ],
  },
  {
    label: "Task",
    icon: <MenuTaskIcon />,
  },
  {
    label: "Company",
    icon: <MenuCompanyIcon />,
    subs: [
      { label: "Employees", href: EMPLOYEES_PATH },
      { label: "Cost History", href: COST_HISTORY_PATH },
    ],
  },
];

const checkIsActiveLink = (pathname: string, href?: string) => {
  return Boolean(
    pathname &&
      href &&
      (pathname === href ||
        (href.length && href !== "/" && pathname.startsWith(href))),
  );
};

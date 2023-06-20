import { memo, useMemo, useState, MouseEvent } from "react";
import { Stack } from "@mui/material";
import Link from "components/Link";
import { Text } from "components/shared";
import { usePathname } from "next/navigation";
import MenuDashboardIcon from "icons/MenuDashboardIcon";
import {
  COMPANIES_PATH,
  COST_HISTORY_PATH,
  EMPLOYEES_PATH,
  HOME_PATH,
  MY_COMPANY_PATH,
  POSITIONS_PATH,
  PROJECTS_PATH,
  PROJECT_TYPES_PATH,
  STATEMENT_HISTORY_PATH,
} from "constant/paths";
import MenuProjectIcon from "icons/MenuProjectIcon";
import MenuTaskIcon from "icons/MenuTaskIcon";
import MenuCompanyIcon from "icons/MenuCompanyIcon";
import Collapse from "./Collapse";
import { useSidebar } from "store/app/selectors";
import useBreakpoint from "hooks/useBreakpoint";
import SubMenu from "./SubMenu";
import { MenuItemProps } from "./helpers";

const Menu = () => {
  return (
    <Stack width="100%" spacing={1.5} overflow="auto">
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
  const { isExpandedSidebar } = useSidebar();
  const { isLgSmaller, isSmSmaller } = useBreakpoint();

  const isShowLarge = useMemo(
    () => isExpandedSidebar && !isLgSmaller,
    [isExpandedSidebar, isLgSmaller],
  );

  if (subs && (isShowLarge || isSmSmaller)) {
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
  const { icon, href, label, subs } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { isExpandedSidebar } = useSidebar();
  const { isLgSmaller, isSmSmaller } = useBreakpoint();

  const isShowLarge = useMemo(
    () => isExpandedSidebar && !isLgSmaller,
    [isExpandedSidebar, isLgSmaller],
  );

  const pathname = usePathname();

  const isActiveLink = useMemo(
    () => checkIsActiveLink(pathname, href),
    [pathname, href],
  );

  const onMouseOver = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!subs) return;
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    if (!subs) return;
    setAnchorEl(null);
  };

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
      tooltip={isShowLarge || isSmSmaller || !!subs ? undefined : label}
      placement="right"
      onMouseOver={onMouseOver}
      onMouseOut={onClose}
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
        {(isShowLarge || isSmSmaller) && (
          <Text
            color="grey.400"
            variant={{ xs: "body2", sm: "body1" }}
            ml={icon ? undefined : 4.5}
            noWrap
            textTransform="capitalize"
          >
            {label}
          </Text>
        )}
        {!!subs && (
          <SubMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            options={subs}
          />
        )}
      </Stack>
    </Link>
  );
};

const DATA: MenuItemProps[] = [
  { label: "Dashboard", href: HOME_PATH, icon: <MenuDashboardIcon /> },
  {
    label: "Project",
    icon: <MenuProjectIcon />,
    href: PROJECTS_PATH,
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
      { label: "List Of Positions", href: POSITIONS_PATH },
      { label: "Project Type List", href: PROJECT_TYPES_PATH },
      { label: "Company Information", href: MY_COMPANY_PATH },
    ],
  },
  {
    label: "Manager",
    icon: <MenuCompanyIcon />,
    subs: [
      { label: "Company List", href: COMPANIES_PATH },
      { label: "Statement history", href: STATEMENT_HISTORY_PATH },
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

import { memo, useMemo, useState, MouseEvent } from "react";
import { Stack } from "@mui/material";
import Link from "components/Link";
import { Text } from "components/shared";
import { usePathname } from "next-intl/client";
import MenuDashboardIcon from "icons/MenuDashboardIcon";
import {
  AUTHORIZED_PATHS,
  COMPANIES_PATH,
  COST_HISTORY_PATH,
  EMPLOYEES_PATH,
  HOME_PATH,
  MY_COMPANY_PATH,
  POSITIONS_PATH,
  PROJECTS_PATH,
  PROJECT_TYPES_PATH,
  STATEMENT_HISTORY_PATH,
  TIME_TRACKING_PATH,
  RESOURCE_PLANING_PATH,
  SALES_LIST_PATH,
  DOCS_PATH,
} from "constant/paths";
import MenuProjectIcon from "icons/MenuProjectIcon";
import MenuTaskIcon from "icons/MenuTaskIcon";
import MenuCompanyIcon from "icons/MenuCompanyIcon";
import Collapse from "./Collapse";
import { useAuth, useSidebar } from "store/app/selectors";
import useBreakpoint from "hooks/useBreakpoint";
import SubMenu from "./SubMenu";
import { MenuItemProps } from "./helpers";
import { useTranslations } from "next-intl";
import { NS_LAYOUT } from "constant/index";
import { Permission } from "constant/enums";
import useTheme from "hooks/useTheme";
import MenuTimeTrackingIcon from "icons/MenuTimeTrackingIcon";
import MenuResourcePlaningIcon from "icons/MenuResourcePlaningIcon";
import CardReceive from "icons/CardReceive";
import MenuDocsIcon from "icons/MenuDocsIcon";

const Menu = () => {
  const { user } = useAuth();

  return (
    <Stack
      width="100%"
      spacing={{ xs: 1, xl: 1.5 }}
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {DATA.map((item) => {
        const isAuthorized = user?.roles?.some((role) =>
          item?.roles?.includes(role),
        );
        if (isAuthorized) {
          return <MenuItem key={item.label} {...item} />;
        }
        return null;
      })}
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

  const t = useTranslations(NS_LAYOUT);

  const { isDarkMode } = useTheme();

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
        px: isShowLarge || isSmSmaller ? { xs: 1.5, xl: 2.5 } : 1,
        py: isShowLarge || isSmSmaller ? { xs: 1, xl: 1.5 } : 1,
        // backgroundColor: {
        //   xs: isDarkMode ? "background.default" : "grey.50",
        //   sm: undefined,
        // },
        "&:hover, &.active": {
          backgroundColor: isDarkMode ? "grey.50" : "primary.light",
        },
        display: "inline-flex",
      }}
      tooltip={isShowLarge || isSmSmaller || !!subs ? undefined : t(label)}
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
            variant={{ xs: "body2", xl: "body1" }}
            ml={icon ? undefined : 4.5}
            noWrap
            textTransform="capitalize"
          >
            {t(label)}
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
  {
    label: "menu.dashboard",
    href: HOME_PATH,
    icon: <MenuDashboardIcon />,
    roles: [Permission.AM, Permission.ST],
  },
  {
    label: "menu.project",
    icon: <MenuProjectIcon />,
    href: PROJECTS_PATH,
    roles: [Permission.AM, Permission.ST],
  },
  // {
  //   label: "menu.task",
  //   icon: <MenuTaskIcon />,
  //   roles: [Permission.AM, Permission.ST],
  // },
  {
    label: "menu.company",
    icon: <MenuCompanyIcon />,
    subs: [
      { label: "menu.employees", href: EMPLOYEES_PATH, roles: [Permission.AM] },
      {
        label: "menu.costHistory",
        href: COST_HISTORY_PATH,
        roles: [Permission.AM],
      },
      {
        label: "menu.listOfPositions",
        href: POSITIONS_PATH,
        roles: [Permission.AM],
      },
      {
        label: "menu.projectTypeList",
        href: PROJECT_TYPES_PATH,
        roles: [Permission.AM],
      },
      {
        label: "menu.companyInformation",
        href: MY_COMPANY_PATH,
        roles: [Permission.AM],
      },
    ],
    roles: [Permission.AM],
  },
  {
    label: "menu.manager",
    icon: <MenuCompanyIcon />,
    subs: [
      {
        label: "menu.companyList",
        href: COMPANIES_PATH,
        roles: [Permission.SA],
      },
      {
        label: "menu.statementHistory",
        href: STATEMENT_HISTORY_PATH,
        roles: [Permission.SA],
      },
    ],
    roles: [Permission.SA],
  },
  {
    label: "menu.timeTracking",
    href: TIME_TRACKING_PATH,
    icon: <MenuTimeTrackingIcon />,
    roles: [Permission.AM, Permission.ST],
  },
  {
    label: "menu.docs",
    href: DOCS_PATH,
    icon: <MenuDocsIcon />,
    roles: [Permission.AM, Permission.ST],
  },
  {
    label: "menu.resourcePlaning",
    href: RESOURCE_PLANING_PATH,
    icon: <MenuResourcePlaningIcon />,
    roles: [Permission.AM, Permission.ST],
  },
  {
    label: "menu.sales",
    href: SALES_LIST_PATH,
    icon: <CardReceive />,
    roles: [Permission.AM, Permission.ST],
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

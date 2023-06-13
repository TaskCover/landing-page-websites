// import { memo, useId, useMemo, MouseEvent, useState, useEffect } from "react";
// import {
//   Popper,
//   Stack,
//   PopperProps,
//   MenuList,
//   Box,
//   MenuItem as MuiMenuItem,
// } from "@mui/material";
// import {
//   HOME_PATH,
//   REFERRAL_CAMPAIGN_PATH,
//   FLASH_EVENT_PATH,
//   TOURNAMENT_SEASONS_PATH,
//   TOURNAMENT_PACKAGES_PATH,
//   GAME_CONFIG_RACETRACKS_PATH,
//   GAME_CONFIG_PRACTICES_PATH,
//   GAME_CONFIG_CARS_PATH,
//   GAME_CONFIG_BANNERS_PATH,
//   GAME_CONFIG_GROUPS_PATH,
//   GAME_CONFIG_SCHEDULES_PATH,
//   DAPP_CONFIG_STAKING_PATH,
//   DAPP_CONFIG_MARKETPLACE_PATH,
//   CUSTOMER_PLAYERS_PATH,
//   CUSTOMER_GUILDS_PATH,
//   CUSTOMER_PARTNERS_PATH,
//   ADMINISTRATOR_USERS_PATH,
//   ADMINISTRATOR_ROLES_PATH,
//   ADMINISTRATOR_PERMISSIONS_PATH,
//   SYSTEM_ON_CHAIN_PATH,
//   SYSTEM_REDIS_PATH,
//   SYSTEM_MAIN_CONFIG_PATH,
//   MEDIA_PATH,
//   CLAN_PATH,
//   SEASON_PATH,
// } from "constant/path";
// import {
//   MenuDashboardIcon,
//   MenuCustomerIcon,
//   MenuDappConfigIcon,
//   MenuFlashEventIcon,
//   MenuGameConfigIcon,
//   MenuMediaIcon,
//   MenuReferralIcon,
//   MenuSystemIcon,
//   MenuTournamentIcon,
//   ChevronIcon,
//   MenuAdministratorIcon,
//   MenuStarIcon,
//   ClubIcon,
//   SeasonIcon,
// } from "icons";
// import Link from "components/Link";
// import { Text } from "components/shared";
// import { usePathname } from "next/navigation";
// import { useAuth, useSidebar } from "store/app";

import { Stack } from "@mui/material";
import { memo } from "react";

// type MenuItemProps = {
//   label: string;
//   href: string;
//   icon?: React.ReactNode;
//   subs?: MenuItemProps[];
// };

const Menu = () => {
  // const { isExpandedSidebar } = useSidebar();
  // const { authPermission, onGetAuthPermission, isConnected } = useAuth();

  // useEffect(() => {
  //   if (!isConnected || authPermission) return;
  //   onGetAuthPermission();
  // }, [authPermission, isConnected, onGetAuthPermission]);

  return (
    <Stack
      width="100%"
      // alignItems={isExpandedSidebar ? "initial" : "center"}
      spacing={0.75}
      px={1}
    >
      {/* {DATA.map((item) => (
        <MenuItem key={item.href} {...item} />
      ))} */}
    </Stack>
  );
};

export default memo(Menu);

// const MenuItem = (props: MenuItemProps) => {
//   const { icon, href, label, subs } = props;
//   const { isExpandedSidebar } = useSidebar();
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

//   const pathname = usePathname();

//   const isActiveLink = useMemo(
//     () => checkIsActiveLink(pathname, href),
//     [pathname, href],
//   );

//   const onMouseOver = (event: MouseEvent<HTMLAnchorElement>) => {
//     if (!subs) return;
//     setAnchorEl(event.currentTarget);
//   };

//   const onClose = () => {
//     if (!subs) return;
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <Link
//         href={href}
//         className={isActiveLink ? "active" : ""}
//         underline="none"
//         sx={{
//           width: "100%",
//           color: "grey.200",
//           borderRadius: 1,
//           px: isExpandedSidebar ? 3 : 1,
//           py: 1.25,
//           "&:hover, &.active": {
//             color: "common.white",
//             backgroundColor: "grey.500",
//           },
//         }}
//         onMouseOver={onMouseOver}
//         onMouseOut={onClose}
//       >
//         <Stack
//           direction={isExpandedSidebar ? "row" : "column"}
//           alignItems="center"
//           spacing={isExpandedSidebar ? 1.5 : 0}
//           justifyContent={isExpandedSidebar ? "initial" : "center"}
//           sx={{
//             "& svg:first-of-type": {
//               fontSize: 24,
//             },
//           }}
//         >
//           {icon}
//           <Text
//             variant={isExpandedSidebar ? "body2" : "caption"}
//             mt={0.5}
//             fontWeight={600}
//             noWrap
//           >
//             {label}
//           </Text>
//           {!!subs && (
//             <>
//               {isExpandedSidebar && (
//                 <ChevronIcon
//                   sx={{
//                     transform: "rotate(-90deg)",
//                     fontSize: 14,
//                     ml: "auto!important",
//                   }}
//                 />
//               )}

//               <SubMenu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 options={subs}
//               />
//             </>
//           )}
//         </Stack>
//       </Link>
//     </>
//   );
// };

// const SubMenu = (
//   props: Omit<PopperProps, "children"> & { options: MenuItemProps[] },
// ) => {
//   const { options, ...rest } = props;
//   const popoverId = useId();

//   const pathname = usePathname();

//   return (
//     <Popper
//       id={popoverId}
//       placement="right-start"
//       sx={{
//         borderRadius: 1.5,
//         width: 200,
//         backgroundColor: "grey.A700",
//         zIndex: 100,
//       }}
//       {...rest}
//     >
//       <MenuList component={Box}>
//         {options.map((item) => {
//           const isActiveLink = checkIsActiveLink(pathname, item.href);
//           return (
//             <MuiMenuItem
//               className={`row-center ${isActiveLink ? "active" : ""}`}
//               component={Link}
//               href={item.href}
//               sx={{
//                 px: 2,
//                 py: 1.25,
//                 "&:hover, &.active": {
//                   backgroundColor: "grey.600",
//                 },
//               }}
//               key={item.href}
//               underline="none"
//             >
//               <Text variant="body2" color="common.white" fontWeight={600}>
//                 {item.label}
//               </Text>
//             </MuiMenuItem>
//           );
//         })}
//       </MenuList>
//     </Popper>
//   );
// };

// const DATA: MenuItemProps[] = [
//   { label: "Home", href: HOME_PATH, icon: <MenuDashboardIcon /> },
//   {
//     label: "Referral",
//     href: REFERRAL_CAMPAIGN_PATH,
//     icon: <MenuReferralIcon />,
//     subs: [{ label: "Campaign", href: REFERRAL_CAMPAIGN_PATH }],
//   },
//   {
//     label: "Flash event",
//     href: FLASH_EVENT_PATH,
//     icon: <MenuFlashEventIcon />,
//   },
//   {
//     label: "Tournament",
//     href: TOURNAMENT_SEASONS_PATH,
//     icon: <MenuTournamentIcon />,
//     subs: [
//       { label: "Seasons", href: TOURNAMENT_SEASONS_PATH },
//       { label: "Packages", href: TOURNAMENT_PACKAGES_PATH },
//     ],
//   },

//   {
//     label: "Racing Club",
//     href: CLAN_PATH,
//     icon: <ClubIcon />,
//   },
//   {
//     label: "Season",
//     href: SEASON_PATH,
//     icon: <SeasonIcon />,
//   },
//   {
//     label: "Game config",
//     href: GAME_CONFIG_RACETRACKS_PATH,
//     icon: <MenuGameConfigIcon />,
//     subs: [
//       { label: "Racetracks", href: GAME_CONFIG_RACETRACKS_PATH },
//       // { label: "Practices", href: GAME_CONFIG_PRACTICES_PATH },
//       { label: "Cars", href: GAME_CONFIG_CARS_PATH },
//       // { label: "Banners", href: GAME_CONFIG_BANNERS_PATH },
//       // { label: "Groups", href: GAME_CONFIG_GROUPS_PATH },
//       { label: "Schedules", href: GAME_CONFIG_SCHEDULES_PATH },
//     ],
//   },
//   {
//     label: "Dapp config",
//     href: DAPP_CONFIG_STAKING_PATH,
//     icon: <MenuDappConfigIcon />,
//     subs: [
//       { label: "Staking", href: DAPP_CONFIG_STAKING_PATH },
//       { label: "Marketplace", href: DAPP_CONFIG_MARKETPLACE_PATH },
//     ],
//   },
//   {
//     label: "Customer",
//     href: CUSTOMER_PLAYERS_PATH,
//     icon: <MenuCustomerIcon />,
//     subs: [
//       { label: "Players", href: CUSTOMER_PLAYERS_PATH },
//       { label: "Guilds", href: CUSTOMER_GUILDS_PATH },
//       { label: "Partners", href: CUSTOMER_PARTNERS_PATH },
//     ],
//   },
//   {
//     label: "Administrator",
//     href: ADMINISTRATOR_USERS_PATH,
//     icon: <MenuAdministratorIcon />,
//     subs: [
//       { label: "Users", href: ADMINISTRATOR_USERS_PATH },
//       { label: "Roles", href: ADMINISTRATOR_ROLES_PATH },
//       { label: "Permissions", href: ADMINISTRATOR_PERMISSIONS_PATH },
//     ],
//   },
//   {
//     label: "System",
//     href: SYSTEM_ON_CHAIN_PATH,
//     icon: <MenuSystemIcon />,
//     subs: [
//       { label: "On-chain", href: SYSTEM_ON_CHAIN_PATH },
//       // { label: "Redis", href: SYSTEM_REDIS_PATH },
//       { label: "Main config", href: SYSTEM_MAIN_CONFIG_PATH },
//     ],
//   },
//   {
//     label: "Media",
//     href: MEDIA_PATH,
//     icon: <MenuMediaIcon />,
//   },
// ];

// const checkIsActiveLink = (pathname: string, href: string) => {
//   return Boolean(
//     pathname &&
//       (pathname === href ||
//         (href.length && href !== "/" && pathname.startsWith(href))),
//   );
// };

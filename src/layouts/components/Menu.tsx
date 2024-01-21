import { Button, Stack } from "@mui/material";
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
import AboutUsIcon from "public/images/header/ic-about-us.svg";
import AgencyIcon from "public/images/header/ic-agency.svg";
import BlogIcon from "public/images/header/ic-blog.svg";
import CareerIcon from "public/images/header/ic-career.svg";
import EventAgencyIcon from "public/images/header/ic-event-agency.svg";
import HelpCenterIcon from "public/images/header/ic-help-center.svg";
import MarketingIcon from "public/images/header/ic-marketing.svg";
import ProductionIcon from "public/images/header/ic-production.svg";
import RemoteIcon from "public/images/header/ic-remote-team.svg";
import SoftwareIcon from "public/images/header/ic-software.svg";
import TrustCenterIcon from "public/images/header/ic-trust-center.svg";
import ArrowDownIc from "public/images/home-page/arrow-right.svg";
import Image from "next/image";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const Menu = () => {
  const { isMdSmaller } = useBreakpoint();
  const pathname = usePathname();

  const [hovering, setHovering] = useState<number | null>(null);
  const [popoverLeft, setPopoverLeft] = useState<number | null>(null);
  const [popoverHeight, setPopoverHeight] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState({ popoverLeft: 0, isActive: false, tabKey: 0 })

  return (
    <Stack
      width={isMdSmaller ? "unset" : "100%"}
      gap={5}
      mb={0.652}
      ml={5}
      sx={{
        flexDirection: "row",
        justifyContent: isMdSmaller ? "space-between" : "flex-start",
        display: { md: "flex", xs: "none" },
        transition: "all .3s",
      }}
      onMouseEnter={() => setHovering(null)}
    // onMouseLeave={() => setHovering(null)}
    >
      {DATA.map((item, index) => {
        const pathActive = item.href == pathname || (item.child && item.child.map(e => e.link).includes(pathname))
        return (
          <Link
            key={index}
            href={item.href ?? "#"}
            // className={isActiveLink ? "active" : ""}
            underline="none"
            sx={{
              color: "grey.900",
              display: "inline-flex",
              position: "relative",
              transition: ".3s",
            }}
            onClick={(event) => {
              // setActiveTab({
              //   popoverLeft: event.currentTarget.clientLeft,
              //   isActive: activeTab.tabKey === index ? !activeTab.isActive : true,
              //   tabKey: index
              // })
              // setHovering(index);
              setPopoverLeft(event.currentTarget.clientLeft);
            }}
          >


            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                      fontSize: 14,
                      gap: "2px",
                      borderBottom: pathActive ? "3px solid #0a7fdc" : "none",
                      "&:hover": {
                        borderBottom: "3px solid #0a7fdc"
                      }
                    }}
                    {...bindTrigger(popupState)}
                  >
                    <Text
                      color={pathActive ? "#000" : "grey.900"}
                      variant={{ xs: "body2", xl: "body1" }}
                      fontWeight={500}
                      noWrap
                      textTransform="capitalize"

                    >
                      {item.label}
                    </Text>
                    {item.child ? <ExpandMoreIcon width={16} height={16} />
                      : <></>}
                  </Stack>
                  {item.child && (
                    <Popover
                      {...bindPopover(popupState)}
                      anchorPosition={{ top: 50, left: popoverLeft as number }}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      sx={{
                        p: "16px",
                        boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.2)",
                        border: "1px solid white",
                        borderRadius: "16px",
                      }}
                    >
                      <Stack
                        display={{ xs: "flex", md: "grid" }}
                        direction="column"
                        gridTemplateColumns={item.label == "Product" ? "1fr 1fr 1fr" : "1fr 1fr"}
                        sx={{
                          // position: 'absolute',
                          // top: 50,
                          // left: activeTab.popoverLeft,
                          p: "16px",
                          width: "fit-content",
                          borderRadius: "16px",
                          transition: ".3s",
                          zIndex: 9999,
                        }} >
                        {
                          item.child.map((e, i) => (
                            <Link href={e.link ?? "#"} key={i}>
                              <Stack direction="row" alignItems="center" gap="8px"
                                sx={{
                                  p: "16px 12px",
                                  minWidth: { xs: "auto", md: "200px" },
                                  width: "100%",
                                }}
                              >
                                <Image src={e.icon} alt="icon" width={24} height={24} />
                                <Text sx={{
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                  textDecoration: "none"
                                }}>{e.label}</Text>
                              </Stack>
                            </Link>

                          ))
                        }
                      </Stack>
                    </Popover>
                  )}
                </div>
              )}
            </PopupState>
          </Link>
        );
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
    href: "/products",
    child: [
      {
        icon: "/images/project-ic.png",
        label: "Project",
        link: "/products/project",
      },
      {
        icon: "/images/folder-ic.png",
        label: "Resource Planning",
        link: "/products/resource",
      },
      {
        icon: "/images/document-ic.png",
        label: "Document",
        link: "/products/document",
      },
      {
        icon: "/images/chat-ic.png",
        label: "Chat",
        link: "/products/chat",
      },
      {
        icon: "/images/clock-ic.png",
        label: "Time Tracking",
        link: "/products/time-tracking",
      },
      {
        icon: "/images/wallet-ic.png",
        label: "Budgeting",
        link: "/products/budgeting",
      },
      {
        icon: "/images/tag-ic.png",
        label: "Sales",
        link: "/products/sale",
      },
      {
        icon: "/images/bill-ic.png",
        label: "Billing",
        link: "/products/biling",
      },
    ],
  },
  {
    label: "AI",
    href: "/AI",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Use cases",
    href: "/use-case/marketing-agency",
    child: [
      {
        icon: MarketingIcon,
        label: "Marketing Agency",
        link: "/use-case/marketing-agency",
      },
      {
        icon: SoftwareIcon,
        label: "Software Agency",
        link: "/use-case/software-agency",
      },
      {
        icon: ProductionIcon,
        label: "Production House",
        link: "/use-case/production-house",
      },
      {
        icon: AgencyIcon,
        label: "Law Agency",
        link: "/use-case/law-agency",
      },
      {
        icon: EventAgencyIcon,
        label: "Event Agency",
        link: "/use-case/event-agency",
      },
      {
        icon: RemoteIcon,
        label: "Remote Team",
        link: "/use-case/remote-team",
      },
    ]
  },
  {
    label: "Resources",
    href: "/about-us",
    child: [
      {
        icon: AboutUsIcon,
        label: "About Us",
        link: "/about-us",
      },
      {
        icon: BlogIcon,
        label: "Blog",
        link: "/blog",
      },
      {
        icon: HelpCenterIcon,
        label: "Help Center",
        link: "/help-center",
      },
      {
        icon: CareerIcon,
        label: "Career",
        link: "/careers",
      },
      {
        icon: TrustCenterIcon,
        label: "Trust Center",
        link: "/trust-center",
      },
    ]
  },
];

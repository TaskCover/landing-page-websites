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

const Menu = () => {
  const { isMdSmaller } = useBreakpoint();

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
        transition: "1s",
      }}
      onMouseEnter={() => setHovering(null)}
    // onMouseLeave={() => setHovering(null)}
    >
      {DATA.map((item, index) => {
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
              transition: "1s",
            }}
            onClick={(event) => {
              setActiveTab({
                popoverLeft: event.currentTarget.clientLeft,
                isActive: activeTab.tabKey === index ? !activeTab.isActive : true,
                tabKey: index
              })
              // setHovering(index);
              // setPopoverLeft(event.currentTarget.clientLeft);
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                fontSize: 14,
                gap: "2px",
                "&:hover": {
                  borderBottom: "3px solid #0a7fdc"
                }
              }}
            >
              <Text
                color="grey.900"
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
            {item.child && activeTab.tabKey === index && activeTab.isActive && (
              <Stack
                display={{ xs: "flex", md: "grid" }}
                direction="column"
                gridTemplateColumns={item.label == "Product" ? "1fr 1fr 1fr" : "1fr 1fr"}
                sx={{
                  position: 'absolute',
                  top: 50,
                  left: activeTab.popoverLeft,
                  backgroundColor: "white",
                  width: "fit-content",
                  minHeight: "100px",
                  p: "24px",
                  boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.2)",
                  border: "1px solid white",
                  borderRadius: "16px",
                  transition: "1s",
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
            )}
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
    href: "",
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
    href: "",
  },
  {
    label: "Pricing",
    href: "",
  },
  {
    label: "Use cases",
    href: "",
    child: [
      {
        icon: MarketingIcon,
        label: "Marketing Agency",
        link: "/",
      },
      {
        icon: SoftwareIcon,
        label: "Software Agency",
        link: "/",
      },
      {
        icon: ProductionIcon,
        label: "Production House",
        link: "/",
      },
      {
        icon: AgencyIcon,
        label: "Law Agency",
        link: "/",
      },
      {
        icon: EventAgencyIcon,
        label: "Event Agency",
        link: "/",
      },
      {
        icon: RemoteIcon,
        label: "Remote Team",
        link: "/",
      },
    ]
  },
  {
    label: "Resources",
    href: "",
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

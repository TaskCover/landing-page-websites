import ModernCardIc from "public/images/pricing/icon-modern-card.svg";
import NoFeedIc from "public/images/pricing/icon-no-fee.svg";
import SecureIc from "public/images/pricing/icon-secure.svg";

import StarterIc from "public/images/pricing/icon-started.svg";
import BasicIc from "public/images/pricing/icon-basic.svg";
import StandardIc from "public/images/pricing/icon-standard.svg";
import PlusIc from "public/images/pricing/icon-plus.svg";
import PremiumIc from "public/images/pricing/icon-premium.svg";

import ActiveIcon from "public/images/pricing/icon-active.svg";
import UnactiveIcon from "public/images/pricing/icon-unactive.svg";

export const CardHeadData = [
    {
        imgUrl: ModernCardIc,
        title: "Modern Cards",
        desc: "End-to-end payments and financial management in a single solution. Meet the right platform.",
    },
    {
        imgUrl: NoFeedIc,
        title: "No Extra Fee",
        desc: "End-to-end payments and financial management in a single solution. Meet the right platform.",
    },
    {
        imgUrl: SecureIc,
        title: "Super Secure",
        desc: "End-to-end payments and financial management in a single solution. Meet the right platform.",
    },
]

export const ListPackageUnbeatuble = [
    {
        isFree: true,
        title: "Free",
        desc: "Free 14-day trial",
        infoItems: ["General", "Billing", "Document 15GB", "Sale & Budgeting", "Task & Projects", "Optimized hashtags", "Standard using AI in writing script"]
    },
    {
        title: "Basic",
        pricePackage: "9",
        desc: "Everything in Basic",
        infoItems: ["General", "Billing", "Document 15GB", "Sale & Budgeting", "Task & Projects", "Optimized hashtags", "Standard using AI in writing script"],
        tag: "#bestdeal",
    },
    {
        title: "Plus",
        pricePackage: "19",
        desc: "Everything in Basic & Plus",
        infoItems: ["General", "Billing", "Document 15GB", "Sale & Budgeting", "Task & Projects", "Optimized hashtags", "Time Tracking", "Resources Planning", "Unlimited AI funcitons"],
        tag: "#highlyrecommended",
        isActive: true,
    },
    {
        title: "Premium",
        pricePackage: "39",
        desc: "Everything in Plus & Up",
        infoItems: ["General", "Billing", "Document 15GB", "Sale & Budgeting", "Task & Projects", "Optimized hashtags", "Time Tracking", "Resources Planning", "Unlimited AI funcitons", "Premium service"],
        tag: "#valuable",
    },
]

export const TableHeadPackage = [
    {
        isNoneItem: true,
    },
    {
        icon: StarterIc,
        packageName: "Starter",
        isFree: true,
        bgColor: "#fff",
    },
    {
        icon: BasicIc,
        packageName: "Basic",
        pricePackage: "5",
        bgColor: "#EFF5FE",
    },
    {
        icon: StandardIc,
        packageName: "Standard",
        pricePackage: "49",
        bgColor: "#DEEAFD",

    },
    {
        icon: PlusIc,
        packageName: "Plus",
        pricePackage: "149",
        bgColor: "#BDD6FB",
    },
    {
        icon: PremiumIc,
        packageName: "Premium",
        pricePackage: "499",
        bgColor: "#5C98F6"
    },
]

export const TableBodyPackage = [
    {
        title: "Map views",
        desc: "1 mapview = 15 titles",
        listValue: [
            "3,000", "10,000", "100,000", "300,000", "1,000,000",
        ],

    },
    {
        title: "Total storage",
        desc: "Vector tiles or MBtles",
        listValue: [
            "100 MB", "1 GB", "5 GB", "25 GB", "50 GB",
        ],
    },
    {
        title: "Custom styles",
        desc: "Mapbox Studio",
        listValue: [
            "1 style", "3 style", "10 style", "20 style", "30 style",
        ],
    },
    {
        title: "SSL maps",
        desc: "Secure encryption",
        listAvailable: [
            ActiveIcon, ActiveIcon, ActiveIcon, ActiveIcon, ActiveIcon
        ],
    },
    {
        title: "Online support",
        desc: "We're here to help",
        listAvailable: [
            ActiveIcon, ActiveIcon, ActiveIcon, ActiveIcon, ActiveIcon
        ],
    },
    {
        title: "Mapbox Satellite",
        desc: "Beautiful imagery",
        listAvailable: [
            UnactiveIcon, ActiveIcon, ActiveIcon, ActiveIcon, ActiveIcon
        ],
    },
    {
        title: "Dedicated support",
        desc: "1-Day email support",
        listAvailable: [
            UnactiveIcon, UnactiveIcon, UnactiveIcon, UnactiveIcon, ActiveIcon
        ],
    },
    {
        title: "Apps behind paywalls",
        desc: "Up to 1,000 seats 􀁝",
        listAvailable: [
            UnactiveIcon, UnactiveIcon, UnactiveIcon, UnactiveIcon, ActiveIcon
        ],
    },
]
export const TableBackgroundItem = [
    "#fff", "#EFF5FE", "#DEEAFD", "#BDD6FB", "#5C98F6"
]

export const ListPackageLink = ["/", "/", "/", "/", "/"]
export const ListExcellence = [
    {
        icon: "/images/pricing/icon-company.svg",
        label: "Company",
        link: "/",
    },
    {
        icon: "/images/project-ic.png",
        label: "Project",
        link: "/",
    },
    {
        icon: "/images/clock-ic.png",
        label: "Time Tracking",
        link: "/",
    },
    {
        icon: "/images/document-ic.png",
        label: "Document",
        link: "/",
    },
    {
        icon: "/images/chat-ic.png",
        label: "Chat",
        link: "/",
    },
    {
        icon: "/images/pricing/icon-writing.svg",
        label: "Writing Assistant",
        link: "/",
    },
    {
        icon: "/images/wallet-ic.png",
        label: "Budgeting",
        link: "/",
    },
    {
        icon: "/images/folder-ic.png",
        label: "Resource Planning",
        link: "/",
    },
    {
        icon: "/images/tag-ic.png",
        label: "Sales",
        link: "/",
    },
    {
        icon: "/images/bill-ic.png",
        label: "Billing",
        link: "/",
    },
];
import { Stack } from '@mui/material';
import { Button, Text } from "components/shared";
import Image from "next/image";
import ArrowRightIcon from "public/images/home-page/arrow-right.svg";
import ImgLinePage from "public/images/home-page/img-line-page.svg";
import { memo } from 'react';
import {
    ManageProjectItems
} from "../configs";
import Link from "components/Link";
import ManagementProjectImg from "public/images/home-page/bg-manage-project.png";
import ArrowRightLineIc from "public/images/home-page/arrow-right-line.svg";


type ManageProjectLayoutProps = {}

const ManageProjectLayout = (props: ManageProjectLayoutProps) => {
    return (
        <Stack width="100%" sx={{
            background: "url(/images/home-page/bg-project-manage.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}>
            <Stack
                sx={sectionContainerSx}
            >
                <Text variant={{ xs: "h3", md: "h1" }} sx={[textHeadSx, { textAlign: "center" }]} >
                    Manage the project effectively to
                </Text>
                <Stack flexDirection="row" gap="8px">
                    <Text variant={{ xs: "h3", md: "h1" }} fontWeight={500} sx={[textHeadSx, { textAlign: "center" }]}>
                        achieve
                    </Text>
                    <Text
                        variant={{ xs: "h3", md: "h1" }}
                        sx={[textHeadSx, {
                            background:
                                "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textAlign: "center"
                        }]}
                    >
                        the bottom line
                    </Text>
                </Stack>
                <Text variant={{ xs: "h5", md: "h4" }} fontWeight={400} color="#374151" mt={{ xs: "8px", md: "16px" }} sx={{ textAlign: "center" }}>
                    Help you to reach your goals through efficient project management
                </Text>
                <Stack mt={{ xs: "16px", md: "24px" }} mb={{ xs: "24px", md: "40px" }}>
                    <Image src={ImgLinePage} width={178} height={4} alt="image line" />
                </Stack>
                <Button
                    className="MuiButton-primary"
                    sx={{ flexDirection: "row", gap: "8px" }}
                >
                    Free 14-day trial
                    <Image src={ArrowRightIcon} width={20} height={20} alt="image" />
                </Button>
                <Stack gap={{ xs: "16px", md: "24px" }} mt={{ xs: "24px", md: "50px" }}
                    position="relative"
                    sx={{
                        minHeight: {
                            xs: "auto", md: "500px"
                        }
                    }}
                >
                    <Image src={ManagementProjectImg}
                        width={0}
                        height={0}
                        style={{
                            width: "100%",
                            maxWidth: "1117px",
                            height: "auto",
                        }} alt="image" />
                    <Stack
                        gap="16px"
                        display={{ xs: "flex", md: "grid" }}
                        flexDirection={{ xs: "column", md: "row" }}
                        gridTemplateColumns="1fr 1fr 1fr"
                        width="100%"
                        sx={{
                            position: { xs: "relative", md: "absolute" },
                            bottom: { xs: "0px", md: "-80px" },
                            left: 0,
                        }}
                    >
                        {ManageProjectItems.map((item, index) => (
                            <Stack
                                key={index}
                                p="20px"
                                gap="12px"
                                borderRadius="24px"
                                border="1px solid primary.contrastText"
                                boxShadow="0px 4px 40px 0px rgba(43, 89, 255, 0.08)"
                                bgcolor="rgba(255, 255, 255, 0.70)"
                                sx={{
                                    backdropFilter: "blur(5px)",
                                    border: "1px solid #0575E6",
                                }}
                            >
                                <Stack flexDirection="row">
                                    <Image src={item.icon} width={32} height={32} alt="image" />
                                    <Text variant="subtitle1" fontWeight={700} color="#000">
                                        {item.label}
                                    </Text>
                                </Stack>
                                <Text variant="body1" fontWeight={400} color="#4B5563">
                                    {item.desc}
                                </Text>
                                <Link href={item.linkUrl}>
                                    <Stack
                                        sx={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <Text variant="body1" fontWeight={400} color="#5C98F6">
                                            Learn more
                                        </Text>
                                        <Image
                                            src={ArrowRightLineIc}
                                            width={20}
                                            height={20}
                                            alt="image"
                                        />
                                    </Stack>
                                </Link>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    )
}

export default memo(ManageProjectLayout);

const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    m: "0 auto",
    maxWidth: "1200px",
    p: { xs: "40px 16px 60px", md: "60px 0px 250px" },
    zIndex: 10,
    position: "relative",
};

const textHeadSx = {
    lineHeight: { xs: "32px", md: "48px" },
    fontSize: { xs: "24px", md: "40px" },
    fontWeight: 500,
};
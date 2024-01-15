import { Stack } from "@mui/material";
import useBreakpoint from "hooks/useBreakpoint";
import { memo } from "react";
import { Button, Text } from "components/shared";
import Image from "next/image";
import AimingIc from "public/images/careers/icon-aiming.svg";
import AttractiveIc from "public/images/careers/icon-attractive.svg";
import AgileIc from "public/images/careers/icon-agile.svg";
import PiorityImg from "public/images/careers/img-priority.png";

type OurPiorityLayoutProps = {};

const OurPiorityLayout = (props: OurPiorityLayoutProps) => {
    const { isMdSmaller } = useBreakpoint();

    return (
        <Stack
            width="100%"
            sx={{
            }}
        >
            <Stack
                sx={[
                    sectionContainerSx,
                ]}
            >
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    gap="24px"
                >
                    <Text sx={[textGradientSx, {
                        fontSize: "18px",
                        fontWeight: 400,
                        lineHeight: "28px"

                    }]}>
                        OUR BENEFITS
                    </Text>
                    <Text variant="h3" >
                        Your Success, Our Priority!
                    </Text>
                </Stack>
                <Stack
                    mt="40px"
                    display="grid"
                    gridTemplateColumns={{ xs: "1fr", md: "4fr 5fr" }}
                    gap={{ xs: "24px", md: "30px" }}
                >
                    <Stack
                        gap={{ xs: "24px", md: "40px" }}
                    >
                        {LIST_PRIORITY.map(e => (
                            <Stack direction="row" alignItems="flex-start" gap="20px">
                                <Stack sx={{
                                    borderRadius: "12px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
                                    p: "12px"
                                }}>
                                    <Image src={e.icon} width={24} height={24} alt="icon" />
                                </Stack>
                                <Stack gap="4px">
                                    <Text variant="h5" fontWeight={500}>
                                        {e.title}
                                    </Text>
                                    <Text variant="h5" fontWeight={400} >
                                        {e.desc}
                                    </Text>
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                    <Image src={PiorityImg} alt="image"
                        style={{
                            width: "100%",
                            height: "auto",
                        }} />
                </Stack>
            </Stack>
        </Stack >
    );
};

export default memo(OurPiorityLayout);

const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    m: "0 auto",
    maxWidth: "1200px",
    p: { xs: "60px 16px", md: "100px 0px " },

};

const textHeadSx = {
    lineHeight: { xs: "32px", md: "60px" },
    fontSize: { xs: "24px", md: "40px" },
    fontWeight: 700,
    textAlign: "center",
};

const textGradientSx = {
    background:
        "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
}

const LIST_PRIORITY = [
    {
        icon: AimingIc,
        title: "Aiming to outstanding success",
        desc: "Fugiat nulla pariatur excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id ",
    },
    {
        icon: AttractiveIc,
        title: "Attractive salary and bonus",
        desc: "Fugiat nulla pariatur excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id ",
    },
    {
        icon: AgileIc,
        title: "Agile working environment",
        desc: "Fugiat nulla pariatur excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id ",
    }
]
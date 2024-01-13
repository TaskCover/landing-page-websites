import { Stack } from '@mui/material';
import useBreakpoint from 'hooks/useBreakpoint';
import { memo } from 'react';
import { Button, Text } from "components/shared";
import Image from "next/image";
import HeadImg from "public/images/pricing/img-head-page.png";
import { CardHeadData } from '../configs';

type HeadLayoutProps = {}

const HeadLayout = (props: HeadLayoutProps) => {
    const { isMdSmaller } = useBreakpoint();

    return (
        <Stack
            width="100%"
            sx={{
                background: "url(/images/home-page/bg-head-page.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}>
            <Stack
                gap={{ xs: "40px", md: "60px" }}
                sx={sectionContainerSx}
            >
                <Stack
                    sx={{
                        display: { xs: "flex", md: "grid" },
                        gap: "24px",
                        direction: "column",
                        gridTemplateColumns: "repeat(2,1fr)",
                        alignItems: "center",
                    }}>
                    <Stack
                        gap={{ xs: "24px", md: "32px" }}
                        alignItems={{ xs: "center", md: "start" }}
                    >
                        <Text
                            variant="h5"
                            sx={[textGradientSx, {
                                fontWeight: 700,
                                textAlign: { xs: "center", md: "start" }
                            }]}>
                            TaskCover
                        </Text>
                        <Stack>
                            <Text
                                component="span"
                                sx={[textHeadSx]}>
                                Optimize Productivity via<br />
                                <Text
                                    component="span"
                                    sx={[textHeadSx, textGradientSx]}>
                                    TaskCover
                                </Text>
                                : Choose the {isMdSmaller && <br />} perfect {!isMdSmaller && <br />} plan that suits your needs
                            </Text>

                        </Stack>
                        <Text
                            variant="overline"
                            sx={{
                                fontSize: { xs: "16px", md: "18px" },
                                lineHeight: { xs: "24px", md: "28px" },
                                fontWeight: 400,
                                textAlign: { xs: "center", md: "start" },
                                textTransform: "none",
                            }}>
                            Optimize your progress. Select the best plan and enhance your experience today.
                        </Text>
                        <Button
                            sx={{
                                width: { xs: "120px", md: "170px" },
                                background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                                color: "#fff",
                                fontSize: { xs: "14px", md: "16px" },
                                borderRadius: "24px",
                                p: "12px 24px"
                            }}
                        >
                            Learn More
                        </Button>
                    </Stack>
                    <Stack width="100%">
                        <Image src={HeadImg}
                            style={{
                                width: "100%",
                                height: "auto"
                            }}
                            alt="image"
                        />
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        display: { xs: "flex", md: "grid" },
                        gap: "24px",
                        direction: "column",
                        gridTemplateColumns: "repeat(3,1fr)",
                    }}
                >
                    {CardHeadData.map((card, index) => (
                        <Stack
                            sx={{
                                p: "20px",
                                gap: "12px",
                                borderRadius: "24px",
                                border: "1px solid #fff",
                                backgroundColor: "rgba(255, 255, 255,.4)",
                                boxShadow: "0px 0px 14.93px 0px rgba(170, 198, 245, 0.12)"
                            }}>
                            <Stack>
                                <Image
                                    src={card.imgUrl}
                                    alt="image"
                                />
                                <Text
                                    sx={{
                                        color: "#7696E9",
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        lineHeight: "24px"
                                    }}
                                >
                                    {card.title}
                                </Text>
                            </Stack>
                            <Text
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "24px"
                                }}
                            >
                                {card.desc}
                            </Text>
                        </Stack>
                    ))}
                </Stack>

            </Stack>
        </Stack >
    )
}

export default memo(HeadLayout);
const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    m: "0 auto",
    maxWidth: "1200px",
    p: { xs: "40px 16px 60px", md: "60px 0px 60px" },
    position: 'relative',
};

const textGradientSx = {
    background:
        "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: { xs: "center", md: "start" },
}

const textHeadSx = {
    fontSize: { xs: "24px", md: "36px" },
    lineHeight: { xs: "32px", md: "44px" },
    fontWeight: 700,
    textAlign: { xs: "center", md: "start" },
}
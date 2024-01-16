import { Input, Stack } from '@mui/material';
import useBreakpoint from 'hooks/useBreakpoint';
import { memo } from 'react';
import { Button, Text, TextGradient } from "components/shared";
import SendMailBg from "public/images/pricing/bg-more-infomation.png";
import Image from "next/image";

type MoreInfoProps = {}

const MoreInfo = (props: MoreInfoProps) => {
    const { isMdSmaller } = useBreakpoint();

    return (
        <Stack
            width="100%"
            sx={{
                position: "relative"
            }}>
            <Image src={SendMailBg} alt=""
                style={{
                    height: "201px",
                    width: "auto",
                    position: "absolute",
                    bottom: "5%",
                    right: "10%",
                }} />
            <Stack
                sx={sectionContainerSx}
            >
                <Stack display={{ xs: "none", md: "flex" }} width="100%" mb="40px">
                    <Text variant="h3" sx={{
                        textAlign: "center"
                    }}>
                        For More Information
                    </Text>
                </Stack>
                <Stack
                    sx={{
                        backgroundImage: `url(/images/bg-send-question-product${isMdSmaller ? "-mobile" : ""
                            }.png)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100%",
                        aspectRatio: { md: "1169/390", xs: "343/482" },
                        alignItems: { md: "flex-end", xs: "center" },
                        justifyContent: "center",
                    }}
                >
                    <Stack
                        width={{ md: "50%", xs: "100%" }}
                        mr={{ md: 3, xs: 0 }}
                        alignItems={{ md: "flex-start", xs: "center" }}
                    >
                        <Stack display={{ xs: "flex", md: "none" }} width="100%" mb="24px">
                            <Text variant="h4" sx={{
                                fontSize: "24px",
                                textAlign: "center",
                                color: "#fff",
                                fontWeight: 600
                            }}>
                                For More Information
                            </Text>
                        </Stack>
                        <Input
                            placeholder="Full name"
                            disableUnderline
                            sx={{
                                color: "rgba(255, 255, 255, 0.80)",
                                textTransform: "uppercase",
                                border: "1px solid rgba(255, 255, 255, 0.70)",
                                background: "rgba(0, 0, 0, 0.34)",
                                backdropFilter: "blur(6px)",
                                borderRadius: 8,
                                width: "90%",
                                py: 1.75,
                                px: 3,
                                mt: 2,
                            }}
                        />
                        <Input
                            placeholder="Your email address"
                            disableUnderline
                            sx={{
                                color: "rgba(255, 255, 255, 0.80)",
                                textTransform: "uppercase",
                                border: "1px solid rgba(255, 255, 255, 0.70)",
                                background: "rgba(0, 0, 0, 0.34)",
                                backdropFilter: "blur(6px)",
                                borderRadius: 8,
                                width: "90%",
                                py: 1.75,
                                px: 3,
                                mt: 2,
                            }}
                        />
                        <Button
                            sx={{
                                width: "90%",
                                background: "#fff",
                                mt: 3,
                                py: 1.75,
                                borderRadius: 8,
                                "&:hover": {
                                    background: "#fff",
                                },
                            }}
                        >
                            <Text
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "20px",
                                    lineHeight: "32px"
                                }}>
                                Send
                            </Text>
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    )
}

export default memo(MoreInfo);
const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    m: "0 auto",
    maxWidth: "1200px",
    p: { xs: "40px 16px 60px", md: "100px 0px 120px" },
    position: 'relative',
};

const textGradientSx = {
    background:
        "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center"
}


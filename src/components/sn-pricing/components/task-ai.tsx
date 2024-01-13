import { Stack } from '@mui/material';
import useBreakpoint from 'hooks/useBreakpoint';
import { memo } from 'react';
import { Button, Text } from "components/shared";
import Image from "next/image";
import ExcellenceBg from "public/images/pricing/bg-excellence.png";
import ExcellenceImg from "public/images/pricing/img-excellence.png";
type TaskcoverAiProps = {}

const TaskcoverAi = (props: TaskcoverAiProps) => {
    const { isMdSmaller } = useBreakpoint();

    return (
        <Stack
            width="100%"
            sx={{
                backgroundColor: "#DBF3FD",
                position: "relative",
            }}>
            <Image src={ExcellenceBg} alt="" style={{
                height: "201px",
                width: "auto",
                position: "absolute",
                left: 0,
                top: "40%",
            }} />
            <Stack
                sx={sectionContainerSx}
            >
                <Stack
                    sx={{
                        display: { xs: "flex", md: "grid" },
                        gap: "24px",
                        direction: "column",
                        gridTemplateColumns: "4fr 6fr",
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
                            TaskCover AI
                        </Text>
                        <Stack>
                            <Text
                                component="span"
                                sx={[textHeadSx]}>
                                TaskCover AI turns every{!isMdSmaller && <br />} task {isMdSmaller && <br />}into optimization and excellence.
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
                            Revolutionize your workflow with AI precision. Elevate your potential – integrate AI into your progress today.
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
                        <Image src={ExcellenceImg}
                            style={{
                                width: "100%",
                                height: "auto"
                            }}
                            alt="image"
                        />
                    </Stack>
                </Stack>

            </Stack>
        </Stack >
    )
}

export default memo(TaskcoverAi);
const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    m: "0 auto",
    maxWidth: "1200px",
    p: { xs: "40px 16px 60px", md: "60px 0px 160px" },
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

const textHeadSx = {
    fontSize: { xs: "24px", md: "36px" },
    lineHeight: { xs: "32px", md: "44px" },
    fontWeight: 700,
    textAlign: { xs: "center", md: "start" },
}
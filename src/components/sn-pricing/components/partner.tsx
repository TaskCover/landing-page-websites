import { Stack } from '@mui/material';
import useBreakpoint from 'hooks/useBreakpoint';
import { memo } from 'react';
import { Button, Text } from "components/shared";
import Image from "next/image";
import { ListArticles } from 'components/sn-about-us/configs';

type PartnerProps = {}

const Partner = (props: PartnerProps) => {
    const { isMdSmaller } = useBreakpoint();

    return (
        <Stack
            width="100%"
            sx={{
            }}>
            <Stack
                sx={sectionContainerSx}
            >
                <Text
                    variant="h2"
                    sx={[
                        {
                            fontSize: { xs: "24px", md: "40px" },
                            lineHeight: { xs: "32px", md: "38px" },
                            fontWeight: 500,
                            textAlign: "center",
                        }
                    ]}
                >
                    Partner
                </Text>
                <Stack
                    mt={{ xs: "24px", md: "40px" }}
                    display="grid"
                    gridTemplateColumns={{ xs: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
                    width="100%"
                    gap={{ xs: "24px", md: "40px" }}
                    // sx={{
                    //     gridTemplateColumns: "repeat(4, 1fr)",
                    //     ":nth-child(2)": {
                    //         gridTemplateColumns: "repeat(3, 1fr)",
                    //         justifyContent: "center"
                    //     }
                    // }}
                >
                    {
                        ListArticles.map((e, i) => (
                            <Stack key={i}
                                sx={{
                                    borderRadius: { xs: "12px", md: "24px" },
                                    backgroundColor: "#fff",
                                    boxShadow: " 0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: { xs: "12px 25px", md: "32px 54px" },

                                }}>
                                <Image src={e} alt="image"
                                    width={isMdSmaller ? 62 : 120} />
                            </Stack>
                        ))
                    }
                </Stack>
            </Stack>
        </Stack >
    )
}

export default memo(Partner);
const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    m: "0 auto",
    maxWidth: "1200px",
    p: { xs: "40px 16px 60px", md: "60px 0px 120px" },
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


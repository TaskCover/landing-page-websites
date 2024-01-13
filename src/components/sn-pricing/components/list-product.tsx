import { Stack } from '@mui/material';
import useBreakpoint from 'hooks/useBreakpoint';
import { memo } from 'react';
import { Button, Text } from "components/shared";
import Image from "next/image";
import { ListExcellence } from '../configs';

type ListProductProps = {}

const ListProduct = (props: ListProductProps) => {
    const { isMdSmaller } = useBreakpoint();

    return (
        <Stack
            width="100%"
            sx={{

            }}>
            <Stack
                sx={[sectionContainerSx, { alignItems: "center" }]}
            >
                <Stack width="100%"
                    sx={{
                        position: { xs: "relative",md:"absolute" },
                        top:  "-100px",
                        display: "grid",
                        gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(5,1fr)" },
                        p: { xs: "24px 16px", md: "24px 56px" },
                        borderRadius: "16px",
                        border: "1px solid #fff",
                        backgroundColor: "#fff",
                        boxShadow: "0px 0px 14.93px 0px rgba(170, 198, 245, 0.60)"
                    }}
                >
                    {ListExcellence.map((item, index) => (
                        <Stack height="100%" p="12px" justifyContent='center' alignItems="center" gap="8px"
                            sx={{
                                transition: ".3s",
                                "&:hover": {
                                    cursor: "pointer",
                                    transform: "scale(1.1)",
                                    transition: ".3s",
                                }
                            }}>
                            <Image src={item.icon} width={24} height={24} alt="icon" />
                            <Text
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "24px"
                                }}>
                                {item.label}
                            </Text>
                        </Stack>
                    ))}

                </Stack>
            </Stack>
        </Stack >
    )
}

export default memo(ListProduct);
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
    textAlign: "center"
}


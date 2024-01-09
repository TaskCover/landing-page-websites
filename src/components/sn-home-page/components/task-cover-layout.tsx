import { Stack } from '@mui/material';
import { Button, Text } from "components/shared";
import Image from "next/image";
import ArrowRightIcon from "public/images/home-page/arrow-right.svg";
import ImgLinePage from "public/images/home-page/img-line-page.svg";
import { memo } from 'react';
import { TaskCoverItems } from '../configs';
type TaskCoverLayoutProps = {}

const TaskCoverLayout = (props: TaskCoverLayoutProps) => {
    return (
        <Stack width="100%" sx={{
            background: "url(/images/home-page/bg-taskconer.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}>
            <Stack
                sx={sectionContainerSx}
            >
                <Text variant={{ xs: "h3", md: "h1" }} fontWeight={500} style={{ textAlign: "center" }}>
                    TaskCover - A platform to
                </Text>
                <Stack flexDirection={{ xs: "column", md: "row" }} gap={{ xs: "4px", md: "8px" }}>
                    <Text variant={{ xs: "h3", md: "h1" }} fontWeight={500} style={{ textAlign: "center" }}>
                        empower
                    </Text>
                    <Text
                        variant={{ xs: "h3", md: "h1" }}
                        fontWeight={500}
                        sx={{
                            background:
                                "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textAlign: "center",
                        }}
                    >
                        your agency success
                    </Text>
                </Stack>
                <Text variant={{ xs: "h5", md: "h4" }} fontWeight={400} color="#374151" mt="16px" style={{ textAlign: "center" }}>
                    We commit to deliver real results for agencies
                </Text>
                <Stack mt={{ xs: "16px", md: "24px" }} mb={{ xs: "24px", md: "40px" }}>
                    <Image src={ImgLinePage} width={178} height={4} alt="image line" />
                </Stack>
                <Button
                    className="MuiButton-primary"
                    sx={{ flexDirection: "row", gap: "8px" }}
                >
                    Learn More About Us
                    <Image src={ArrowRightIcon} width={20} height={20} alt="image" />
                </Button>
                <Stack
                    display={{ xs: "grid", md: "flex" }}
                    gridTemplateColumns="1fr 1fr"
                    flexDirection='row'
                    width="100%"
                    mt={{ xs: "36px", md: "56px" }}
                    alignItems="center"
                    justifyContent="space-between"
                    overflow="hidden"
                    sx={{
                        borderRadius: "32px"
                    }} >
                    {TaskCoverItems.map((item, index) => {
                        if (item.active) {
                            return (
                                <Stack
                                    key={index}
                                    gap="8px"
                                    width="100%"
                                    height={{ xs: "164px", md: "287px" }}
                                    sx={{
                                        background: "linear-gradient(137deg, #0575E6 10.43%, #00F260 128.53%)",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <Text variant="subtitle1" fontSize={{ xs: "12px", md: "20px" }} fontWeight={700} color="#fff" >
                                        SAVE
                                    </Text>
                                    <Text variant={{ xs: "h3", md: "h1" }} fontSize={{ xs: "36px", md: "64px" }} lineHeight={{ xs: "36px", md: "72px" }} color="#fff" >
                                        2/3
                                    </Text>
                                    <Text variant="overline" fontWeight={600} fontSize={{ xs: "11px", md: "12px" }} color="rgba(255,255,255,.6)" sx={{ textTransform: "none" }}>
                                        {item.desc}
                                    </Text>
                                </Stack>
                            )
                        }
                        else {
                            return (
                                <Stack
                                    gap="8px"
                                    width="100%"
                                    height={{ xs: "164px", md: "287px" }}
                                    sx={{
                                        background: `url(${item.bgImage})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <Stack flexDirection='row' alignItems='center' gap="8px">
                                        <Text variant={{ xs: "h3", md: "h1" }} fontSize={{ xs: "36px", md: "64px" }} color="#000" >
                                            +50
                                        </Text>
                                        <Text variant="h2" fontSize={{ xs: "17px", md: "30px" }} color="#000">
                                            %
                                        </Text>
                                    </Stack>
                                    <Text variant="overline" fontSize={{ xs: "11px", md: "12px" }} fontWeight={600} color="rgba(0,0,0,.6)" sx={{ textTransform: "none", textAlign: "center" }}>
                                        {item.desc}
                                    </Text>
                                </Stack>
                            )
                        }
                    })

                    }
                </Stack>
            </Stack>
        </Stack>
    )
}

export default memo(TaskCoverLayout);
const sectionContainerSx = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    m: "0 auto",
    maxWidth: "1200px",
    p: { xs: "40px 16px 60px", md: "60px 0px 120px" },
    zIndex: 10,
};

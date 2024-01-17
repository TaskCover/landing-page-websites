import { Stack } from '@mui/material';
import { Button, Text } from "components/shared";
import Image from "next/image";
import ActiveIcon from "public/images/home-page/icon-active.svg";
import RecomendedPlagIc from "public/images/home-page/img-flag-recomended.png";
import EmpowerDifferent from "public/images/home-page/img-time-tracking.png";
import BallSaleImg from "public/images/home-page/img-ball-sale.png";
import PlayVideoImg from "public/images/home-page/img-play-video.png";
import PlayVideoIcon from "public/images/home-page/icon-play-video.svg";
import { memo, useState } from 'react';
import Link from "components/Link";
import ArrowRightLineIc from "public/images/home-page/arrow-right-line.svg";
import useBreakpoint from 'hooks/useBreakpoint';
import { ListPackageEmpower } from '../configs';
import Preview from 'components/Preview';
import { MediaType, TypeMedia } from "store/chat/media/typeMedia";

type EmpowerDifferentLayoutProps = {}

const EmpowerDifferentLayout = (props: EmpowerDifferentLayoutProps) => {
    const { isMdSmaller } = useBreakpoint();

    const [tabActive, setTabActive] = useState(ListPackageEmpower[0]);

    const [mediaPreview, setMediaPreview] = useState(false);
    return (
        <Stack width="100%" sx={{

        }}>
            <Stack
                sx={sectionContainerSx}
            >
                <Text
                    variant={{ xs: "h3", md: "h1" }}
                    sx={[textGradientSx, textHeadSx]}
                >
                    See how we empower different teams
                </Text>
                <Text variant={{ xs: "h3", md: "h1" }} sx={textHeadSx} >
                    to gain competitive edge
                </Text>
                <Stack mt={{ xs: "48px", md: "64px" }} width="100%">
                    <Stack
                        p={{ xs: "24px 32px", md: "32px 40px" }}
                        width="100%"
                        position="relative"
                        mb="8px"
                        sx={{
                            borderRadius: "12px",
                            background: " linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)"
                        }}>
                        <Stack position="absolute" sx={{ top: "20px", right: { xs: "-8px", md: "-15px" } }}>
                            <Image src={RecomendedPlagIc} width={isMdSmaller ? 123 : 256} alt={'image flag'}
                            />
                        </Stack>
                        <Stack position="absolute" display={{ xs: "none", md: "flex" }} sx={{ bottom: 0, right: 0 }} width="55%" >
                            <Image src={EmpowerDifferent} width={0} height={0} alt={'image'}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </Stack>
                        <Stack width={{ xs: "100%", md: "40%" }}>
                            <Stack
                                p="4px"
                                borderRadius="40px"
                                flexDirection="row"
                                width="fit-content"
                                sx={{
                                    background: "rgba(255, 255, 255, 0.10)",
                                }}>

                                {ListPackageEmpower.map((item, index) => {
                                    const isActive = tabActive.name == item.name;
                                    return (
                                        <Stack sx={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            p: "6px 24px",
                                            borderRadius: "48px",
                                            backgroundColor: isActive ? "#fff" : "transparent",
                                            transition: ".3s",
                                            "&:hover": {
                                                cursor: 'pointer',
                                                transition: ".3s"
                                            }
                                        }}
                                            onClick={() => setTabActive(item)}
                                        >
                                            <Text variant={{ xs: "caption", md: "body1" }} color={isActive ? "#000" : "#fff"} lineHeight="24px">
                                                {item.name}
                                            </Text>
                                        </Stack>
                                    )
                                })
                                }
                            </Stack>

                            <Stack flexDirection="row" alignItems="center" mt="16px">
                                <Text variant="h2" fontSize={{ xs: "24px", md: "36px" }} color="#fff" sx={{ mr: "16px" }}>
                                    $ {" "}
                                </Text>
                                <Text variant={{ xs: "h3", md: "h1" }} fontSize={{ xs: "48px", md: "60px" }} lineHeight={{ xs: "48px", md: "64px" }} color="#fff">
                                    {tabActive.pricePackage}/
                                </Text>
                                <Text variant="h3" color="#fff" sx={{ ml: "8px" }}>
                                    {tabActive.name == "Monthly" ? "month" : "year"}
                                </Text>
                            </Stack>
                            <Text variant="overline" color="rgba(255,255,255,.7)" lineHeight="28px" fontWeight={400} sx={{ textTransform: "none" }} >
                                /per user
                            </Text>
                            <Stack sx={{
                                width: "fit-content",
                                p: "4px 12px",
                                my: "8px",
                                borderRadius: '40px',
                                background: "#11C77F",
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text variant="caption" color="#fff" fontWeight={500} >
                                    Billed annually
                                </Text>
                            </Stack>
                            <Text variant="overline" fontSize={{ xs: "16px", md: "18px" }} color="rgba(255,255,255,.7)" lineHeight="28px" fontWeight={400} sx={{ textTransform: "none" }}>
                                Perfect for small-to-medium enterprise to make<br /> disruption in the industry
                            </Text>
                            <Stack width="100%" height="1px" bgcolor="rgba(255,255,255,.2)" my="16px" />
                            <Stack
                                gap="13px" mb="24px">
                                {["Every feature and unlimited storage", "Ai agent usage", "24/7 support"].map((e, i) => (
                                    <Stack key={i} flexDirection="row" gap="8px" alignItems="center">
                                        <Image src={ActiveIcon} width={20} height={20} alt="image" />
                                        <Text variant="overline" fontWeight={400} color="#fff" lineHeight="28px" sx={{ textTransform: "none" }}>
                                            {e}
                                        </Text>
                                    </Stack>
                                ))}
                            </Stack>
                            <Button sx={{ width: "180px", background: "#fff", color: "#000", fontSize: "16px", borderRadius: "24px", }}>
                                <Text sx={textGradientSx} fontSize="16px">
                                    Explore now
                                </Text>
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack display={{ xs: "flex", md: "grid" }} flexDirection={{ xs: "column", md: "row" }} gridTemplateColumns="2.5fr 3fr" gap="8px">
                        <Stack sx={{
                            position: "relative",
                            backgroundColor: "#161B22",
                            borderRadius: "12px",
                            p: { xs: "24px 20px 60px", md: "40px 40px 127px" }
                        }}>
                            <Stack sx={{
                                position: "absolute",
                                bottom: 0,
                                right: "20px"
                            }}>
                                <Image src={BallSaleImg} width={isMdSmaller ? 150 : 188} height={isMdSmaller ? 120 : 155} alt="image" />
                            </Stack>
                            <Stack>

                                <Text variant="h2" fontSize={{ xs: "24px", md: "36px" }} lineHeight="44px" color="#fff" >
                                    14 days trial
                                </Text>
                                <Text variant="overline" fontSize={{ xs: "16px", md: "18px" }} color="rgba(255,255,255,.7)" lineHeight="28px" fontWeight={400} sx={{ textTransform: "none", mt: "8px" }}>
                                    Fit small team of 2 to 3 members who are looking <br /> to optimize planning and executing projects
                                </Text>
                                <Stack width="100%" height="1px" bgcolor="rgba(255,255,255,.2)" my={{ xs: "16px", md: "24px" }} />
                                <Stack
                                    gap="13px" mb="24px">
                                    {["Experience all project management features", "Access to AI agent",].map((e, i) => (
                                        <Stack key={i} flexDirection="row" gap="8px" alignItems="center">
                                            <Image src={ActiveIcon} width={20} height={20} alt="image" />
                                            <Text variant="overline" fontSize={{ xs: "16px", md: "18px" }} fontWeight={400} color="#fff" lineHeight="28px" sx={{ textTransform: "none" }}>
                                                {e}
                                            </Text>
                                        </Stack>
                                    ))}
                                </Stack>
                                <Link href={"/"}>
                                    <Stack
                                        sx={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <Text variant={{ xs: "caption", md: "body1" }} fontWeight={400} sx={textGradientSx}>
                                            Explore now
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
                        </Stack>
                        <Stack sx={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            background: "url(/images/home-page/img-play-video.png)",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Stack gap="8px">
                                <Stack sx={{
                                    transition: ".3s",
                                    width: "72px",
                                    height: "72px",
                                    "&:hover": {
                                        cursor: "pointer",
                                        transition: ".3s",
                                        transform: "scale(1.1)",
                                    }
                                }}
                                    onClick={() => setMediaPreview(true)}

                                >
                                    <Image src={PlayVideoIcon} alt="image" style={{
                                        width: "100%",
                                        height: "100%",
                                    }} />
                                </Stack>

                                <Stack
                                    onClick={() => setMediaPreview(true)}
                                    sx={{
                                        transition: ".3s",
                                        "&:hover": {
                                            cursor: "pointer",
                                            transition: ".3s",
                                            transform: "scale(1.1)",
                                        }
                                    }}
                                >
                                    <Text variant="h5" sx={{
                                        color: "#fff"
                                    }}>
                                        Play video
                                    </Text>
                                </Stack>

                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Preview
                    open={mediaPreview}
                    type={"video_url"}
                    // listAttachmentsDown={listMediaClone}
                    onClose={() =>
                        setMediaPreview(false)
                    }
                    src={"https://www.youtube.com/watch?v=ZHhqwBwmRkI&pp=ygUOdmlkZW8gbG9sIDIwMjQ%3D"}
                />

            </Stack>
        </Stack >
    )
}

export default memo(EmpowerDifferentLayout);
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

const textHeadSx = {
    lineHeight: { xs: "32px", md: "48px" },
    fontSize: { xs: "24px", md: "40px" },
    fontWeight: 500,
    textAlign: { xs: "center", md: "start" },
};


import React, {
  MutableRefObject,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Stack, Box, Container } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import { ListTeamsStar } from "../configs";
import Avatar1 from "public/images/about-us/img-person-1.png";
import GmailIcon from "public/images/about-us/icon-gmail.svg";
import ArrowIconDown from "public/images/about-us/arrow-down.svg";
import ArrowIconUp from "public/images/about-us/arrow-up.svg";
import {
  Swiper,
  SwiperSlide,
  SwiperRef,
} from "swiper/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import "swiper/css";
import { SwiperNavButtons } from "./swipper-navitaion";
type TeamsStarLayoutProps = {};

const TeamsStarLayout = (props: TeamsStarLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();
  const [personActive, setPersonActive] = useState(
    ListTeamsStar[ListTeamsStar.length - 1],
  );
  const [showMoreState, setShowMoreState] = useState(false);
  const matches = useMediaQuery("(max-width:400px)");

  const sliderRef = useRef<SwiperRef | MutableRefObject<null>>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    (sliderRef.current as SwiperRef).swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    (sliderRef.current as SwiperRef).swiper.slideNext();
  }, []);

  const findTextFocus = (text: string) => {
    const result = text.match(/\(([^)]+)\)/);
    if (result) {
      const forcusName = result[1];
      return forcusName;
    } else {
      return "";
    }
  };

  const modifiedTextForcus = (text: string) => {
    const inputString = text;
    const modifiedString = inputString.replace(/\([^)]+\)/, "").trim();
    return modifiedString;
  };

  return (
    <Container>
      <Stack width="100%" sx={{}}>
        <Stack
          sx={[
            sectionContainerSx,
            { p: { xs: "60px 16px", md: "100px 0px " } },
          ]}
        >
          <Stack direction="row" alignItems="center" gap="8px">
            <Text variant="h1" sx={[textHeadSx, {}]}>
              TaskCover&apos;s
            </Text>
            <Text variant="h1" sx={[textHeadSx, textGradientSx]}>
              All-Star Team
            </Text>
          </Stack>
          <Stack
            mt={{ xs: "24px", md: "48px" }}
            width="100%"
            gap={{ xs: "24px", md: "40px" }}
          >
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              display={{ xs: "flex", md: "grid" }}
              gridTemplateColumns="1fr 1fr 1fr"
              sx={{
                borderRadius: "24px",
                boxshadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
              }}
            >
              <Stack gap={{ xs: "16px", md: "32px" }} width="100%">
                <Stack direction="row" alignItems="center" gap="4px">
                  <Text
                    sx={textInfoSx}
                    fontSize={{ xs: "16px", md: "18px" }}
                    fontWeight={400}
                    component="div"
                  >
                    {modifiedTextForcus(personActive.graduatedInfo)}{" "}
                    <Text
                      sx={[textInfoSx, textGradientSx]}
                      fontSize={{ xs: "16px", md: "24px" }}
                      lineHeight={{ xs: "24px", md: "32px" }}
                      fontWeight={700}
                    >
                      {findTextFocus(personActive.graduatedInfo)}
                    </Text>
                  </Text>
                </Stack>

                <Stack direction="row" alignItems="center" gap="4px">
                  <Text
                    sx={textInfoSx}
                    fontSize={{ xs: "16px", md: "18px" }}
                    fontWeight={400}
                    component="div"
                  >
                    <Text
                      sx={[textInfoSx, textGradientSx]}
                      fontSize={{ xs: "16px", md: "24px" }}
                      lineHeight={{ xs: "24px", md: "32px" }}
                      fontWeight={700}
                    >
                      {findTextFocus(personActive.experienceInfo)}
                    </Text>{" "}
                    {modifiedTextForcus(personActive.experienceInfo)}
                  </Text>
                </Stack>

                <Stack direction="row" alignItems="center" gap="4px">
                  <Text sx={textInfoSx} fontWeight={400} component="div">
                    <Text
                      sx={[textInfoSx, textGradientSx]}
                      fontSize={{ xs: "16px", md: "24px" }}
                      lineHeight={{ xs: "24px", md: "32px" }}
                      fontWeight={700}
                      component="div"
                    >
                      {findTextFocus(personActive.rankedInfo)}
                    </Text>{" "}
                    {modifiedTextForcus(personActive.rankedInfo)}
                  </Text>
                </Stack>
              </Stack>

              {isMdSmaller ? (
                <Stack display="grid" position="relative">
                  <Box
                    ref={sliderRef}
                    component={Swiper}
                    className="mySwiper"
                    spaceBetween={10}
                    pagination={{
                      el: ".swiper-pagination",
                      clickable: true,
                    }}
                    slidesPerView={1}
                    loop={false}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    sx={{
                      display: "inline-block",
                      mt: 3,
                      position: "relative",
                      ".swiper-wrapper": {
                        maxHeight: matches ? 370 : "100%",
                      },
                    }}
                  >
                    {ListTeamsStar.map((item, index) => (
                      <SwiperSlide key={index} className="swiper-slide-wrapper">
                        <Image
                          src={item.avatarImage}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                          alt="image"
                        />
                      </SwiperSlide>
                    ))}
                  </Box>
                  <SwiperNavButtons
                    handlerNext={handleNext}
                    handlerPrevious={handlePrev}
                  />
                </Stack>
              ) : (
                <Stack alignItems="center" my={{ xs: "24px", md: "0" }}>
                  <Image
                    src={personActive.avatarImage}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    alt="image"
                  />
                </Stack>
              )}
              <Stack gap={{ xs: "24px", md: "40px" }} alignItems="center">
                <Stack alignItems="center" gap="4px">
                  <Text variant="h3" fontSize={{ xs: "24px", md: "36px" }}>
                    {personActive.name}
                  </Text>
                  <Text
                    variant="overline"
                    fontSize={{ xs: "16px", md: "18px" }}
                    lineHeight="20px"
                  >
                    {personActive.career}
                  </Text>
                </Stack>
                <Image
                  src={GmailIcon}
                  width={0}
                  height={0}
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                  alt="image"
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              display={isMdSmaller ? "none" : "grid"}
              gridTemplateColumns={{
                lg: "1fr 1fr 1fr 1fr",
                md: "1fr 1fr 1fr",
                xs: "1fr 1fr",
              }}
              gap="24px"
            >
              {(showMoreState ? ListTeamsStar : ListTeamsStar.slice(0, 4)).map(
                (item, index) => (
                  <Stack
                    key={index}
                    gap="16px"
                    alignItems="center"
                    onClick={() => setPersonActive(item)}
                    sx={{
                      transition: ".3s",
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(1.1)",
                        transition: ".3s",
                      },
                    }}
                  >
                    <Image
                      src={item.avatarImage}
                      width={0}
                      height={0}
                      style={{
                        width: "282px",
                        height: "282px",
                        borderRadius: "32px",
                      }}
                      alt="image"
                    />
                    <Stack alignItems="center">
                      <Text variant="h3" fontSize="20px">
                        {item.name}
                      </Text>
                      <Text variant="h5">{item.career}</Text>
                    </Stack>
                    <Image
                      src={GmailIcon}
                      width={0}
                      height={0}
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                      alt="image"
                    />
                  </Stack>
                ),
              )}
            </Stack>
            <Stack
              display={isMdSmaller ? "none" : "flex"}
              width="100%"
              gap="8px"
              mt="40px"
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => setShowMoreState(!showMoreState)}
            >
              <Text
                variant="h4"
                fontSize="20px"
                sx={{
                  ...textGradientSx,
                  background:
                    "linear-gradient(90deg, #0575E6 5.8%, #38E27B 92.38%)",
                  fontWeight: 700,
                }}
              >
                {showMoreState ? "Show less" : "Show more"}
              </Text>
              <Image
                src={showMoreState ? ArrowIconUp : ArrowIconDown}
                width={24}
                height={24}
                alt="image"
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default memo(TeamsStarLayout);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
};

const textHeadSx = {
  lineHeight: { xs: "32px", md: "48px" },
  fontSize: { xs: "24px", md: "40px" },
  fontWeight: 700,
  textAlign: "center",
};

const textGradientSx = {
  background: "linear-gradient(90deg, #0575E6 -93.2%, #38E27B 106.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const textInfoSx = {
  color: "#000",
  lineHeight: "28px",
};

const swipperWrapperSx = {
  ".swiper": {
    width: "100%",
    marginRight: "0",
    marginLeft: "0",
  },
};

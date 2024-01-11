import React, { memo, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import { ListTeamsStar } from "../configs";
import Avatar1 from "public/images/about-us/img-person-1.png";
import GmailIcon from "public/images/about-us/icon-gmail.svg";
import ArrowIconDown from "public/images/about-us/arrow-down.svg";
import ArrowIconUp from "public/images/about-us/arrow-up.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
type TeamsStarLayoutProps = {};

const TeamsStarLayout = (props: TeamsStarLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();
  const [personActive, setPersonActive] = useState(
    ListTeamsStar[ListTeamsStar.length - 1],
  );
  const [showMoreState, setShowMoreState] = useState(false);

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

  const handleSlideChange = (e) => {};
  return (
    <Stack width="100%" sx={{}}>
      <Stack
        sx={[sectionContainerSx, { p: { xs: "60px 16px", md: "100px 0px " } }]}
      >
        <Stack direction="row" alignItems="center" gap="8px">
          <Text variant="h1" sx={[textHeadSx, {}]}>
            TaskCover's
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
                <Text sx={textInfoSx} fontWeight={400}>
                  <Text
                    sx={[textInfoSx, textGradientSx]}
                    fontSize={{ xs: "16px", md: "24px" }}
                    lineHeight={{ xs: "24px", md: "32px" }}
                    fontWeight={700}
                  >
                    {findTextFocus(personActive.rankedInfo)}
                  </Text>{" "}
                  {modifiedTextForcus(personActive.rankedInfo)}
                </Text>
              </Stack>
            </Stack>
            {false ? (
              <Stack className="swiper-swapper">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  spaceBetween={500}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSlideChange={handleSlideChange}
                  style={{}}
                >
                  {ListTeamsStar.map((item, index) => (
                    <SwiperSlide style={{}} className="swiper-slide-wrapper">
                      <Image
                        src={item.avatarImage}
                        width={0}
                        height={0}
                        style={{
                          width: "322px",
                          height: "393px",
                        }}
                        alt="image"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Stack>
            ) : (
              <Stack alignItems="center" my={{ xs: "24px", md: "0" }}>
                <Image
                  src={personActive.avatarImage}
                  width={0}
                  height={0}
                  style={{
                    width: "322px",
                    height: "393px",
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
            gridTemplateColumns="1fr 1fr 1fr 1fr"
            gap="24px"
          >
            {(showMoreState ? ListTeamsStar : ListTeamsStar.slice(0, 4)).map(
              (item, index) => (
                <Stack
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
            <Text variant="h4" fontSize="20px" sx={textGradientSx}>
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
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
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

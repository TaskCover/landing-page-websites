import { Stack, Box } from "@mui/material";
import { TextGradient, Text, ButtonCustom } from "components/shared";
import Image from "next/image";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";
import useBreakpoint from "hooks/useBreakpoint";
import { MutableRefObject, useCallback, useRef } from "react";
import { SwiperNavButtons } from "components/sn-about-us/components/swipper-navitaion";

export const ResourceUseCase = () => {
  const { isMdSmaller } = useBreakpoint();

  const sliderRef = useRef<SwiperRef | MutableRefObject<null>>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    (sliderRef.current as SwiperRef).swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    (sliderRef.current as SwiperRef).swiper.slideNext();
  }, []);
  return (
    <Stack mt={12}>
      <TextGradient
        textAlign={{md: "center", xs: "left"}}
        fontWeight={700}
        fontSize={{ md: 20, xs: 16 }}
        mb={{ md: 3, xs: 1 }}
        percentBlueColor={isMdSmaller ? 4.8 : 48.8}
        percentGreenColor={isMdSmaller ? 23.8 : 51.38}
      >
        Resources
      </TextGradient>
      <Text
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={700}
        mb={5}
        textAlign={{md: "center", xs: "left"}}
      >
        Resources & tips for marketing agency
      </Text>
      {isMdSmaller ? (
        <Stack display="block" position="relative">
          <Box
            ref={sliderRef}
            component={Swiper}
            spaceBetween={0}
            className="mySwiper"
            slidesPerView={1}
            loop
            centeredSlides
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            sx={{
              display: "inline-flex",
            }}
          >
            {DATA.map((data, index) => (
              <SwiperSlide key={index}>
                <Stack
                  sx={{
                    borderRadius: 6,
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    py: 3,
                    px: 3,
                  }}
                >
                  <Image
                    src={data.imageUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                      marginBottom: "40px",
                    }}
                    alt="resource-use-case"
                  />

                  <Text fontSize={{ md: 20, xs: 16 }} fontWeight={500} mb={5}>
                    {data.title}
                  </Text>
                  <ButtonCustom
                    className="MuiButton-primary"
                    sx={{ "MuiButton-root": { fontWeight: "400!important" } }}
                  >
                    Read This
                  </ButtonCustom>
                </Stack>
              </SwiperSlide>
            ))}
          </Box>
          <SwiperNavButtons
            handlerNext={handleNext}
            handlerPrevious={handlePrev}
          />
        </Stack>
      ) : (
        <Stack direction="row" spacing={5}>
          {DATA.map((data, index) => (
            <Stack
              key={index}
              sx={{
                borderRadius: 4,
                boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
                backgroundColor: "#fff",
                py: 3,
                px: 3,
              }}
            >
              <Stack height={{ lg: 260, md: 240, sm: 235 }}>
                <Image
                  src={data.imageUrl}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "40px",
                  }}
                  alt="resource-use-case"
                />
              </Stack>

              <Text fontSize={{ md: 20, xs: 16 }} fontWeight={500} mb={5}>
                {data.title}
              </Text>
              <ButtonCustom className="MuiButton-primary">
                Read This
              </ButtonCustom>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

const DATA = [
  {
    imageUrl: "/images/resource-use-case-1.png",
    title: "TaskCover Resources for Makerting Teams",
  },
  {
    imageUrl: "/images/resource-use-case-2.png",
    title: "ClipUp Resources for Makerting Teams",
  },
  {
    imageUrl: "/images/resource-use-case-3.png",
    title: "ClipUp Resources for Makerting Teams",
  },
];

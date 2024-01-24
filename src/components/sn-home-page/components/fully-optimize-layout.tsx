import React, { memo } from "react";
import { Container, Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import FullOptimizeImg from "public/images/home-page/img-fully-optimize.svg";
import ImgLinePage from "public/images/home-page/img-line-page.svg";
import ArrowRightIcon from "public/images/home-page/arrow-right.svg";
import ArrowRightLineIc from "public/images/home-page/arrow-right-line.svg";
import Link from "components/Link";
import { FullOptimizeItems } from "../configs";

type FullyObtimizeLayoutProps = {};

const FullyObtimizeLayout = (props: FullyObtimizeLayoutProps) => {
  return (
    <Stack
      width="100%"
      sx={{
        background:
          "linear-gradient(180deg, rgba(87, 161, 202, 0.23) 0%, rgba(255, 255, 255, 0.00) 100%)",
      }}
    >
      <Container>
        <Stack sx={sectionContainerSx}>
          <Stack flexDirection={{ xs: "column", md: "row" }} gap="8px">
            <Text
              variant={{ xs: "h3", md: "h1" }}
              sx={[
                textHeadSx,
                {
                  background:
                    "linear-gradient(90deg, #0575E6 37.8%, #38E27B 206.38%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                },
              ]}
            >
              Fully optimize
            </Text>
            <Text
              variant={{ xs: "h3", md: "h1" }}
              sx={[
                textHeadSx,
                {
                  textAlign: "center",
                },
              ]}
            >
              your financial process
            </Text>
          </Stack>
          <Text
            variant={{ xs: "h5", md: "h4" }}
            fontWeight={400}
            color="#374151"
            mt={{ xs: "8px", md: "16px" }}
            sx={{ textAlign: "center" }}
          >
            Drive your agency growth by simplifying all sales, budget and
            billing tasks
          </Text>
          <Stack
            mt={{ xs: "16px", md: "24px" }}
            mb={{ xs: "24px", md: "40px" }}
          >
            <Image src={ImgLinePage} width={178} height={4} alt="image line" />
          </Stack>
          <Button
            className="MuiButton-primary"
            sx={{ flexDirection: "row", gap: "8px" }}
          >
            Free 14-day trial
            <Image src={ArrowRightIcon} width={20} height={20} alt="image" />
          </Button>
          <Stack
            flexDirection={{ xs: "column", md: "row" }}
            gap={{ xs: "16px", md: "24px" }}
            display={{ xs: "flex", md: "grid" }}
            mt={{ xs: "24px", md: "60px" }}
            gridTemplateColumns={"3fr 2fr"}
          >
            <Image
              src={FullOptimizeImg}
              alt="image line"
              style={{ width: "100%", height: "auto" }}
            />
            <Stack gap="16px">
              {FullOptimizeItems.map((item, index) => (
                <Stack
                  key={index}
                  p="20px"
                  gap="12px"
                  borderRadius="24px"
                  border="1px solid primary.contrastText"
                  boxShadow="0px 4px 40px 0px rgba(43, 89, 255, 0.08)"
                  bgcolor="rgba(255, 255, 255, 0.70)"
                >
                  <Stack flexDirection="row">
                    <Image src={item.icon} width={32} height={32} alt="image" />
                    <Text
                      variant="subtitle1"
                      fontWeight={700}
                      color={item.labelColor}
                    >
                      {item.label}
                    </Text>
                  </Stack>
                  <Text variant="body1" fontWeight={400} color="#4B5563">
                    {item.desc}
                  </Text>
                  <Link href={item.linkUrl}>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Text variant="body1" fontWeight={400} color="#5C98F6">
                        Learn more
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
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default memo(FullyObtimizeLayout);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "40px 16px 6px", md: "60px 0px 120px" },
  zIndex: 10,
};

const textHeadSx = {
  lineHeight: { xs: "32px", md: "48px" },
  fontSize: { xs: "24px", md: "40px" },
  fontWeight: 500,
};

const btnGetStartedSx = {
  width: "163px",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  borderRadius: "40px",
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
};

const btnWatchVideoSx = {
  width: "163px",
  flexDirection: "row",
  gap: "8px",
  px: "6px",
  py: "8px",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
  borderRadius: "40px",
  border: "1px solid #5C98F6",
  color: "#5C98F6",
};

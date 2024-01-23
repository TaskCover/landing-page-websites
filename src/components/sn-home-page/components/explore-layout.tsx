import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import ArrowRightIcon from "public/images/home-page/arrow-right.svg";
import ExploreImg from "public/images/home-page/img-explore.png";
import ImgLinePage from "public/images/home-page/img-line-page.svg";
import { memo, useState } from "react";
import { ExploreLayoutTab } from "../configs";

type ExploreLayoutProps = {};

const ExploreLayout = (props: ExploreLayoutProps) => {
  const [activeTab, setActiveTab] = useState(ExploreLayoutTab[0]);

  return (
    <Stack
      width="100%"
      sx={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(87, 161, 202, 0.23) 100%)",
      }}
    >
      <Stack sx={sectionContainerSx}>
        <Stack flexDirection={{ xs: "column", md: "row" }} gap="8px">
          <Text
            variant={{ xs: "h3", md: "h1" }}
            fontWeight={500}
            sx={[textHeadSx, {
              textAlign: "center",
            }]}
          >
            Explore how we
          </Text>
          <Text
            variant={{ xs: "h3", md: "h1" }}
            fontWeight={500}
            sx={[textHeadSx, {
              background:
                "linear-gradient(90deg, #0575E6 -66.2%, #38E27B 64.38%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }]}
          >
            Cover your Tasks
          </Text>
        </Stack>
        <Stack mt={{ xs: "16px", md: "24px" }} mb={{ xs: "40px", md: "80px" }}>
          <Image src={ImgLinePage} width={178} height={4} alt="image line" />
        </Stack>
        <Stack width="100%" gap={{ xs: "16px", md: "24px" }}>
          <Stack
            flexDirection="row"
            gap="16px"
            p="8px"
            borderRadius="40px"
            justifyContent="space-between"
            width="100%"
            sx={{
              border: "1px solid #fff",
              background:
                "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
              overflowX: "auto",
            }}
          >
            {ExploreLayoutTab.map((item, index) => (
              <Stack
                key={index}
                p={{ xs: "8px 12px", md: "12px 16px" }}
                borderRadius="30px"
                justifyContent="center"
                alignItems="center"
                sx={[
                  activeTab.id == index + 1 ? activeTabExploreSx : {},
                  {
                    transition: ".5s",
                    "&:hover": {
                      cursor: "pointer",
                      transform: "scale(1.05)",
                      transition: ".5s",
                    },
                  },
                ]}
                onClick={() => setActiveTab(ExploreLayoutTab[index])}
                width="100%"
              >
                <Text
                  variant="h6"
                  fontSize={{ xs: "12px", md: "14px" }}
                  fontWeight={500}
                  sx={[
                    activeTab.id == index + 1
                      ? { color: "#5C98F6" }
                      : { color: "#fff" },
                    { textAlign: "center" },
                  ]}
                >
                  {item.label}
                </Text>
              </Stack>
            ))}
          </Stack>
          <Stack
            display={{ xs: "flex", md: "grid" }}
            flexDirection={{ xs: "column", md: "row" }}
            gridTemplateColumns="2fr 3fr"
            justifyContent="center"
            sx={{
              p: { xs: "24px", md: "50px 45px" },
              border: "2px solid #FFF",
              backgroundColor: "#EFF5FE",
              borderRadius: "40px",
              boxShadow: "0px 0px 6.93px 0px rgba(170, 198, 245, 0.82)",
              gap: { xs: "24px", md: "60px" },
            }}
          >
            <Stack
              gap={{ xs: "16px", md: "24px" }}
              justifyContent="start"
              alignItems="start"
              mt="16px"
            >
              <Stack
                gap={{ xs: "6px", md: "8px" }}

              >
                <Text
                  variant={{ xs: "caption", md: "body2" }}
                  fontWeight={400}
                  sx={{
                    background:
                      "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {activeTab.label}
                </Text>
                <Text variant={{ xs: "h3", md: "h2" }}
                  fontSize={{ xs: "24px", md: "32px" }}
                  lineHeight={{ xs: "32px", md: "40px" }}
                  fontWeight={700}>
                  {activeTab.title}
                </Text>
              </Stack>
              <Stack gap="8px">
                {activeTab.desc.map((e, index) => (
                  <Text
                  key={index}
                    variant={{ xs: "caption", md: "body2" }}
                    fontWeight={400}
                    lineHeight="22px"
                    color="#4B5563"
                  >
                    {e}
                  </Text>
                ))}
              </Stack>

              <Button
                className="MuiButton-primary"
                sx={{ flexDirection: "row", gap: "8px", width: "120px", p: "12px 24px" }}
              >
                Explore more
                <Image
                  src={ArrowRightIcon}
                  width={20}
                  height={20}
                  alt="image"
                />
              </Button>
            </Stack>
            <Stack>
              <Image
                src={ExploreImg}
                width={0}
                height={0}
                style={{
                  width: "100%",
                  height: "auto",
                }}
                alt="image"
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(ExploreLayout);

const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "40px 16px 60px", md: "60px 0px 120px" },
};

const activeTabExploreSx = {
  background: "#fff",
  boxShadow: "0px 0px 2px 2px rgba(255, 255, 255, 0.60)",
};

const textHeadSx = {
  lineHeight: { xs: "32px", md: "48px" },
  fontSize: { xs: "24px", md: "40px" },
  fontWeight: 500,
};
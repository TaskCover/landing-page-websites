import { Stack, Container } from "@mui/material";
import { Button, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";
import ActiveIcon from "public/images/home-page/icon-active.svg";
import OrIcon from "public/images/home-page/icon-different-tool.svg";
import Logo from "public/images/home-page/logo.png";
import { memo } from "react";
import { PricingToolList, SwapMultiToolItems } from "../configs";
type SwapToolsLayoutProps = {};

const SwapToolsLayout = (props: SwapToolsLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();

  return (
    <Stack
      width="100%"
      sx={{
        background: "url(/images/home-page/bg-swap-tools.png)",
        backgroundColor: "#DBF3FD",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
        <Container>
      <Stack sx={sectionContainerSx}>
        <Stack flexDirection={{ xs: "column", md: "row" }} gap="8px">
          <Text variant={{ xs: "h3", md: "h1" }} sx={textHeadSx}>
            Swap Multiple Tools
          </Text>
          <Text
            variant={{ xs: "h3", md: "h1" }}
            sx={[textGradientSx, textHeadSx]}
          >
            for Taskcover
          </Text>
        </Stack>
        <Text
          variant={{ xs: "h3", md: "h1" }}
          sx={[textGradientSx, textHeadSx]}
        >
          and Save Money
        </Text>
        <Stack
          display={{ xs: "flex", lg: "grid" }}
          flexDirection={{ md: "column", lg: "row" }}
          gridTemplateColumns="1fr 50px 1fr"
          gap={{ xs: "16px", md: "30px" }}
          mt={{ xs: "24px", md: "40px" }}
          position="relative"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack gap={{ xs: "24px", md: "40px" }}>
            {SwapMultiToolItems.map((item, index) => {
              return (
                <Stack key={index} gap="4px">
                  <Text
                    variant={{ xs: "h5", md: "h4" }}
                    fontWeight={700}
                    fontSize={{ xs: "16px", md: "24px" }}
                    lineHeight={{ xs: "24px", md: "32px" }}
                    sx={{
                      color: "#0C4A6E",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    {item.title}
                  </Text>
                  <Stack
                    flexDirection="row"
                    justifyContent={{ xs: "center", md: "none" }}
                    gap="8px"
                  >
                    {item.items.map((i, index) => (
                      <Stack
                        key={index}
                        gap="0px"
                        p="12px"
                        borderRadius="4px"
                        justifyContent="center"
                        alignItems="center"
                        width={
                          i.isBigIcon
                            ? { xs: "120px", md: "200px" }
                            : { xs: "60px", md: "100px" }
                        }
                        sx={{
                          background:
                            "linear-gradient(282deg, rgba(160, 197, 253, 0.10) 0%, rgba(162, 199, 255, 0.20) 100%)",
                        }}
                      >
                        <Image
                          src={i.imgUrl}
                          width={isMdSmaller ? 40 : 56}
                          height={isMdSmaller ? 40 : 56}
                          alt="image"
                        />
                        <Text
                          variant="caption"
                          fontWeight={400}
                          color="#374151"
                          style={{ textAlign: "center" }}
                        >
                          {i.label}
                        </Text>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
          <Stack sx={{}}>
            <Image
              src={OrIcon}
              width={isMdSmaller ? 35 : 50}
              height={isMdSmaller ? 35 : 50}
              alt="image"
            />
          </Stack>
          <Stack
            p={{ xs: "36px", md: "60px" }}
            sx={{
              background: "url(/images/home-page/img-border-swap-tool.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "93%",
            }}
          >
            <Stack
              p={{ xs: "24px", md: "40px" }}
              borderRadius="24px"
              boxShadow="0px 8px 8px 0px rgba(28, 67, 113, 0.12)"
              gap={{ xs: "24px", md: "32px" }}
              sx={{
                background:
                  "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
              }}
            >
              <Stack>
                <Image
                  src={Logo}
                  width={160}
                  alt="image"
                  style={{ marginBottom: "8px" }}
                />
                <Stack flexDirection="row" alignItems="center">
                  <Text
                    variant="h2"
                    fontSize={{ xs: "24px", md: "36px" }}
                    color="#fff"
                  >
                    $
                  </Text>
                  <Text
                    variant={{ xs: "h3", md: "h1" }}
                    fontSize={{ xs: "48px", md: "60px" }}
                    lineHeight="44px"
                    color="#fff"
                  >
                    19.00/
                  </Text>
                  <Text
                    variant={{ xs: "h4", md: "h3" }}
                    fontWeight={700}
                    color="#fff"
                  >
                    Per User
                  </Text>
                </Stack>
                <Stack
                  width="100%"
                  height="1px"
                  bgcolor="rgba(255,255,255,.2)"
                  my={{ xs: "16px", md: "24px" }}
                ></Stack>
                <Stack gap="13px">
                  {PricingToolList.map((e, i) => (
                    <Stack
                      key={i}
                      flexDirection="row"
                      gap="8px"
                      alignItems="center"
                    >
                      <Image
                        src={ActiveIcon}
                        width={20}
                        height={20}
                        alt="image"
                      />
                      <Text
                        variant="overline"
                        fontSize={{ xs: "14px", md: "18px" }}
                        lineHeight={{ xs: "20px", md: "28px" }}
                        fontWeight={400}
                        color="#fff"
                        style={{ textTransform: "none" }}
                      >
                        {e}
                      </Text>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              <Stack
                flexDirection="row"
                gap={{ xs: "12px", md: "16px" }}
                alignItems="center"
              >
                <Button
                  sx={{
                    width: { xs: "120px", md: "180px" },
                    background: "#fff",
                    color: "#000",
                    fontSize: "16px",
                    borderRadius: "24px",
                    p: "6px 12px",
                  }}
                >
                  See pricing
                </Button>
                <Button
                  sx={{
                    width: { xs: "120px", md: "180px" },
                    border: "1px solid #fff",
                    color: "#fff",
                    fontSize: "16px",
                    borderRadius: "24px",
                    p: "6px 12px",
                  }}
                >
                  Explore function
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      </Container>
    </Stack>
  );
};

export default memo(SwapToolsLayout);
const sectionContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  m: "0 auto",
  maxWidth: "1200px",
  p: { xs: "40px 16px 60px", md: "60px 0px 120px" },
  position: "relative",
};

const textGradientSx = {
  fontWeight: 500,
  background: "linear-gradient(90deg, #0575E6 -72.2%, #38E27B 67.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textAlign: "center",
};

const textHeadSx = {
  lineHeight: { xs: "32px", md: "48px" },
  fontSize: { xs: "24px", md: "40px" },
  fontWeight: 500,
  textAlign: "center",
};

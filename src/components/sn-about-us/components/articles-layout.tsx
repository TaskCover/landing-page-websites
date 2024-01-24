import React, { memo } from "react";
import { Stack } from "@mui/material";
import { Button, Text } from "components/shared";
import Image from "next/image";
import useBreakpoint from "hooks/useBreakpoint";
import { ListArticles } from "../configs";

type ArticlesLayoutProps = {};

const ArticlesLayout = (props: ArticlesLayoutProps) => {
  const { isMdSmaller } = useBreakpoint();

  return (
    <Stack width="100%">
      <Stack
        sx={[sectionContainerSx, { p: { xs: "60px 16px", md: "100px 0px " } }]}
      >
        <Stack direction="row" gap="8px" alignItems="center">
          <Text variant="h1" sx={[textHeadSx, textGradientSx]}>
            Most viewed
          </Text>
          <Text variant="h1" sx={[textHeadSx, {}]}>
            articles
          </Text>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          gap={{ xs: "24px", md: "40px" }}
          mt={{ xs: "24px", md: "40px" }}
        >
          {ListArticles.map((data, index) =>
            isMdSmaller ? (
              (index + 3) % 3 === 0 ? (
                <Stack
                  key={index}
                  width="100%"
                  height="55px"
                  alignItems="center"
                >
                  <Stack width="40%" height="100%" sx={itemWrapperSx}>
                    <Image
                      src={data}
                      height={50}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      alt="logo-partner"
                    />
                  </Stack>
                </Stack>
              ) : (
                <Stack key={index} width="40%" height="55px" sx={itemWrapperSx}>
                  <Image
                    src={data}
                    height={50}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    alt="logo-partner"
                  />
                </Stack>
              )
            ) : (
              <Stack key={index} mb={2} width="20%" sx={itemWrapperSx}>
                <Image
                  src={data}
                  width={isMdSmaller ? 62 : 120}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  alt="logo-partner"
                />
              </Stack>
            ),
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(ArticlesLayout);

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
  fontWeight: 500,
  textAlign: "center",
};

const textGradientSx = {
  background: "linear-gradient(90deg, #0575E6 5.8%, #38E27B 96.38%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const itemWrapperSx = {
  borderRadius: { xs: "12px", md: "24px" },
  backgroundColor: "#fff",
  boxShadow: " 0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
  justifyContent: "center",
  alignItems: "center",
  p: { xs: "12px 25px", md: "32px 54px" },
};

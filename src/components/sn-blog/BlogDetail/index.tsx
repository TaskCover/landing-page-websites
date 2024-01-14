import { Container, Input, Stack } from "@mui/material";
import {
  Breadcrumb,
  ButtonCustom,
  Text,
  TextGradient,
} from "components/shared";
import Image from "next/image";
import { memo } from "react";
import Link from "next/link";

const BlogDetail = () => {
  return (
    <Stack sx={{ marginTop: "60px!important" }} position="relative">
      <Stack
        sx={{
          backgroundImage: {
            md: "url(/images/bg-blog-detail.webp)",
            xs: "url(/images/bg-blog-detail-mobile.webp)",
          },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: -60,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      />
      <Stack>
        <Container>
          <Stack alignItems="center" width="100%">
            <Image
              src="/images/blog-detail-1.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="blog-detail-art"
            />
          </Stack>
        </Container>
      </Stack>
      <Container>
        <Stack mt={2}>
          <Breadcrumb breadcrumbsList={breadcrumbs} />
        </Stack>
        <Stack
          direction={{ md: "row", xs: "column" }}
          spacing={{ md: 5, xs: 0 }}
          mt={3}
        >
          <Stack sx={sxConfig.content} flex={0.7}>
            <Stack className="content-blog">
              <Image
                src="/images/content-detail-blog.png"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                alt="next-blog"
              />
            </Stack>
            <Stack
              direction="row"
              spacing={{ md: 5, xs: 0.652 }}
              mt={5}
              alignItems="center"
              sx={{ background: {md: "#fff", xs: "transparent"}, borderRadius: 6 }}
            >
              <Stack width="100%">
                <Image
                  src="/images/next-blog.png"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  alt="next-blog"
                />
              </Stack>
              <Stack
                justifyContent="space-between"
              >
                <Text fontSize={{ md: 16, xs: 14 }}>
                  Operations Dashboard 101: Keep a Watchful Eye on Your
                  Processes
                </Text>
                <Stack
                  direction="row"
                  alignItems="center"
                  mt={{ md: 2, xs: 0.652 }}
                >
                  <TextGradient
                    fontWeight={700}
                    textTransform="uppercase"
                    fontSize={{ md: 16, xs: 12 }}
                  >
                    Read more
                  </TextGradient>
                  <Image
                    src="/images/arrow-right-gradient.png"
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack flex={0.3}>
            <Stack
              sx={{
                background: {md: "#fff", xs: "transparent"},
                borderRadius: 6,
                py: 3,
                px: { md: 2, xs: 2 },
              }}
              mb={3}
              mt={{ md: 0, xs: 3 }}
            >
              <Text
                textTransform="uppercase"
                fontSize={16}
                fontWeight={600}
                mb={3}
              >
                LATEST POSTS
              </Text>
              <Stack>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                  <Stack>
                    <Image
                      src="/images/last-post-1.png"
                      alt="last-post"
                      width={68}
                      height={68}
                    />
                  </Stack>
                  <Stack>
                    <Text
                      fontWeight={600}
                      fontSize={14}
                      textTransform="uppercase"
                    >
                      PG SOFT™ LAUNCHES A NEW PROMOTIONAL FEATURE - MONEY RAIN!
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              sx={{
                background: {md: "#fff", xs: "rgba(255, 255, 255, 0.60)"},
                borderRadius: 6,
                py: 3,
                px: { md: 2, xs: 3 },
              }}
              mb={3}
            >
              <Text
                textTransform="uppercase"
                fontSize={16}
                fontWeight={600}
                mb={1}
              >
                CATEGORIES
              </Text>
              <Stack py={2} borderBottom="1px solid #DEDEDE">
                <Text fontSize={14} textTransform="uppercase" color="#212121">
                  Project Management (10)
                </Text>
              </Stack>
              <Stack py={2} borderBottom="1px solid #DEDEDE">
                <Text fontSize={14} textTransform="uppercase" color="#212121">
                  Project Management (10)
                </Text>
              </Stack>
              <Stack py={2} borderBottom="1px solid #DEDEDE">
                <Text fontSize={14} textTransform="uppercase" color="#212121">
                  Project Management (10)
                </Text>
              </Stack>
            </Stack>

            <Stack
              sx={{
                background: {md: "#fff", xs: "rgba(255, 255, 255, 0.60)"},
                borderRadius: 6,
                py: 3,
                px: { md: 2, xs: 3 },
              }}
              mb={3}
            >
              <Text
                textTransform="uppercase"
                fontSize={16}
                fontWeight={600}
                mb={3}
              >
                NEWSLETTER
              </Text>
              <Input
                disableUnderline
                placeholder="Your email address"
                sx={{
                  fontSize: 14,
                  color: "#6B7280",
                  px: 2,
                  py: 1,
                  borderRadius: 6,
                  fontWeight: 400,
                  border: "1px solid #6B7280",
                  mb: 3,
                }}
              />
              <ButtonCustom className="MuiButton-primary">
                Free 14-day trial
              </ButtonCustom>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default memo(BlogDetail);

const breadcrumbs = [
  <Link key="1" href="/" color="inherit">
    Home
  </Link>,
  <Link key="2" color="inherit" href="/blog">
    Blog
  </Link>,
  <Text key="3">
    How to Create an Executive Dashboard: A Step- by-Step Guide
  </Text>,
];

const sxConfig = {
  content: {
    background: { md: "#fff", xs: "transparent" },
    p: { md: 5, xs: 0 },
    borderRadius: 6,
  },
};

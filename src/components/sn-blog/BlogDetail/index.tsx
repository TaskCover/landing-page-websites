import { Container, Input, Stack } from "@mui/material";
import {
  Breadcrumb,
  ButtonCustom,
  Text,
  TextGradient,
} from "components/shared";
import Image from "next/image";
import { memo, useEffect } from "react";
import Link from "next/link";
import useBreakpoint from "hooks/useBreakpoint";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useCategoryBlog } from "store/blog-category/selectors";
import { DataStatus } from "constant/enums";
import AppLoading from "components/AppLoading";
import { useParams } from "next/navigation";
import { useBlogs } from "store/blog/selectors";
import NoData from "components/NoData";
import Error from "next/error";

const BlogDetail = () => {
  const { categories, categoryStatus } = useAppSelector(
    (state) => state.categoryBlogs,
  );
  const { onGetCategoryBlogs } = useCategoryBlog();
  const { onGetBlogBySlug, item, onGetRelatedBlogs, relatedBlogs } = useBlogs();
  const { slug } = useParams();

  useEffect(() => {
    onGetCategoryBlogs();
  }, [onGetCategoryBlogs]);

  useEffect(() => {
    onGetBlogBySlug(slug as string);
    onGetRelatedBlogs(slug as string);
  }, [onGetBlogBySlug, onGetRelatedBlogs, slug]);

  const breadcrumbs = [
    <Link key="1" href="/" color="inherit">
      Home
    </Link>,
    <Link key="2" color="inherit" href="/blog">
      Blog
    </Link>,
    <Text key="3">{item?.title}</Text>,
  ];

  if(!slug || !item) return <Error statusCode={404} />

  if (categoryStatus === DataStatus.LOADING) return <AppLoading />;
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
              src={item?.background_down?.link ?? ""}
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
            <Stack
              className="content-blog"
              dangerouslySetInnerHTML={{ __html: item?.content ?? "" }}
              sx={{ img: { width: "100%" } }}
            />
            {(relatedBlogs && relatedBlogs.length) > 0 && (
              <Link href={`/blog/${relatedBlogs[0]?.slug}`}>
              <Stack
                direction="row"
                spacing={{ md: 3, xs: 0.652 }}
                mt={5}
                alignItems="center"
                sx={{
                  background: { md: "#fff", xs: "transparent" },
                  borderRadius: 6,
                }}
              >
                <Stack width="100%" flex={0.2}>
                  <Image
                    src={relatedBlogs[0]?.background_down?.link ?? ""}
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
                <Stack justifyContent="space-between" flex={0.8}>
                  <Text fontSize={{ md: 16, xs: 14 }}>
                    {relatedBlogs[0]?.title}
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
              </Link>
            )}
          </Stack>
          <Stack flex={0.3}>
            <Stack
              sx={{
                background: { md: "#fff", xs: "transparent" },
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
                {relatedBlogs &&
                  relatedBlogs.map((data) => (
                    <Link key={data.id} href={`/blog/${data.slug}`}>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        mb={2}
                      >
                        <Stack>
                          <Image
                            src={data.background_down?.link ?? ""}
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
                            {data.title}
                          </Text>
                        </Stack>
                      </Stack>
                    </Link>
                  ))}
              </Stack>
            </Stack>

            <Stack
              sx={{
                background: { md: "#fff", xs: "rgba(255, 255, 255, 0.60)" },
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
              {categories.map((category) => (
                <Stack
                  py={2}
                  borderBottom="1px solid #DEDEDE"
                  key={category.id}
                >
                  <Text fontSize={14} textTransform="uppercase" color="#212121">
                    {category.name} (10)
                  </Text>
                </Stack>
              ))}
            </Stack>

            <Stack
              sx={{
                background: { md: "#fff", xs: "rgba(255, 255, 255, 0.60)" },
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

const sxConfig = {
  content: {
    background: { md: "#fff", xs: "transparent" },
    p: { md: 5, xs: 0 },
    borderRadius: 6,
  },
};

import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  styled,
  Switch,
} from "@mui/material";
import { ButtonCustom, Text } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";
import Link from "next/link";
import { BlogData } from "store/blog/actions";

type CardMobileProps = {
  imageUrl: string;
  title: string;
  shortDescription: string;
  slug: string;
};

type BlogArticleProps = {
  data: BlogData[];
};

const CardMobile = (props: CardMobileProps) => {
  const { imageUrl, title, shortDescription, slug } = props;
  return (
    <Link href={slug}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ md: 3, xs: 1 }}
        sx={{
          background: "#fff",
          py: { md: 3, xs: 1 },
          px: { md: 3, xs: 1 },
          borderRadius: 4,
          boxShadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
        }}
      >
        <Stack flex={{lg: 0.5, xs: 0.2}}>
          <Image
            src={imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 87,
              objectFit: "cover",
            }}
            alt="blog-new"
          />
        </Stack>
        <Stack flex={0.7}>
          <Text
            color="#EB3DAE"
            fontWeight={700}
            fontSize={12}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              height: 20,
              overflow: "hidden",
            }}
            title={title}
          >
            {title}
          </Text>
          <Text
            fontSize={14}
            mb={2}
            fontWeight={700}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: { md: 4, xs: 3 },
              WebkitBoxOrient: "vertical",
              height: {lg: 62, xs: 39},
              overflow: "hidden",
            }}
            title={shortDescription}
          >
            {shortDescription}
          </Text>
        </Stack>
      </Stack>
    </Link>
  );
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translate(8px, 8px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translate(36px, 8px)",

      "& + .MuiSwitch-track": {
        opacity: 1,
        background: "linear-gradient(90deg, #0575E6, #38E27B)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#fff",
    width: 16,
    height: 16,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    background: "linear-gradient(90deg, #0575E6, #38E27B)",
    borderRadius: 20 / 2,
  },
}));

export const BlogArticle = (props: BlogArticleProps) => {
  const { data: dataBlogs } = props;
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack mb={{ md: 8, xs: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Text
          fontSize={{ md: 36, xs: 24 }}
          my={{ md: 8, xs: 4 }}
          fontWeight={700}
        >
          Articles
        </Text>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Text fontSize={{ md: 16, xs: 12 }} fontWeight={500}>
            Recent
          </Text>
          <MaterialUISwitch />
          <Text fontSize={{ md: 16, xs: 12 }} fontWeight={500}>
            Popular
          </Text>
        </Stack>
      </Stack>
      <Grid container spacing={{ md: 4, xs: 1 }}>
        {dataBlogs.map((data, index) => (
          <Grid item md={4} xs={12} key={index}>
            {isMdSmaller ? (
              <CardMobile
                imageUrl={data?.background_down?.link ?? ""}
                title={data.title ?? ""}
                shortDescription={data?.title ?? ""}
                slug={`/blog/${data.slug}`}
              />
            ) : (
              <Card
                sx={{
                  maxWidth: "100%",
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: { md: "column", xs: "row" },
                }}
              >
                <CardMedia
                  sx={{ height: 235, width: "100%" }}
                  image={data?.background_down?.link ?? ""}
                  title="blog-article"
                />
                <CardContent>
                  <Link href={`/blog/${data.slug}`}>
                    <Text
                      color="#5C98F6"
                      fontWeight={700}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        height: { md: "50px", xs: "auto" },
                        overflow: "hidden",
                      }}
                      title={data.title}
                    >
                      {data.title}
                    </Text>
                    <Stack
                      className="short-description"
                      dangerouslySetInnerHTML={{
                        __html: data?.short_description ?? "",
                      }}
                      sx={{
                        fontSize: { md: 20, xs: 14 },
                        fontWeight: { md: 700, xs: 600 },
                        my: 2,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        height: { md: "88px", xs: "auto" },
                        img: {
                          width: "100%",
                        },
                      }}
                      title={data?.short_description ?? ""}
                      color="#000"
                    />
                    {/* <Text fontSize={20} mb={2} fontWeight={700} height={100}>
                      {data.short_description}
                    </Text> */}
                  </Link>
                </CardContent>
                <CardActions sx={{ display: { md: "block", xs: "none" } }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Image
                      src={
                        data?.created_by?.avatar?.link ??
                        "/images/default-avatar.png"
                      }
                      width={36}
                      height={36}
                      alt="blog-author"
                    />
                    <Text>
                      By <strong>{data.created_by?.fullname}</strong>
                    </Text>
                  </Stack>
                </CardActions>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>

      <ButtonCustom
        className="MuiButton-primary"
        sx={{
          width: "fit-content",
          mx: "auto",
          mt: { md: 6, xs: 4 },
        }}
      >
        Load More
      </ButtonCustom>
    </Stack>
  );
};

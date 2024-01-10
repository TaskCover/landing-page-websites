import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { ButtonCustom, Text } from "components/shared";
import Image from "next/image";

export const BlogArticle = () => {
  return (
    <Stack mb={8}>
      <Text fontSize={{ md: 36, xs: 24 }} my={8} fontWeight={700}>
        Articles
      </Text>
      <Grid container spacing={4}>
        {DATA.map((data, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ maxWidth: "100%", borderRadius: 4 }}>
              <CardMedia
                sx={{ height: 235 }}
                image={data.imageUrl}
                title="blog-article"
              />
              <CardContent>
                <Text color="#5C98F6" fontWeight={700}>
                  {data.title}
                </Text>
                <Text fontSize={20} mb={2} fontWeight={700} height={100}>
                  {data.shortDescription}
                </Text>
              </CardContent>
              <CardActions>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Image
                    src="/images/blog-author-1.png"
                    width={36}
                    height={36}
                    alt="blog-author"
                  />
                  <Text>
                    By <strong>Robert Fox</strong>
                  </Text>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ButtonCustom
        className="MuiButton-primary"
        sx={{
          width: "fit-content",
          mx: "auto",
          mt: 6,
        }}
      >
        Load More
      </ButtonCustom>
    </Stack>
  );
};

const DATA = [
  {
    imageUrl: "/images/blog-article-1.png",
    title: "Project Management",
    shortDescription:
      "How to Create an Executive Dashboard: A Step- by-Step Guide",
  },
  {
    imageUrl: "/images/blog-article-2.png",
    title: "Project Management",
    shortDescription:
      "How to Create an Executive Dashboard: A Step- by-Step Guide",
  },
  {
    imageUrl: "/images/blog-article-3.png",
    title: "Project Management",
    shortDescription:
      "Operations Dashboard 101: Keep a Watchful Eye on Your Processes",
  },
  {
    imageUrl: "/images/blog-article-4.png",
    title: "Project Management",
    shortDescription:
      "The Top CIOs of 2023: Strategic Insights From the Industry’s Best",
  },
  {
    imageUrl: "/images/blog-article-5.png",
    title: "Project Management",
    shortDescription:
      "How to Create an Executive Dashboard: A Step- by-Step Guide",
  },
  {
    imageUrl: "/images/blog-article-6.png",
    title: "Project Management",
    shortDescription:
      "Operations Dashboard 101: Keep a Watchful Eye on Your Processes",
  },
  {
    imageUrl: "/images/blog-article-7.png",
    title: "Project Management",
    shortDescription:
      "Operations Dashboard 101: Keep a Watchful Eye on Your Processes",
  },
  {
    imageUrl: "/images/blog-article-8.png",
    title: "Project Management",
    shortDescription:
      "Operations Dashboard 101: Keep a Watchful Eye on Your Processes",
  },
  {
    imageUrl: "/images/blog-article-9.png",
    title: "Project Management",
    shortDescription:
      "Operations Dashboard 101: Keep a Watchful Eye on Your Processes",
  },
];

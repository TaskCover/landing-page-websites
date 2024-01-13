import { Container, Stack } from "@mui/material";
import { memo } from "react";
import { HeaderBlog } from "./components/Header";
import { BlogNews } from "./components/News";
import { BlogArticle } from "./components/Articles";
import { HelperSendMail } from "components/sn-help-center/components/SendMail";

const BlogPage = () => {
  return (
    <Stack>
      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: {
              md: "url(/images/trust-center-bg.webp)",
              xs: "url(/images/bg-use-case-mobile.png)",
            },
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <Container>
          <HeaderBlog />
          <BlogNews />
        </Container>
      </Stack>

      <Stack position="relative">
        <Stack
          sx={{
            backgroundImage: "url(/images/bg-blog-mobile.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "-200px",
            left: 0,
            right: 0,
            zIndex: -1,
            display: { md: "none", xs: "flex" },
          }}
        />
        <Stack position="relative">
          <Stack
            sx={{
              backgroundImage: "url(/images/bg-blog-1.webp)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "100px",
              left: 0,
              right: 0,
              zIndex: -1,
              display: { md: "flex", xs: "none" },
            }}
          />
          <Container>
            <BlogArticle />
          </Container>
        </Stack>
        <Stack position="relative">
          <Stack
            sx={{
              backgroundImage: "url(/images/bg-blog-2.webp)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: -1,
              display: { md: "flex", xs: "none" },
            }}
          />
          <Container>
            <HelperSendMail />
          </Container>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(BlogPage);

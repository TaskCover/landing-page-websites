import { Container, Stack } from "@mui/material";
import { memo } from "react";
import { HeaderBlog } from "./components/Header";
import { BlogNews } from "./components/News";
import { BlogArticle } from "./components/Articles";
import { HelperSendMail } from "components/sn-help-center/components/SendMail";

const BlogPage = () => {
  return (
    <Stack>
      <Container>
        <Stack position="relative">
          <Stack
            sx={{
              backgroundImage: "url(/images/trust-center-bg.png)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
              aspectRatio: "2210/1503",
              position: "absolute",
              top: 0,
              right: { md: "-50px", xs: 0 },
              zIndex: -1,
            }}
          />
          <HeaderBlog />
          <BlogNews />
          <BlogArticle />
          <HelperSendMail />
        </Stack>
      </Container>
    </Stack>
  );
};

export default memo(BlogPage);

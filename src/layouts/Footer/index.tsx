import React, { memo } from "react";
import { Container, Stack, Grid } from "@mui/material";
import { FooterBody, FooterHeader } from "./components";
import {Text} from "components/shared";

const Footer = () => {
  return (
    <Stack
      sx={{
        backgroundImage: "url(/images/bg-footer.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        aspectRatio: "48/19",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Container>
        <Grid container spacing={2} pt="10%">
          <Grid item xs={4}>
            <FooterHeader />
          </Grid>
          <Grid item xs={8}>
            <FooterBody />
          </Grid>
        </Grid>
        <Text fontWeight={400} align="center" mt={2.625}>© 2023 Task Cover Company, Inc.</Text>
      </Container>
    </Stack>
  );
};

export default memo(Footer);

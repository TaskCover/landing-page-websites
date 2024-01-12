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
        <Grid container spacing={2} pt={{md: "10%", xs: "35%"}}>
          <Grid item md={4} xs={12} mb={{md: 0, xs: 5}}>
            <FooterHeader />
          </Grid>
          <Grid item md={8} xs={12}>
            <FooterBody />
          </Grid>
        </Grid>
        <Text fontWeight={400} align="center" mt={2.625} mb={10}>© 2023 Task Cover Company, Inc.</Text>
      </Container>
    </Stack>
  );
};

export default memo(Footer);

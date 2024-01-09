import { Stack } from "@mui/material";
import { memo } from "react";
import { HeaderProducts } from "./components/Header";
import { ProductInformation } from "./components/Information";
import { ProductFeature } from "./components/ProductFeature";
import { BudgetEvent } from "./components/BudgetEvent";

const Products = () => {
  return (
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
      <HeaderProducts />
      <ProductInformation />
      <ProductFeature />
      <BudgetEvent />
    </Stack>
  );
};

export default memo(Products);

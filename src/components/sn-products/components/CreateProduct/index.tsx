import { Stack } from "@mui/material";
import { Button, Text, TextGradient } from "components/shared";
import Image from "next/image";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";
import useBreakpoint from "hooks/useBreakpoint";
import { ListFeatures, ListFeaturesProps } from "../ListFeature";

type CreateProductProps = {
  data: {
    heading?: string | React.ReactNode;
    dataFeatures: ListFeaturesProps[];
  }[];
};

export const CreateProduct = (props: CreateProductProps) => {
  const { data } = props;
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack mt={{ md: 4, xs: 1 }} mb={3}>
      {data.map((data, index) => (
        <Stack key={index} mt={{md: data.heading ? 13 : 0, xs: 2}}>
          <Stack mb={1} mt={2}>{data.heading}</Stack>
          <Stack my={5} mb={3}>
            {data.dataFeatures.map((listData, index) => {
              const initIndex =
                listData.features.length > 3
                  ? listData.features[2]
                  : listData.features[listData.features.length - 1];
              return (
                <Stack key={index}>
                  <ListFeatures
                    {...listData}
                    initData={initIndex}
                    isReversed={index % 2 !== 0}
                    order={index}
                  />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      ))}

      <Button
        className="MuiButton-primary"
        sx={{ width: "fit-content", mx: "auto", mt: 4, fontWeight: 500, px: 2.5  }}
      >
        SEE PRICING <KeyboardArrowRightIcon />
      </Button>
    </Stack>
  );
};

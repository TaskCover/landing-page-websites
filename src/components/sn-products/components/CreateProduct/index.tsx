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
    <Stack mt={{ md: 13, xs: 7 }} mb={3}>
      {data.map((data, index) => (
        <Stack key={index}>
          {data.heading}
          <Stack my={5} mb={{ md: 15, xs: 3 }}>
            {data.dataFeatures.map((listData, index) => {
              const initIndex =
                listData.features.length > 3
                  ? listData.features[2]
                  : listData.features[listData.features.length - 1];
              return (
                <Stack key={index} mb={{ md: 15, xs: 8 }}>
                  <ListFeatures {...listData} initData={initIndex} isReversed={index % 2 !== 0} />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      ))}

      <Button
        className="MuiButton-primary"
        sx={{ width: "fit-content", mx: "auto", mt: 4 }}
      >
        SEE PRICING <KeyboardArrowRightIcon />
      </Button>
    </Stack>
  );
};

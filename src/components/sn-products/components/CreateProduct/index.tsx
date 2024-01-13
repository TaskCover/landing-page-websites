import { Stack } from "@mui/material";
import { Button, Text, TextGradient } from "components/shared";
import Image from "next/image";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";
import useBreakpoint from "hooks/useBreakpoint";

type CreateProductProps = {
  data: {
    imageUrl: string;
    heading: string | React.ReactNode;
    imageMobile?: string;
  }[];
};

export const CreateProduct = (props: CreateProductProps) => {
  const { data } = props;
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack mt={{ md: 13, xs: 7 }} mb={3}>
      {data.map((data, index) => {
        return (
          <Stack key={index}>
            {data.heading}
            <Stack my={5} key={index} mb={{md: 15, xs: 3}}>
              <Image
                src={
                  data.imageMobile
                    ? isMdSmaller
                      ? data.imageMobile
                      : data.imageUrl
                    : data.imageUrl
                }
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                alt="create-budget"
              />
            </Stack>
          </Stack>
        );
      })}
      <Button
        className="MuiButton-primary"
        sx={{ width: "fit-content", mx: "auto", mt: 4 }}
      >
        SEE PRICING <KeyboardArrowRightIcon />
      </Button>
    </Stack>
  );
};

import { Stack } from "@mui/material";
import { Button, Text, TextGradient } from "components/shared";
import Image from "next/image";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";

type CreateProductProps = {
  data: {
    imageUrl: string;
    heading: string | React.ReactNode;
  }[];
};

export const CreateProduct = (props: CreateProductProps) => {
  const { data } = props;
  return (
    <Stack mt={7} mb={3}>
      {data.map((data, index) => {
        return (
          <Stack key={index}>
            {data.heading}
            <Stack my={5} key={index}>
              <Image
                src={data.imageUrl}
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
        sx={{ width: "fit-content", mx: "auto" }}
      >
        SEE PRICING <KeyboardArrowRightIcon />
      </Button>
    </Stack>
  );
};

import { Stack } from "@mui/material";
import { ButtonCustom, Text, TextGradient } from "components/shared";
import Image from "next/image";
import React from "react";

type AccelerateUseCaseProps = {
  data: {
    title: string;
    imageUrl: string;
    heading: React.ReactNode;
    content: string;
  }[];
};

export const AccelerateUseCase = (props: AccelerateUseCaseProps) => {
  const { data } = props;
  return (
    <Stack mt={15}>
      {data.map((data, index) => (
        <Stack
          direction={{
            md: index % 2 === 0 ? "row" : "row-reverse",
            xs: "column",
          }}
          spacing={6.5}
          key={index}
          mb={20}
        >
          <Stack flex={1}>
            <TextGradient>{data.title}</TextGradient>
            {data.heading && data.heading}
            <Text mb={4}>{data.content}</Text>
            <ButtonCustom
              className="MuiButton-primary"
              sx={{ width: "fit-content" }}
            >
              Learn More 
            </ButtonCustom>
          </Stack>
          <Stack flex={0.8} width="100%">
            <Image
              src={data.imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="use case header"
            />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

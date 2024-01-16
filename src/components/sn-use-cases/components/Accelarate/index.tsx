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
    <Stack mt={7}>
      {data.map((data, index) => (
        <Stack
          direction={{
            md: index % 2 === 0 ? "row" : "row-reverse",
            xs: "column",
          }}
          spacing={{ md: 6.5, xs: 3 }}
          key={index}
          mb={{ md: 20, xs: 10 }}
        >
          <Stack flex={1}>
            <TextGradient fontWeight={600} fontSize={{ md: 20, xs: 16 }} mb={3}>
              {data.title}
            </TextGradient>
            {data.heading && data.heading}
            <Text mb={4}>{data.content}</Text>
            <ButtonCustom
              className="MuiButton-primary"
              sx={{ width: "fit-content" }}
            >
              Learn More
            </ButtonCustom>
          </Stack>
          <Stack flex={0.8} width="100%" position="relative">
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
            <Stack
              sx={{
                position: "absolute",
                top: "29%",
                left: "52%",
                transform: "translate(-52%, -36%)",
                width: 50,
                height: 50,
                borderRadius: "50%",
                transition: "all 0.3s",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  transform: "translate(-52%, -36%) scale(1.2)",
                },
              }}
            >
              <Image
                src="/images/play-circle-blue.svg"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                alt="play-image"
              />
              <Text width={80} color="#fff">
                Play video
              </Text>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

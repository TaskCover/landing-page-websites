import { Stack } from "@mui/material";
import { ButtonCustom, Text, TextGradient } from "components/shared";
import Image from "next/image";
import React, { useRef } from "react";
import { Video } from "../Video";

type AccelerateUseCaseProps = {
  data: {
    title: string;
    imageUrl: string;
    heading: React.ReactNode;
    content: string;
    videoUrl?: string;
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
            <TextGradient
              fontWeight={700}
              fontSize={{ md: 20, xs: 16 }}
              mb={3}
              percentBlueColor={2}
              percentGreenColor={30.38}
            >
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
            {data.videoUrl && (
              <Video src={data.videoUrl} poster={data.imageUrl} />
            )}

            {/* <Image
              src={data.imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="use case header"
            /> */}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

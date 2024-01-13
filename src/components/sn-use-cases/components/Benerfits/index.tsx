import { Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import Image from "next/image";
import React from "react";

type BenefitUseCaseProps = {
    data: {
        icon: string,
        title: React.ReactNode,
        content: string
    }[],
    bannerUrl: string,
    heading: React.ReactNode,
}

export const BenefitUseCase = (props: BenefitUseCaseProps) => {
    const { data, bannerUrl, heading } = props;
  return (
    <Stack mt={{md: 20, xs: 15}} direction={{md: "row", xs: "column"}} spacing={7.5}>
      <Stack flex={1}>
        {heading}
        {data.map((data, index) => (
          <Stack key={index}>
            <Stack direction="row" alignItems="center" spacing={3} mt={5}>
              <Stack flex={0.2}>
                <Image
                  src={data.icon}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  alt="benefit-ic"
                />
              </Stack>
              <Stack flex={1}>
                {data.title}
                <Text>{data.content}</Text>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Stack flex={{md: 0.8, xs: 1}} width="100%">
        <Image
          src={bannerUrl}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="benefit-ic"
        />
      </Stack>
    </Stack>
  );
};



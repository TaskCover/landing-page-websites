import { Stack } from "@mui/material";
import { ButtonCustom, Text, TextGradient } from "components/shared";
import Image from "next/image";
import React from "react";

type HeaderUseCaseProps = {
  title: string,
  headings: React.ReactNode,
  content: string
}

export const HeaderUseCase = (props: HeaderUseCaseProps) => {
  const {title, headings, content} = props;
  return (
    <Stack direction={{md: "row", xs: "column"}} spacing={6.5} pt={{md: 10, xs: 2}}>
      <Stack flex={1}>
        <TextGradient>TaskCover | Marketing Agency</TextGradient>
        {headings}
        <Text mb={4}>
          {content}
        </Text>
        <ButtonCustom className="MuiButton-primary" sx={{width: "fit-content"}}>
          Start free trial
        </ButtonCustom>
      </Stack>
      <Stack flex={0.8} width="100%">
        <Image
          src="/images/usecase-header.png"
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
  );
};

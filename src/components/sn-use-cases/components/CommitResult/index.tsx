import { Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import Image from "next/image";
import React from "react";

type UseCaseCommitResultProps = {
  data: {
    imageUrl: string;
    content: string | React.ReactNode
  }[]
}

export const UseCaseCommitResult = (props: UseCaseCommitResultProps) => {
  const {data} = props;
  const {isMdSmaller} = useBreakpoint();
  return (
    <Stack mt={{ md: 12, xs: 3 }}>
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={500}
        mb={5}
        my={4}
        textAlign="center"
      >
        A commitment about the result{" "}
        <TextGradient
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={500}
          percentBlueColor={28.8}
          percentGreenColor={59.38}
        >
          Taskcover assists you gain the achievements
        </TextGradient>
      </Text>
      <Stack
        direction="row"
        spacing={{md: 5, xs: 0}}
        flexWrap="wrap"
      >
        {data.map((data, index) => (
          <Stack
            flex={{md: 0.6, xs: "unset"}}
            width={{md: "unset", xs: "47%"}}
            key={index}
            sx={{
              borderRadius: 4,
              boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
              backgroundColor: "#fff",
              px: {md: 3, xs: 1},
              py: {md: 3, xs: 1},
              mx: {md: 0, xs: "4px!important"},
              my: {md: 0, xs: "8px!important"},
              alignItems: "center",
            }}
          >
            <Image
              src={data.imageUrl}
              alt="result-commit"
              width={isMdSmaller ? 24 : 40}
              height={isMdSmaller ? 24 : 40}
              style={{
                marginTop: isMdSmaller ? "24px" : 0
              }}
            />
            {data.content}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};


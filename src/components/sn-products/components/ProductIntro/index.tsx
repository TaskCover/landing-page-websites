import { Stack } from "@mui/material";
import Image from "next/image";
import { Text, TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";

type ProductIntroduceProps = {
  data: {
    imageUrl: string;
    title?: string;
    content?: string;
    imageMobile?: string;
  }[];
  isHeading?: boolean;
};

export const ProductIntroduce = (props: ProductIntroduceProps) => {
  const { data, isHeading } = props;
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      spacing={5}
      mt={{ md: 20, xs: 10 }}
    >
      {isHeading && (
        <Stack display={{ md: "none", xs: "flex" }}>
          <Text fontSize={24} component="div" textAlign="center">
            Get a high-level view of your{" "}
            <TextGradient component="span" fontSize={24}>
              FINANCES
            </TextGradient>
          </Text>
          <Text textAlign="center">
            Easily organize and pay bills. Anticipate additional bills and more
          </Text>
        </Stack>
      )}

      {data.map((data, index) => (
        <Stack flex={1} key={index}>
          <Stack height={{ md: 283, xs: "auto" }}>
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
              alt="product-budget"
            />
          </Stack>
          <Text fontSize={20} my={1} fontWeight={700}>
            {data.title}
          </Text>
          <Text>{data.content}</Text>
        </Stack>
      ))}
    </Stack>
  );
};

import { Stack } from "@mui/material";
import Image from "next/image";
import { Text } from "components/shared";

type ProductIntroduceProps = {
    data: {
        imageUrl: string;
        title?: string;
        content?: string;
    }[]
}

export const ProductIntroduce = (props: ProductIntroduceProps) => {
    const {data} = props;
  return (
    <Stack direction={{md: "row", xs: "column"}} spacing={5} mt={{md: 20, xs: 10}}>
      {data.map((data, index) => (
        <Stack flex={1} key={index}>
          <Stack height={{md: 283, xs: "auto"}}>
            <Image
              src={data.imageUrl}
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



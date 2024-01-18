import { Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import Image from "next/image";

export const UseCaseCommitResult = () => {
  return (
    <Stack mt={{ md: 12, xs: 3 }}>
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={600}
        mb={5}
        my={4}
        textAlign="center"
      >
        A commitment about the result{" "}
        <TextGradient
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={600}
          percentBlueColor={28.8}
          percentGreenColor={59.38}
        >
          Taskcover assists you gain the achievements
        </TextGradient>
      </Text>
      <Stack
        direction={{ md: "row", xs: "column" }}
        spacing={5}
        flexWrap="wrap"
      >
        {DATA.map((data, index) => (
          <Stack
            flex={0.6}
            key={index}
            sx={{
              borderRadius: 4,
              boxShadow: "0px 0px 12px 0px rgba(170, 198, 245, 0.40)",
              backgroundColor: "#fff",
              px: 3,
              py: 3,
              alignItems: "center",
            }}
          >
            <Image
              src={data.imageUrl}
              alt="result-commit"
              width={40}
              height={40}
            />
            {data.content}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const DATA = [
  {
    imageUrl: "/images/result-commit-1.png",
    content: (
      <Text
        component="div"
        fontSize={{ md: 16, xs: 14 }}
        fontWeight={600}
        mb={5}
        my={4}
        textAlign="center"
      >
        Arrange the process of{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 16, xs: 14 }}
          fontWeight={600}
        >
          conceptualizing and defining project
        </TextGradient>
      </Text>
    ),
  },
  {
    imageUrl: "/images/result-commit-2.png",
    content: (
      <Text
        component="div"
        fontSize={{ md: 16, xs: 14 }}
        fontWeight={600}
        mb={5}
        my={4}
        textAlign="center"
      >
        <TextGradient
          component="span"
          fontSize={{ md: 16, xs: 14 }}
          fontWeight={600}
        >
          Maintain smoothly{" "}
        </TextGradient>
        the applications and frameworks of all steps
      </Text>
    ),
  },
  {
    imageUrl: "/images/result-commit-3.png",
    content: (
      <Text
        component="div"
        fontSize={{ md: 16, xs: 14 }}
        fontWeight={600}
        mb={5}
        my={4}
        textAlign="center"
      >
        Present the{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 16, xs: 14 }}
          fontWeight={600}
        >
          customized workflow of software development
        </TextGradient>
      </Text>
    ),
  },
  {
    imageUrl: "/images/result-commit-4.png",
    content: (
      <Text
        component="div"
        fontSize={{ md: 16, xs: 14 }}
        fontWeight={600}
        mb={5}
        my={4}
        textAlign="center"
      >
        <TextGradient
          component="span"
          fontSize={{ md: 16, xs: 14 }}
          fontWeight={600}
        >
          Maximizes process efficiency{" "}
        </TextGradient>
        and results in a quality strategies
      </Text>
    ),
  },
];

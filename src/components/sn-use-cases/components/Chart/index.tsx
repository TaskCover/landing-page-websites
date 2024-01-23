import { Stack } from "@mui/material";
import { ButtonCustom, Text, TextGradient } from "components/shared";
import Image from "next/image";

export const ChartUseCase = () => {
  return (
    <Stack direction={{md: "row", xs: "column"}} spacing={5}>
      {DATA.map((data, index) => (
        <Stack key={index} flex={1}>
          <Image
            src={data.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="chart-use-case"
          />
          <TextGradient mb={4} mt={3} fontWeight={700} percentGreenColor={24.38}>
            {data.title}
          </TextGradient>
          <Text fontSize={{ md: 24, xs: 16 }} fontWeight={500} mb={0.652}>
            {data.heading}
          </Text>
          <Text mb={5} height={50}>{data.content}</Text>
          <ButtonCustom
            className="MuiButton-primary"
            sx={{ width: "fit-content" }}
          >
            Learn more
          </ButtonCustom>
        </Stack>
      ))}
    </Stack>
  );
};

const DATA = [
  {
    imageUrl: "/images/chart-use-case-1.png",
    title: "Project & Task Management",
    heading: "Create instant team momentum",
    content:
      "Swiftly create projects and allocate tasks, and optimize teamwork.",
  },
  {
    imageUrl: "/images/chart-use-case-2.png",
    title: "Resource planning",
    heading: "Collaborate to maximize the project potential",
    content:
      "Keep tabs on and understand how you're moving towards your marketing objectives ",
  },
];

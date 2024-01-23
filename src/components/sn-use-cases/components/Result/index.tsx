import { Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import Image from "next/image";
import React from "react";

export const ResultUseCase = () => {
  return (
    <Stack mt={{md: 20, xs: 4}}>
      <Text
        component="div"
        fontSize={{ md: 36, xs: 20 }}
        fontWeight={500}
        my={4}
        textAlign="center"
      >
        A commitment about the result
        <TextGradient
          fontSize={{ md: 36, xs: 20 }}
          fontWeight={500}
        >
          Taskcover assists you gain the achievements
        </TextGradient>
      </Text>
      <Stack direction={{ md: "row", xs: "column" }} spacing={7.5}>
        <Stack flex={{ md: 0.8, xs: 1 }} width="100%">
          <Image
            src="/images/benefit-production-house.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="benefit-production-house"
          />
        </Stack>
        <Stack flex={1}>
          {DATA.map((data, index) => (
            <Stack key={index}>
              <Stack direction="row" alignItems="center" spacing={1} mt={5}>
                <Stack flex={0.2}>
                  <Image
                    src={data.icon}
                    width={64}
                    height={64}
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
      </Stack>
    </Stack>
  );
};

const DATA = [
  {
    icon: "/images/result-prodtion-1.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        Facilitate the production of{" "}
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          high-quality management
        </TextGradient>
      </Text>
    ),
    content: "All the complex stages in production will be organized clearly",
  },
  {
    icon: "/images/result-prodtion-2.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          and creativity twofold
        </TextGradient>
      </Text>
    ),
    content:
      "Substantial workforce is assigned through manageable task distribution",
  },
  {
    icon: "/images/result-prodtion-3.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          Elevate overall staffs satisfaction{" "}
        </TextGradient>
        in the team
      </Text>
    ),
    content: "Product editing steps will be closely monitored and reported",
  },
  {
    icon: "/images/result-prodtion-4.png",
    title: (
      <Text component="div" fontSize={{ md: 20, xs: 16 }} fontWeight={700}>
        <TextGradient
          component="span"
          fontSize={{ md: 20, xs: 16 }}
          fontWeight={700}
        >
          Ensure punctual delivery of products{" "}
        </TextGradient>
        to clients
      </Text>
    ),
    content: "Product editing steps will be closely monitored and reported",
  },
];

import { Stack } from "@mui/material";
import Image from "next/image";
import { ButtonCustom, Text, TextGradient } from "components/shared";

export const FeatureAI = () => {
  return (
    <Stack mt={20}>
      <Stack direction="row" alignItems="center" spacing={9}>
        <Stack flex={1}>
          <Image
            src="/images/feature-ai-1.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="feature-ai"
          />
        </Stack>
        <Stack flex={1}>
          <Text component="div" fontSize={{ md: 36, xs: 24 }} fontWeight={500}>
            <Text
              component="span"
              color="#5C98F6"
              fontSize={{ md: 36, xs: 24 }}
              fontWeight={500}
            >
              Organize tasks
            </Text>{" "}
            comprehensively
          </Text>
          <Text my={3}>
            AI-agent lists and organizes the sub-tasks and deadlines for
            employees or staff from a provided outline. Save time significantly,
            and provide your agency the allocation of employees to develop
            consistency and overall performance.
          </Text>
          <Stack direction="row" spacing={3} alignItems="center">
            <ButtonCustom className="MuiButton-primary">
              <Image
                src="/images/play-circle-white.png"
                alt="play-icon"
                width={20}
                height={20}
                style={{
                  marginRight: "5px",
                }}
              />
              When do you need to use AI?
            </ButtonCustom>
            <Stack direction="row" alignItems="center">
              <Image
                src="/images/play-circle-gradient.png"
                alt="play-icon"
                width={24}
                height={24}
                style={{
                  marginRight: "5px",
                }}
              />
              <TextGradient fontWeight={500}>How to use AI?</TextGradient>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const DATA = [
  {
    imageUrl: "/images/feature-ai-1.png",
    title: (
      <Text component="div" fontSize={{ md: 36, xs: 24 }} fontWeight={500}>
        <Text
          component="span"
          color="#5C98F6"
          fontSize={{ md: 36, xs: 24 }}
          fontWeight={500}
        >
          Organize tasks
        </Text>{" "}
        comprehensively
      </Text>
    ),
    content:
      "AI-agent lists and organizes the sub-tasks and deadlines for employees or staff from a provided outline. Save time significantly, and provide your agency the allocation of employees to develop consistency and overall performance. ",
  },
  {
    imageUrl: "/images/feature-ai-2.png",
    title: (
      <Text component="div" fontSize={{ md: 36, xs: 24 }} fontWeight={500}>
        <Text
          component="span"
          color="#5C98F6"
          fontSize={{ md: 36, xs: 24 }}
          fontWeight={500}
        >
          Revolutionize data-to-mind-map
        </Text>{" "}
        with AI
      </Text>
    ),
    content:
      "AI Mind Maps will revolutionize and operate business initiatives, enhancing your project management experience. AI undertakes converting data into intelligent mind maps, and checking tasks for correctness and completeness. This all-encompassing strategy ensures that your tasks are not just handled but optimized at every stage, resulting in an important shift in efficiency and production.",
  },
  {
    imageUrl: "/images/feature-ai-3.png",
    title: (
      <Text component="div" fontSize={{ md: 36, xs: 24 }} fontWeight={500}>
        <Text
          component="span"
          color="#5C98F6"
          fontSize={{ md: 36, xs: 24 }}
          fontWeight={500}
        >
          Your onboarding
        </Text>{" "}
        AI TalkWise
      </Text>
    ),
    content:
      "Unlock the potential of AI Chat for your business solutions. Simply type your queries and experience tailored responses designed to streamline decision-making. Whether it's expert advice, innovative problem-solving, or exploring market trends, AI Chat has you covered. ",
  },
  {
    imageUrl: "/images/feature-ai-4.png",
    title: (
      <Text component="div" fontSize={{ md: 36, xs: 24 }} fontWeight={500}>
        <Text
          component="span"
          color="#5C98F6"
          fontSize={{ md: 36, xs: 24 }}
          fontWeight={500}
        >
          AI Secretary
        </Text>{" "}
        captures every meeting detail.
      </Text>
    ),
    content:
      "AI Meeting revolutionizes your meeting experience by effortlessly transcribing discussions into text documents, providing automatic reporting for concise summaries, enabling hands-free note-taking, seamless scripting of future meetings, and ensuring a comprehensive record with video recording. ",
  }
];

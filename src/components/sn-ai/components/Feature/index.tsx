import { Stack } from "@mui/material";
import Image from "next/image";
import { ButtonCustom, Text, TextGradient } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";

export const FeatureAI = () => {
  const { isMdSmaller } = useBreakpoint();
  const DATA = [
    {
      imageUrl: "/images/feature-ai-1.png",
      title: (
        <Text
          component="div"
          fontSize={{ md: 36, xs: 24 }}
          fontWeight={500}
          textAlign={{ md: "left", xs: "center" }}
        >
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
        <Text
          component="div"
          fontSize={{ md: 36, xs: 24 }}
          fontWeight={500}
          textAlign={{ md: "left", xs: "center" }}
        >
          <Text
            component="span"
            color="#5C98F6"
            fontSize={{ md: 36, xs: 24 }}
            fontWeight={500}
          >
            Explore everything
          </Text>{" "}
          with <br /> only &quot;/&quot; slash
        </Text>
      ),
      content:
        "AI Mind Maps will revolutionize and operate business initiatives, enhancing your project management experience. AI undertakes converting data into intelligent mind maps, and checking tasks for correctness and completeness. This all-encompassing strategy ensures that your tasks are not just handled but optimized at every stage, resulting in an important shift in efficiency and production.",
    },
    {
      imageUrl: "/images/feature-ai-3.png",
      title: (
        <Text
          component="div"
          fontSize={{ md: 36, xs: 24 }}
          fontWeight={500}
          textAlign={{ md: "left", xs: "center" }}
        >
          <Text
            component="span"
            color="#5C98F6"
            fontSize={{ md: 36, xs: 24 }}
            fontWeight={500}
          >
            Revolutionize <br /> data-to-mind-map
          </Text>{" "}
          with AI
        </Text>
      ),
      content:
        "Unlock the potential of AI Chat for your business solutions. Simply type your queries and experience tailored responses designed to streamline decision-making. Whether it's expert advice, innovative problem-solving, or exploring market trends, AI Chat has you covered. ",
    },
    {
      imageUrl: "/images/feature-ai-4.png",
      title: (
        <Text
          component="div"
          fontSize={{ md: 36, xs: 24 }}
          fontWeight={500}
          textAlign={{ md: "left", xs: "center" }}
        >
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
        "Unlock the potential of AI Chat for your business solutions. Simply type your queries and experience tailored responses designed to streamline decision-making. Whether it's expert advice, innovative problem-solving, or exploring market trends, AI Chat has you covered.",
    },
    {
      imageUrl: "/images/feature-ai-3.png",
      title: (
        <Text
          component="div"
          fontSize={{ md: 36, xs: 24 }}
          fontWeight={500}
          textAlign={{ md: "left", xs: "center" }}
        >
          <Text
            component="span"
            color="#5C98F6"
            fontSize={{ md: 36, xs: 24 }}
            fontWeight={500}
          >
            AI Secretary
          </Text>{" "}
          captures every <br /> meeting detail.
        </Text>
      ),
      content:
        "AI Meeting revolutionizes your meeting experience by effortlessly transcribing discussions into text documents, providing automatic reporting for concise summaries, enabling hands-free note-taking, seamless scripting of future meetings, and ensuring a comprehensive record with video recording.",
    },
  ];
  return (
    <Stack mt={20}>
      {DATA.map((data, index) => (
        <Stack
          direction={{
            md: index % 2 === 0 ? "row" : "row-reverse",
            xs: "column",
          }}
          alignItems="center"
          spacing={{ md: 9, xs: 0 }}
          key={index}
          mb={{ md: 0, xs: 12 }}
        >
          <Stack flex={1} width="100%">
            <Image
              src={data.imageUrl}
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
            {isMdSmaller ? (
              <TextGradient percentGreenColor={107.38}>
                {data.title}
              </TextGradient>
            ) : (
              data.title
            )}
            <Text
              my={3}
              fontSize={{ md: 20, xs: 16 }}
              fontWeight={400}
              color="#374151"
              textAlign={{ md: "left", xs: "center" }}
            >
              {data.content}
            </Text>
            <Stack
              direction={{ md: "row", xs: "column" }}
              spacing={3}
              alignItems="center"
            >
              <ButtonCustom
                className="MuiButton-primary"
                sx={{
                  fontWeight: 500,
                }}
              >
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
      ))}
    </Stack>
  );
};

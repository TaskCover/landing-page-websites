import { Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import Link from "next/link";
import Image from "next/image";

export const AboutTaskCoverAI = () => {
  return (
    <Stack mt={20} position="relative">
      <Stack
        sx={{
          backgroundImage: "url(/images/trust-center-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          right: { md: "-50px", xs: 0 },
          zIndex: -1,
        }}
      />
      <Text fontSize={{ md: 40, xs: 24 }} fontWeight={500} textAlign="center">
        <TextGradient fontSize={{ md: 40, xs: 24 }} fontWeight={500}>
          TaskCover AI -
        </TextGradient>
        Revolutionizing Productivity
      </Text>
      <Stack
        direction="row"
        spacing={1.5}
        height={80}
        borderRadius={4}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.40)",
          display: { md: "flex", xs: "none" },
        }}
        justifyContent="space-between"
        alignItems="center"
        px={6}
        mt={3}
      >
        {DATA.map((data, index) => (
          <Link href={data.link} key={index}>
            <Stack alignItems="center">
              <Image src={data.icon} alt="project" width={24} height={24} />
              <Text fontWeight={400}>{data.label}</Text>
            </Stack>
          </Link>
        ))}
      </Stack>

      <Stack mt={10}>
        {ABOUT_DATA.map((data, index) => (
          <Stack
            direction={index % 2 === 0 ? "row" : "row-reverse"}
            alignItems="center"
            spacing={3}
            key={index}
            mb={16}
          >
            <Stack flex={1}>
              <Text fontWeight={500}>{data.title}</Text>
              {data.heading}
              <Text fontSize={20}>{data.description}</Text>
            </Stack>
            <Stack flex={1}>
              <Image
                src={data.imageUrl}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                alt="header-ai"
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const ABOUT_DATA = [
  {
    title: "Tasks & Project",
    heading: (
      <Text
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        lineHeight={1}
        mb={4}
      >
        <TextGradient fontSize={{ md: 40, xs: 24 }} fontWeight={500}>
          Automate Campaign
        </TextGradient>
        Process
      </Text>
    ),
    description: `Use an AI Agent to coordinate tasks among your team. Explore more
    perspectives to bring your project to success with multi-field
    experts.`,
    imageUrl: "/images/about-ai-1.png",
  },
  {
    title: "Notes & Docs",
    heading: (
      <Text
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        lineHeight={1}
        mb={4}
      >
        <TextGradient fontSize={{ md: 40, xs: 24 }} fontWeight={500}>
          Notes & Docs
        </TextGradient>
        Master
      </Text>
    ),
    description: `Empower and expand your thought process, capture and organize ideas using AI Agent with smart and clear outlining. All while enjoying real-time synchronization.`,
    imageUrl: "/images/about-ai-2.png",
  },
  {
    title: "Mind Maps",
    heading: (
      <Text
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        lineHeight={1}
        mb={4}
      >
        <TextGradient fontSize={{ md: 40, xs: 24 }} fontWeight={500}>
          Intelligent
        </TextGradient>
        Mind Maps
      </Text>
    ),
    description: `The best strategic tool for planning and project organizing. Utilizing a dynamic toolbox that assists in overcoming hurdles and discovering the full potential of your tasks by arranging complex details and organizing concepts. `,
    imageUrl: "/images/about-ai-3.png",
  },
  {
    title: "AI TalkWise",
    heading: (
      <TextGradient
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        lineHeight={1}
        mb={4}
      >
        Equipped AI Chat
      </TextGradient>
    ),
    description: `Nội dung: AI TalkWise will help you to generate task lists and notes, summarize text, write content, brainstorm and more. It is available to streamline your tasks smoothly.`,
    imageUrl: "/images/about-ai-4.png",
  },
  {
    title: "AI Secretary",
    heading: (
      <TextGradient
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        lineHeight={1}
        mb={4}
      >
        AI-Powered Meeting
      </TextGradient>
    ),
    description: `Capture meeting details with high precision, streamline content appropriately, and automatically combine and organize meeting minutes. Stay fully engaged and enhance the overall quality of meetings.`,
    imageUrl: "/images/about-ai-5.png",
  },
];

const DATA = [
  {
    icon: "/images/project-ic.png",
    label: "Tasks & Project",
    link: "/",
  },
  {
    icon: "/images/document-ic.png",
    label: "Notes & Docs",
    link: "/",
  },
  {
    icon: "/images/brain-ic.png",
    label: "Mind Maps",
    link: "/",
  },
  {
    icon: "/images/frame-ic.png",
    label: "AI TalkWise",
    link: "/",
  },
  {
    icon: "/images/tv-ic.png",
    label: "AI Secretary",
    link: "/",
  },
];

import { Stack } from "@mui/material";
import { Text, TextGradient } from "components/shared";
import Link from "next/link";
import Image from "next/image";

export const AboutTaskCoverAI = () => {
  return (
    <Stack pt={{ md: 14, xs: 5 }}>
      <Text
        component="div"
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        textAlign="center"
        mb={{ md: 10, xs: 0 }}
      >
        <TextGradient
          component="span"
          fontSize={{ md: 40, xs: 24 }}
          fontWeight={500}
          percentBlueColor={68.5}
          percentGreenColor={128}
        >
          TaskCover AI -{" "}
        </TextGradient>{" "}
        Revolutionizing Productivity
      </Text>
      <Stack
        direction="row"
        spacing={{ md: 1.5, xs: 0 }}
        height={80}
        borderRadius={4}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.40)",
          border: "0.5px solid rgba(5, 117, 230, .3)",
        }}
        justifyContent="space-between"
        alignItems="center"
        px={{ md: 6, xs: 0 }}
        mt={{ md: 6, xs: 3 }}
      >
        {DATA.map((data, index) => (
          <Link href={data.link} key={index} style={{ flex: 1 }}>
            <Stack alignItems="center">
              <Image src={data.icon} alt="project" width={32} height={32} />
              <Text fontWeight={400} display={{ md: "block", xs: "none" }}>
                {data.label}
              </Text>
            </Stack>
          </Link>
        ))}
      </Stack>

      <Stack mt={{ md: 10, xs: 6 }}>
        {ABOUT_DATA.map((data, index) => (
          <Stack
            direction={{
              md: index % 2 === 0 ? "row" : "row-reverse",
              xs: "column",
            }}
            alignItems="center"
            spacing={3}
            key={index}
            mb={{ md: 16, xs: 7 }}
          >
            <Stack flex={0.6}>
              <Text
                fontWeight={{ md: 500, xs: 400 }}
                fontSize={{ md: 16, xs: 12 }}
                textTransform="uppercase"
                letterSpacing={{ md: "3px", xs: "0.5px" }}
                mb={{ md: 2, xs: 1 }}
              >
                {data.title}
              </Text>
              {data.heading}
              <Text fontSize={{ md: 20, xs: 16 }} fontWeight={400}>
                {data.description}
              </Text>
            </Stack>
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
        component="div"
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        lineHeight={1}
        mb={4}
      >
        <TextGradient
          component="span"
          fontSize={{ md: 40, xs: 24 }}
          fontWeight={500}
          percentGreenColor={121.38}
        >
          Automate Campaign{" "}
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
        component="div"
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        lineHeight={1}
        mb={4}
      >
        <TextGradient
          component="span"
          fontSize={{ md: 40, xs: 24 }}
          fontWeight={500}
        >
          Notes & Docs{" "}
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
        component="div"
        fontSize={{ md: 40, xs: 24 }}
        fontWeight={500}
        lineHeight={1}
        mb={4}
      >
        <TextGradient
          component="span"
          fontSize={{ md: 40, xs: 24 }}
          fontWeight={500}
          percentBlueColor={12.8}
          percentGreenColor={152.38}
        >
          Intelligent{" "}
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
        percentGreenColor={107.38}
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

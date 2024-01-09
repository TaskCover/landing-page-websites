import { Stack } from "@mui/material";
import { Button, Text, TextGradient } from "components/shared";
import Image from "next/image";
import Link from "next/link";

export const HeaderProducts = () => {
  return (
    <Stack>
      <Stack
        direction="row"
        spacing={1.5}
        height={80}
        borderRadius={4}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.40)",
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
      <Text
        variant={{ md: "h1", xs: "h5" }}
        textAlign="center"
        fontWeight={500}
        mt={4}
      >
        Your
        <TextGradient component="span" fontSize="inherit">
          &#160;Company&apos;s Info,
        </TextGradient>
        <br />
        <Text component="span" fontSize="inherit">
          Your
        </Text>
        <TextGradient component="span" fontSize="inherit">
          &#160;Way.
        </TextGradient>
      </Text>
      <Stack alignItems="center" my={3}>
        <Button className="MuiButton-primary" sx={{ width: "fit-content" }}>
          Start free trial
        </Button>
      </Stack>
      <Text textAlign="center">See your Agency within TaskCover</Text>
      <Stack mt={9}>
        <Image
          src="/images/company-app.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="company-app"
        />
      </Stack>
    </Stack>
  );
};

const DATA = [
  {
    icon: "/images/project-ic.png",
    label: "Project",
    link: "/project",
  },
  {
    icon: "/images/folder-ic.png",
    label: "Resource Planning",
    link: "/project",
  },
  {
    icon: "/images/document-ic.png",
    label: "Document",
    link: "/project",
  },
  {
    icon: "/images/chat-ic.png",
    label: "Chat",
    link: "/chat",
  },
  {
    icon: "/images/clock-ic.png",
    label: "Time Tracking",
    link: "/time-tracking",
  },
  {
    icon: "/images/wallet-ic.png",
    label: "Budgeting",
    link: "/budgeting",
  },
  {
    icon: "/images/tag-ic.png",
    label: "Sales",
    link: "/sales",
  },
  {
    icon: "/images/bill-ic.png",
    label: "Billing",
    link: "/billing",
  },
];

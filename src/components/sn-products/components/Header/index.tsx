import { Stack, Container } from "@mui/material";
import { Button, Text, TextGradient } from "components/shared";
import Image from "next/image";
import Link from "next/link";

type HeaderProductsProps = {
  headingText: React.ReactNode;
  subText: string;
  imageUrl: string;
  marginTop?: number;
};

export const HeaderProducts = (props: HeaderProductsProps) => {
  const { headingText, subText, imageUrl, marginTop = 3 } = props;
  return (
      <Stack position="relative" pb={{md: 10, xs: 5}}>
        <Stack
          sx={{
            backgroundImage: "url(/images/bg-header-product.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            display: {md: "flex", xs: "none"}
          }}
        />
        <Container>
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
          {DATA_PROJECT.map((data, index) => (
            <Link href={data.link} key={index}>
              <Stack alignItems="center">
                <Image src={data.icon} alt="project" width={24} height={24} />
                <Text fontWeight={400}>{data.label}</Text>
              </Stack>
            </Link>
          ))}
        </Stack>
        {headingText}
        <Stack alignItems="center" my={3}>
          <Button className="MuiButton-primary" sx={{ width: "fit-content" }}>
            Start free trial
          </Button>
        </Stack>
        <Text textAlign="center" fontSize={{md: 20, xs: 16}} fontWeight={400}>{subText}</Text>
        <Stack mt={marginTop}>
          <Image
            src={imageUrl}
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
        </Container>
      </Stack>
  );
};

export const DATA_PROJECT = [
  {
    icon: "/images/project-ic.png",
    label: "Project",
    link: "/products/project",
  },
  {
    icon: "/images/folder-ic.png",
    label: "Resource Planning",
    link: "/products/resource",
  },
  {
    icon: "/images/document-ic.png",
    label: "Document",
    link: "/products/document",
  },
  {
    icon: "/images/chat-ic.png",
    label: "Chat",
    link: "/products/chat",
  },
  {
    icon: "/images/clock-ic.png",
    label: "Time Tracking",
    link: "/products/time-tracking",
  },
  {
    icon: "/images/wallet-ic.png",
    label: "Budgeting",
    link: "/products/budgeting",
  },
  {
    icon: "/images/tag-ic.png",
    label: "Sales",
    link: "/products/sale",
  },
  {
    icon: "/images/bill-ic.png",
    label: "Billing",
    link: "/products/biling",
  },
];

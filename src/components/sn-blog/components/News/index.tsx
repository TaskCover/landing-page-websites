import { Stack } from "@mui/material";
import Image from "next/image";
import { Text, TextGradient } from "components/shared";
import { IndeterminateCheckBoxRounded } from "@mui/icons-material";
import ArrowIcon from "icons/ArrowIcon";

export const BlogNews = () => {
  return (
    <Stack direction="row" mt={20} spacing={5} position="relative">
      <Stack
        sx={{
          backgroundImage: "url(/images/trust-center-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          aspectRatio: "2210/1503",
          position: "absolute",
          top: 0,
          right: { md: "-50px", xs: 0 },
          zIndex: -1,
        }}
      />
      <Stack
        sx={{
          background: "#fff",
          py: 3,
          px: 3,
          borderRadius: 4,
          boxShadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
          position: "relative"
        }}
      >
        <Image
          src="/images/blog-new-1.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="blog-new"
        />
        <Text
          fontWeight={400}
          color="#81838"
          fontSize={{ md: 16, xs: 12 }}
          mb={2}
        >
          May 23, 2022
        </Text>
        <Text
          fontWeight={700}
          color="#151515"
          fontSize={{ md: 36, xs: 16 }}
          mb={2}
        >
          5 Best Fruit And Vegetable Supplements 2022
        </Text>
        <Text mb={2}>
          London hedge fund Bluebell Capital said the commodities giant should
          spin off its hermal coal...
        </Text>
        <Stack direction="row" spacing={1} alignItems="center">
          <Image
            src="/images/blog-author-1.png"
            width={36}
            height={36}
            alt="blog-author"
          />
          <Text>
            By <strong>Robert Fox</strong>
          </Text>
        </Stack>
        <Stack direction="row" alignItems="center" sx={{
            position: "absolute",
            bottom: 20,
            right: 10
        }}>
          <TextGradient fontWeight={700}>Read this</TextGradient>
          <Image
            src="/images/arrow-right-gradient.png"
            width={24}
            height={24}
            alt="arrow"
          />
        </Stack>
      </Stack>
      <Stack>
        {DATA.map((data, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            spacing={3}
            mb={1}
            sx={{
              background: "#fff",
              py: 3,
              px: 3,
              borderRadius: 4,
              boxShadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
            }}
          >
            <Stack flex={0.4}>
              <Image
                src={data.imageUrl}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                alt="blog-new"
              />
            </Stack>
            <Stack flex={0.7}>
              <Text
                fontWeight={400}
                color="#81838C"
                fontSize={{ md: 14, xs: 12 }}
                mb={1}
              >
                May 23, 2022
              </Text>
              <Text fontWeight={700} mb={1} fontSize={{ md: 16, xs: 14 }}>
                {data.title}
              </Text>
              <Text fontSize={14}>{data.shortDescription}</Text>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const DATA = [
  {
    imageUrl: "/images/blog-new-2.png",
    title:
      "Bio Complete 3 Reviews 2022: Is It A Scam? Effectiveness & Side Effects",
    shortDescription:
      "London hedge fund Bluebell Capital said the commodities giant should spin off its hermal coal...",
  },
  {
    imageUrl: "/images/blog-new-3.png",
    title:
      "Bio Complete 3 Reviews 2022: Is It A Scam? Effectiveness & Side Effects",
    shortDescription:
      "London hedge fund Bluebell Capital said the commodities giant should spin off its hermal coal...",
  },
  {
    imageUrl: "/images/blog-new-4.png",
    title:
      "Bio Complete 3 Reviews 2022: Is It A Scam? Effectiveness & Side Effects",
    shortDescription:
      "London hedge fund Bluebell Capital said the commodities giant should spin off its hermal coal...",
  },
  {
    imageUrl: "/images/blog-new-5.png",
    title:
      "Bio Complete 3 Reviews 2022: Is It A Scam? Effectiveness & Side Effects",
    shortDescription:
      "London hedge fund Bluebell Capital said the commodities giant should spin off its hermal coal...",
  },
];

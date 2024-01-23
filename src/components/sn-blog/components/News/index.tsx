import { Stack } from "@mui/material";
import Image from "next/image";
import { Text, TextGradient } from "components/shared";
import { BlogData } from "store/blog/actions";
import { formatDate } from "utils/index";
import { nameMonthList } from "constant/index";
import Link from "next/link";
import useBreakpoint from "hooks/useBreakpoint";

type BlogNewProps = {
  data: BlogData[];
};

export const BlogNews = (props: BlogNewProps) => {
  const { data } = props;
  const { isMdSmaller } = useBreakpoint();

  if (!data) return;

  const listPopular: BlogData[] = data;

  const createTime = (date?: number | string | Date) => {
    if (date)
      return `${nameMonthList[Number(new Date(date).getMonth())]}, ${formatDate(
        Date.now(),
        "dd, yyyy",
      )}`;
    return `${nameMonthList[Number(new Date().getMonth())]}, ${formatDate(
      Date.now(),
      "dd, yyyy",
    )}`;
  };

  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      mt={{ md: 20, xs: 5 }}
      spacing={{ md: 5, xs: 2 }}
    >
      <Link href={`blog/${data[0]?.slug}` ?? "/blog"} style={{ flex: 0.5 }}>
        <Stack
          sx={{
            background: "#fff",
            py: 3,
            px: 3,
            borderRadius: 4,
            boxShadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
            position: "relative",
          }}
        >
          <Image
            src={data[0]?.background_down?.link ?? ""}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "326px",
              objectFit: "cover",
            }}
            alt="blog-new"
          />
          <Text
            fontWeight={400}
            color="#81838C"
            fontSize={{ md: 16, xs: 12 }}
            mb={2}
            mt={{ md: 5, xs: 3 }}
          >
            {createTime(data[0]?.created_time)}
          </Text>
          <Text
            fontWeight={700}
            color="#151515"
            fontSize={{ md: 36, xs: 16 }}
            mb={2}
          >
            {data[0]?.title}
          </Text>
          <Text
            mb={2}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              fontSize: { md: 18, xs: 12 },
            }}
          >
            {data[0]?.short_description}
          </Text>
          <Stack direction="row" spacing={1} alignItems="center" mb={5}>
            <Image
              src={
                data[0]?.created_by?.avatar?.link ??
                "/images/default-avatar.png"
              }
              width={isMdSmaller ? 17 : 36}
              height={isMdSmaller ? 17 : 36}
              alt="blog-author"
            />
            <Text fontSize={{ md: 16, xs: 12 }}>
              By <strong>{data[0]?.created_by?.fullname}</strong>
            </Text>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              position: "absolute",
              bottom: 20,
              right: 10,
            }}
          >
            <TextGradient
              fontWeight={700}
              fontSize={{ md: 16, xs: 12 }}
              pb="3px"
            >
              Read this
            </TextGradient>
            <Image
              src="/images/arrow-right-gradient.png"
              width={24}
              height={24}
              alt="arrow"
            />
          </Stack>
        </Stack>
      </Link>
      <Stack flex={0.5}>
        {listPopular
          .filter((data, index) => index !== 0)
          .map((data, index) => {
            return (
              <Link key={index} href={`blog/${data?.slug}` ?? "/blog"}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ md: 3, xs: 1 }}
                  mb={1}
                  sx={{
                    background: "#fff",
                    py: { md: 3, xs: 1 },
                    px: { md: 3, xs: 1 },
                    borderRadius: 4,
                    boxShadow: "0px 4px 40px 0px rgba(43, 89, 255, 0.08)",
                  }}
                >
                  <Stack flex={0.4}>
                    <Image
                      src={data.background_down?.link ?? ""}
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
                      {createTime(data.created_time)}
                    </Text>
                    <Text
                      fontWeight={700}
                      mb={1}
                      fontSize={{ md: 16, xs: 14 }}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: {md: 3, xs: 2},
                        WebkitBoxOrient: "vertical",
                        height: { md: "50px", xs: "43px" },
                        overflow: "hidden",
                      }}
                    >
                      {data.title}
                    </Text>
                    {!isMdSmaller && (
                      <Text
                        fontSize={14}
                        display={{ md: "block", xs: "none" }}
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {data.short_description}
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </Link>
            );
          })}
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
